const tf = require("@tensorflow/tfjs-node");
const jimp = require("jimp");
const class_indices = require("./ml/class_indices.json");
const isNullOrUndefined = require("./utils/isNullOrUndefined.util");

/**
 * 
 * model ML pake pretrain dari internet untuk ngetest model penyakit daun,
 * gambar juga dari internet
 * 
 */

async function predict(image_url) {
  //test
  // gambar apple black rot
  const IMG_URL =
    "https://gardenerspath.com/wp-content/uploads/2019/08/Frogeye-spots-Botryosphaeria-obtusa-on-apple-leaf-FB.jpg";
  if (isNullOrUndefined(image_url)) {
    image_url = IMG_URL;
  }
  console.log(image_url);
  //test-end
  const handler = tf.io.fileSystem("./src/controllers/ml/model.json");
  const model = await tf.loadLayersModel(handler);
  const image = await readImageAsTensor(image_url);
  const result = model.predict(image);
  result.print();
  const temp = await result.array();
  const result_class_index = temp[0].indexOf(Math.max(...temp[0]));
  console.log(class_indices[result_class_index]);
  console.log("done!");
  return class_indices[result_class_index];
}

/**
 * Read an image file as a TensorFlow.js tensor.
 *
 * Image resizing is performed with tf.image.resizeBilinear.
 *
 * @param {string} filePath Path to the input image file.
 * @param {number} height Desired height of the output image tensor, in pixels.
 * @param {number} width Desired width of the output image tensor, in pixels.
 * @return {tf.Tensor4D} The read float32-type tf.Tensor of shape
 *   `[1, height, width, 3]`
 */
function readImageAsTensor(filePath, height = 224, width = 224) {
  return new Promise(async (resolve, reject) => {
    const image = await jimp.Jimp.read(filePath);
    const h = image.bitmap.height;
    const w = image.bitmap.width;
    const buffer = tf.buffer([1, h, w, 3], "float32");
    image.scan(0, 0, w, h, function (x, y, index) {
      buffer.set(image.bitmap.data[index], 0, y, x, 0);
      buffer.set(image.bitmap.data[index + 1], 0, y, x, 1);
      buffer.set(image.bitmap.data[index + 2], 0, y, x, 2);
    });
    resolve(
      tf.tidy(() =>
        tf.image.resizeBilinear(buffer.toTensor(), [height, width]).div(255)
      )
    );
  });
}

module.exports = predict;
