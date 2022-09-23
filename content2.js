// let interval;
// let script = document.createElement("script");
// var fullURL = chrome.runtime.getURL("inject.js");

// script.src = fullURL;
// console.log(fullURL);
// // ... inject content-script (null means current active tab)
// // chrome.tabs.executeScript(null, { file: "content_script.js" });
// document.querySelector("body").appendChild(script);
// // window.postMessage({ dd: "dd", type: "ex" })
// let vv = new Promise((res, rej) => {
//   window.addEventListener("message", (event) => {
//     // Do we trust the sender of this message?
//     // console.log(event,event.origin,event.source)
//     // if (event.origin !== "https://web.whatsapp.com/*") return;

//     // event.source is window.opener
//     // event.data is "hello there!"

//     // Assuming you've verified the origin of the received message (which
//     // you must do in any case), a convenient idiom for replying to a
//     // message is to call postMessage on event.source and provide
//     // event.origin as the targetOrigin.

//     res(event);
//   });
// });

// let gg = async (obj) => {
//   let cc = await vv;

//   cc.source.postMessage(obj, cc.origin);
// };
// gg({ ss: "dd" });

// console.log(window.frames);
// // chrome.tab.sendMessage({ type: "ex",dd:"Dd"}, function (response) { })
// chrome.runtime.onMessage.addListener((obj, sender, res) => {
//   console.log(obj, sender, res);

//   switch (obj.type) {
//     case "start":
//       interval = setInterval((e) => {
//         let doc = document.getElementsByClassName(
//           "g0rxnol2 ercejckq cm280p3y p357zi0d gndfcl4n kcgo1i74 ln8gz9je e8h85j61 emrlamx0 aiput80m lyvj5e2u l9g3jx6n f6ipylw5"
//         );

//         if (Array.from(doc) == "") {
//           return;
//         }

//         clearInterval(interval);
//         res({ success: true });

//         work(obj);
//       }, 1000);
//       break;
//   }
// });

// console.log("nbnbnbnbn");

// // chrome.runtime.sendMessage({
// //   type: "notification",
// //   options: {
// //     type: "basic",
// //     iconUrl: chrome.extension.getURL("icon128.png"),
// //     title: "Test",
// //     message: "Test",
// //   },
// // });

// chrome.runtime.sendMessage({ type: "next" }, function (response) {
//   if (!response.done && !response.error) {
//     work(response.arr);
//   }
// });

// let divv = document.createElement("div");
// divv.setAttribute("class", "mnm");

// let get = () => {
//   document.onclick((e) => {
//     let button = e.target;
//     classname = e.target.class;
//     id = e.target.id;
//     bu;
//   });
// };

// // Hi,%20I%20saw%20an%20ad%20on%20Facebook%20and%20I'd%20like%20to%20learn%20more%20about%20your%20products

// // {/* <span class="" data-lexical-text="true">jjjjkkkkkk</span> */}

// // <div
// //   class="fd365im1 to2l77zo bbv8nyr4 mwp4sxku gfz4du6o ag5g9lrv"
// //   contenteditable="true"
// //   role="textbox"
// //   spellcheck="true"
// //   title="Type a message"
// //   data-testid="conversation-compose-box-input"
// //   data-tab="10"
// //   data-lexical-editor="true"
// //   style="user-select: text; white-space: pre-wrap; word-break: break-word;"
// // >
// //   <p class="selectable-text copyable-text" dir="ltr">
// //     <span class="selectable-text copyable-text" data-lexical-text="true">
// //       jjjjkkkkkk
// //     </span>
// //   </p>
// // </div>;

// // <span data-testid="send" data-icon="send" class="">
// //   <svg viewBox="0 0 24 24" width="24" height="24" class="">
// //     <path
// //       fill="currentColor"
// //       d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
// //     ></path>
// //   </svg>
// // </span>;

// // <button
// //   data-testid="compose-btn-send"
// //   data-tab="11"
// //   aria-label="Send"
// //   class="tvf2evcx oq44ahr5 lb5m6g5c svlsagor p2rjqpw5 epia9gcq"
// // >
// //   <span data-testid="send" data-icon="send" class="">
// //     <svg viewBox="0 0 24 24" width="24" height="24" class="">
// //       <path
// //         fill="currentColor"
// //         d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
// //       ></path>
// //     </svg>
// //   </span>
// // </button>;


