'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;

class Uploader extends Controller {
  async uploadImg() {
    const { ctx, config } = this;
    let uploadStream;
    try {
      uploadStream = await ctx.getFileStream();
      if (!uploadStream) {
        const err = new Error();
        throw err;
      }
    } catch (err) {
      err.code = 403;
      err.msg = err.message;
      throw err;
    }
    const nameid = ctx.helper.uuid().replace(/-/g, '');
    // path.extname(uploadStream.filename).toLocaleLowerCase可以获取到文件后缀名，比如.jpg .png
    const filename = nameid + path.extname(uploadStream.filename).toLocaleLowerCase();
    // 文件存在 upload/img 文件夹下
    const target = path.join(config.baseDir, 'upload/img', filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(uploadStream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }

    ctx.helper.$success({
      fileUrl: `${config.urls.stuer_url}/upload/img/${filename}`,
    });
  }
  async uploadImgs() {
    const { ctx, config } = this;
    const parts = ctx.multipart();
    let part;
    const result = [];
    // parts() 返回 promise 对象
    while ((part = await parts()) != null) {
      if (part.length) {
        // 这是 busboy 的字段
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          ctx.helper.$fail(403, '文件错误或者文件不存在');
          return false;
        }
        // part 是上传的文件流
        const nameid = ctx.helper.uuid().replace(/-/g, '');
        // path.extname(part.filename).toLocaleLowerCase可以获取到文件后缀名，比如.jpg .png
        const filename = nameid + path.extname(part.filename).toLocaleLowerCase();
        // 文件存在 upload/img 文件夹下
        const target = path.join(config.baseDir, 'upload/img', filename);
        // 生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        try {
          await awaitWriteStream(part.pipe(writeStream));
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
        result.push(`${config.urls.stuer_url}/upload/img/${filename}`);
      }
    }
    ctx.helper.$success(result);
  }
}
module.exports = Uploader;
