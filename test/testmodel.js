import axios from "axios";
import fs from "fs";

let res = []
let res2 = []
let i_start = 524
let i_end = 999
const length = i_end-i_start; // Length of the array
const array = Array.from({ length }, (_, index) => index + 1);
const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
};
const a = async()=>{
    for await(const i of array) {
      try {
        let image_url = "https://raw.githubusercontent.com/C242-PR613/Skinlyze-ML/refs/heads/main/Data%20Test/ISIC_0034"+ (i_start+i) + ".jpg"
        let temp = await axios.post("https://skinlyze-ml-249825855363.asia-southeast2.run.app/predict", JSON.stringify({"image_url":image_url}), customConfig)
        res.push({"image":(i_start+i),"data":temp.data.data})
        res2.push({"image":(i_start+i),"result":temp.data.data.result})
        console.log(i_start+i)
      } catch (error) {
        console.log(`${i_start+i}: error`)
        res.push({"image":(i_start+i),"data":"error!"})
        res2.push({"image":(i_start+i),"result":"error!"})
      }
}}

await a()
console.log(res)



// Your variable
const data = JSON.stringify({"data":res});
const data2 = JSON.stringify({"data":res2})

// Write the variable to a file
fs.writeFile('output2.json', data, (err) => {
  if (err) {
    console.error('Error writing to file', err);
  } else {
    console.log('File written successfully');
  }
});
fs.writeFile('output-simple2.json', data2, (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log('File written successfully');
    }
  });