// <button class="btn shadow-sm download mt-3 mt-sm-0" data-v-572882c2="">
//   <span data-v-572882c2="">
//     <svg
//       aria-hidden="true"
//       focusable="false"
//       data-prefix="fas"
//       data-icon="download"
//       role="img"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 512 512"
//       class="svg-inline--fa fa-download fa-w-16"
//       data-v-572882c2=""
//     >
//       <path
//         fill="currentColor"
//         d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
//         data-v-572882c2=""
//         class=""
//       ></path>
//     </svg>
//   </span>{" "}
//   Download
// </button>;



// let findd = (obj) => {
//   let con3 = (obj) => {
//     // btn[] ,html[]
//     obj.forEach((e) => {
//       a = [];

//       for (val in e[0]) {
//         let c = `[${val}]`;
//         a.push(c);
//       }

//       let allaparent = document.querySelectorAll(a.join(""));
//       // index

//       let parent = allaparent.reduce(
//         (total, ee) => {
//           let obj = {};
//           for (val of ee.attributes) {
//             obj[val.name] = val.value;
//           }

//           let v = total;
//           v.bol = false;
//           e.forEach((dd) => {
//             let a = [];
//             let b = [];
//             let number = 0;
//             for (val in dd) {
//               let c = `[${val}="${acc[dd]}"]`;
//               a.push(c);
//               number++;
//             }
//             for (val in dd) {
//               let c = `[${val}}"]`;
//               d.push(c);
//             }

//             let degen = [...Object.values[dd]];

//             let children = ee.querySelector(b.join(""));

//             childrenfun = () => {
//               return Array.from(children).reduce((ff) => {
//                 let obj = {};
//                 for (val of ff.attributes) {
//                   obj[val.name] = val.value;
//                 }
//                 let degen2 = [...Object.values[obj]];

//                 let valuee = () => {
//                   let val;
//                   let value = degen.reduce((total, acc, index, array) => {
//                     let myval;
//                     if (val) {
//                       myval = val;
//                     } else {
//                       myval = degen2;
//                     }
//                     let bol = myval.includes(acc);
//                     if (bol) {
//                       console.log(array);
//                       total.push("true");
//                       let index = myval.findIndex((e) => e == acc);
//                       myval.splice(index, 1);
//                       val = myval;
//                       //  val=
//                     } else {
//                       total.push("false");
//                     }

//                     return total;
//                   }, []);
//                   console.log(value, "valuwww");
//                   let number = value.filter((e) => e != "false").length;
//                   return number;
//                 };

//                 if (valuee() > total) {
//                   total = value;
//                 }
//               }, 0);
//             };

//             let child = ee.querySelector(a.join(""));

//             if (child) {
//               v.bol = false;
//               v.number = number;
//             } else {
//               let chif = childrenfun();
//               if (chif) {
//                 number = chif;

//                 v.number < number
//                   ? (() => {
//                       v.number = number;
//                     })()
//                   : (() => {})();
//               }
//             }
//           });

//           // e.map(e => {

//           // })

//           if (v.number > total.number) {
//             total.number = v.number;
//             total.dd = v.dd;
//           }

//           return total;
//         },
//         { number: 0, dd: undefined, bol: true }
//       );

//       console.log(parent);
//     });
//   };

//   let findhtml = (e, obj) => {
//     return obj.reduce((total, acc) => {
//       a = [];

//       for (val in acc) {
//         let c = `[${val}="${acc[val]}"]`;
//         a.push(c);
//       }
//       let child = e.querySelector(a.join(""));
//       if (total) {
//         if (child) {
//           total.push(child);
//         } else {
//           total = false;
//         }
//       }

//       return total;
//     }, []);
//   };

//   a = [];

//   for (val in obj[0]) {
//     let c = `[${val}="${obj[0][val]}"]`;
//     a.push(c);
//   }
//   let firstchild = document.querySelectorAll(a.join(""));
//   console.log(firstchild, a, a.join(""));

//   if (firstchild) {
//     let slice = obj.slice(1);
//     if (slice && slice != "") {
//       let b = Array.from(firstchild).reduce((total, acc) => {
//         if (!total) {
//           let children = findhtml(acc, slice);
//           console.log(children, acc, slice);
//           if (children) {
//             total = children;
//           }
//         }

//         return total;
//       }, false);
//       if (b) {
//         console.log(b);
//         return [...Array.from(firstchild), ...b];
//       }
//       return false;
//     }
//     return [...Array.from(firstchild)];
//   } else {
//     return false;
//   }
// };
