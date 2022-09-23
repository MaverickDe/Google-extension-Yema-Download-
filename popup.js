let a = Array.from(document.querySelectorAll("a"));

a.forEach((e) => {
  e.onclick = (e) => {
    chrome.tabs.create({ url: e.currentTarget.href, active: false });
  };
});
let registerbtn = document.querySelector(".register");
let registerdiv = document.querySelector(".registerdiv");
let downloadbtn = document.querySelector(".download");
let downloaddiv = document.querySelector(".downloaddiv");
let cancell = document.querySelector(".cancel");
let reregister = document.querySelector(".reregister");

let loadd = () => {
  document.querySelector(".container").innerHTML = "";
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tabs) {
      let btn = await get_(tabs[0].url);

      if (btn) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "checkbtn", btn: btn },
          () => {}
        );
      } else {
        registerdiv.style.display = "block";
        downloaddiv.style.display = "none";
        document.querySelector(".wait").style.display = "none";
      }
    }
  );
};
let register = false;

function get_(url) {
  let hostname = new URL(url).hostname;

  return new Promise((res, rej) => {
    chrome.storage.local.get(["download"], function (result) {
      if (result.download && result.download != "") {
        let arr = result.download.find((e) => e.hostname == hostname);
        if (arr) {
          if (arr.pages && arr.pages != "") {
            res(arr.pages);
          } else {
            res(false);
          }
        } else {
          res(false);
        }
      } else {
        res(false);
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", (e) => {
  loadd();
});
chrome.runtime.onMessage.addListener((obj, sender, res) => {
  switch (obj.type) {
    case "btnchecked":
      res({ success: true });
      loadbtn(obj.btn);

      break;
    case "newpage":
      res({ success: true });
      loadd(obj);

      break;
    case "saved":
      res({ success: true });
      loadd(obj.pages);

      break;

    case "registered":
      res({ success: true });
      let con = document.querySelector(".wait");
      setTimeout(() => {
        con.style.display = "none";
        if (obj && obj.success) {
          displaymsg("success!!!", true);
        } else {
          displaymsg("an error occured", false);
        }
      }, 1000);
      break;
  }
});

let displaymsg_ = document.querySelector(".displaymsg");

let displaymsg = (a, bol) => {
  displaymsg_.style.display = "block";

  displaymsg_.innerText = a;
  if (bol) {
    displaymsg_.style.color = "white";
  } else {
    displaymsg_.style.color = "red";
  }
  setTimeout(() => {
    displaymsg_.style.display = "none";
    displaymsg_.style.color = "";
    displaymsg_.innerText = null;
  }, 1500);
};

let loadbtn = (arr) => {
  if (arr == "") {
    return;
  }

  arr.forEach((e) => {
    let btn = document.createElement("div");
    btn.innerHTML =
      `

    <div style="display: flex;justify-content: center;align-items: center; margin:5px;">

    <button class="download"style="width:150px">
        <center>

            <div class="load" style="width:50px">
                <div class="bar"></div>
            
            </div>
            
            
            
          <div>
              download
              
            </div> 
        </center>
    </button>
    <div class="delete" style="margin-left:10px;font-size:20px;cursor:pointer">🚮</div>` +
      (() => {
        let number = e.number;
        if (number) {
          let op =
            " <option selected disabled hidden>select the button cllick</option>";

          for (i = 1; i <= number; i++) {
            op += `
              

   
    <option value="${i}">${i}</option>

              `;
          }
          return (
            `
            <select>` +
            op +
            `  
            </select>
          `
          );
        }
        return ``;
      })() +
      `
</div>` +
      (() => {
        let number = e.number;
        if (number) {
          return `
          <p class="multiple">This button has multiple match , avoid registering button that are dynamic and has multiple matches</p>
<p class="multiple">Hover on the button to see the different match</p>
          `;
        }
        return ``;
      })() +
      `
<p style="margin:5px;font-size:10px;color:red;">This btn was registered in ---  ${e.url}</p>

`;

    let download = btn.querySelector(".download");
    btn.setAttribute("class", "btncontainer");
    let con = document.querySelector(".container");
    con.appendChild(btn);
    btn.querySelector(".delete").onclick = () => {
      cancel(e);
      con.removeChild(btn);

      if (Array.from(con.children).length == 0) {
        registerdiv.style.display = "block";
        downloaddiv.style.display = "none";
      }
    };
    download.onmouseover = (ee) => {
      let select = ee.currentTarget.parentElement.querySelector("select");
      let selectvalue = undefined;
      if (select) {
        selectvalue = +select.value;
      }
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: "mouseover", elemselec: e.elemselec, number: selectvalue },
            function (response) {}
          );
        }
      );
    };
    download.onmouseout = (ee) => {
      let select = ee.currentTarget.parentElement.querySelector("select");
      let selectvalue = undefined;
      if (select) {
        selectvalue = +select.value;
      }
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: "mouseout", elemselec: e.elemselec, number: selectvalue },
            function (response) {}
          );
        }
      );
    };
    download.onclick = (a) => {
      let con = a.currentTarget.querySelector(".load");
      let select = a.currentTarget.parentElement.querySelector("select");
      let selectvalue = 0;
      if (select) {
        selectvalue = +select.value || 0;
      }
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          con.classList.add("loader");

          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: "download", btn: e.elemselec, number: selectvalue },
            function (response) {
              setTimeout(() => {
                con.classList.remove("loader");
                if (response && response.success) {
                  displaymsg("success!!!", true);
                } else {
                  displaymsg("an error occured", false);
                }
              }, 4000);
            }
          );
        }
      );
    };
  });

  downloaddiv.style.display = "block";
  registerdiv.style.display = "none";
  document.querySelector(".wait").style.display = "none";
};

cancell.addEventListener("click", (e) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "cancel" },
      function (response) {
        let con = document.querySelector(".wait");
        con.style.display = "none";
      }
    );
  });
});

let reg = (e) => {
  let con = document.querySelector(".wait");

  con.style.display = "flex";
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "register" },
      function (response) {}
    );
  });
};
registerbtn.addEventListener("click", (e) => {
  reg(e);
});
reregister.addEventListener("click", (e) => {
  reg(e);
});

function cancel(obj) {
  let url = obj.url;
  let id = obj.id;
  let arr = obj.btn;
  let hostname = new URL(url).hostname;

  return new Promise((res, rej) => {
    chrome.storage.local.get(["download"], function (result) {
      var error = chrome.runtime.lastError;
      if (result.download) {
        let index = result.download.findIndex((e) => e.hostname == hostname);
        if (index > -1) {
          let index2 = result.download[index].pages.findIndex((e) => {
            if (e.url == url && e.id == id) {
              return true;
            }
            return false;
          });
          if (index2 > -1) {
            result.download[index].pages.splice(index2, 1);
          }
          if (result.download[index].pages == "") {
            result.download.splice(index, 1);
          }
        }

        if (result.download != "") {
          chrome.storage.local.set({ download: result.download }, function () {
            // res({ success: true });
          });
        } else {
          chrome.storage.local.clear(() => {});
        }
      }
    });
  });
}

let check = (pages, arr) => {
  console.log(pages, arr);
  let btn = pages.reduce((total, acc) => {
    console.log(acc.btn);
    console.log(arr.btn);
    let red = (arr) => {
      return arr
        .reduce((total, acc) => {
          total.push(...Object.keys(acc.prop), ...Object.values(acc.prop));
          total = total.filter((e) => e != "");
          return total;
        }, [])
        .sort();
    };

    let arr1 = red(arr.btn);
    let arr2 = red(acc.btn);

    console.log(arr1, arr2);

    let checkarr = !arr1.reduce((total, acc, index) => {
      console.log(arr2[index] == acc);
      if (!total) {
        if (!arr2[index] || arr2[index] != acc) {
          total = true;
          console.log(acc, arr2[index], index, "index");
        } else {
          total = false;
        }
      }

      return total;
    }, false);

    console.log(checkarr);
    if (!total) {
      console.log("ttttttttttttttttttttttttt");

      if (checkarr) {
        total = true;
      }
    }

    return total;
  }, false);

  console.log(btn, "btn");

  return btn;
};
