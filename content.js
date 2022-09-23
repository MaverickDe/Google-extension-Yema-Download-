let activebtn = undefined;

let divv = document.createElement("div");
divv.style.width = "100vw";
divv.style.height = "fit-content";
divv.style.justifyContent = "center";
divv.style.alignItems = "center";
divv.style.position = "fixed";
divv.style.display = "flex";

divv.style.zIndex = "100";
divv.style.top = "10px";
divv.style.backgroundColor = "black";
divv.style.color = "white";
// divv.style.padding = "10px";

let register = false;
let a = `<div style="width:fit-content;height:fit-content;padding:20px;"><h2>click the button</h2>
<div class="place">place your cursor over the button for 6 seconds</div>
<div  class="cap" ><div>capturing button...   </div> <div class="nocap">3</div></div>
<style>
.cap{
  display:none
}

</style>

</div>
`;

let func;
divv.innerHTML = a;

let link = document.createElement("style");

let label = (name) => {
  let style = document.createElement("style");
  style.setAttribute("class", `_style${name}`);

  style.innerHTML = `
._${name}{
  position:relative
  

}
._${name}:before{
  content:"${name}";
  position:absolute;
  width:100%;
  height:100%;
  font-size:20px;
  top:0px;
  left:0px;
  z-index:40;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color: rgb(117, 146, 226,0.5);


  
  

}


  `;

  body.appendChild(style);

  return style;
};

link.innerHTML = `
@keyframes blink {

    0%{
        background-color: black;
        transform: scale(1.1);
        color: white;
    }
   100%{
        background-color: white;
        transform: scale(1);
        color: black;
    }
}



.blink{
    animation: blink 1s 1s infinite ease-in-out
}

`;
let body = document.querySelector("body");

body.appendChild(link);

chrome.runtime.onMessage.addListener((obj, sender, res) => {
  switch (obj.type) {
    case "register":
      res({ success: true });
      body.appendChild(divv);

      register = true;

      break;
    case "checkbtn":
      res({ success: true });

      checkbtn(obj.btn);

      break;
    case "mouseover":
      res({ success: true });

      mouseover(obj);

      break;
    case "mouseout":
      res({ success: true });

      mouseout(obj);

      break;
    case "download":
      download__(obj);

      break;
    case "cancel":
      body.removeChild(divv);
      register = false;

      res({ success: true });

      break;
  }
});

chrome.runtime.sendMessage({ type: "newpage" }, (res) => {});

let reg = (e) => {
  e.relatedTarget.removeEventListener("click", func, true);

  body.removeChild(divv);
  let atrr = e.path.reduce((total, acc) => {
    if (!["HTML", "BODY", "#document"].includes(acc.nodeName) && acc.nodeName) {
      let atrr = {};
      for (val of acc.attributes) {
        atrr[val.name] = val.value;
        rr[{ ...a.attributes }[val]] =
          a.attributes[{ ...a.attributes }[val]].value;
      }
      let obj = { prop: atrr, nodename: acc.nodeName.toLowerCase() };
      if (acc.innerText != "") {
        obj.text = acc.innerText.toLowerCase();
      }

      total.push(obj);
    }
    return total;
  }, []);

  // let obj = {}

  if (register) {
    register = false;
    chrome.runtime.sendMessage(
      { type: "registered", success: true },
      (res) => {}
    );
    chrome.runtime.sendMessage(
      { type: "save", btn: { url: window.location.href, btn: atrr } },
      (res) => {}
    );
  }
};

let timeout;
let timeout2;
let interval;
document.addEventListener("mouseover", (e) => {
  let target = e;
  if (!register) {
    return;
  }

  divv.querySelector(".cap").style.display = "none";

  clearInterval(interval);
  clearTimeout(timeout);
  clearTimeout(timeout2);
  document.querySelector(".nocap").innerText = "3";

  timeout = setTimeout(() => {
    document.querySelector(".cap").style.display = "flex";
    interval = setInterval(() => {
      document.querySelector(".nocap").innerText =
        +document.querySelector(".nocap").innerText - 1;
    }, 1000);
  }, 3000);
  timeout2 = setTimeout(() => {
    clearInterval(interval);

    document.querySelector(".place").innerText =
      "please remove your cursor from the button";
    let time = target.timeStamp;

    func = (ee) => {
      let df = ee.timeStamp - time;

      if (df <= 10000 && register) {
        document.querySelector(".place").innerText =
          "place your cursor over the button for 6 seconds";

        reg(target);
      }
    };
    target.relatedTarget.onmouseout = func;
  }, 6000);
});

document.addEventListener("mouseout", (e) => {
  divv.querySelector(".cap").style.display = "none";

  clearInterval(interval);
  clearTimeout(timeout);
  clearTimeout(timeout2);
});

let download__ = async (obj) => {
  if (activebtn) {
    activebtn.click();
  }

  obj.elemselec[obj.number].forEach((e) => {
    let button = document.querySelector(`${e.join(">")}`);
    if (button) {
      button.click();
    }
  });
};

let labelstyle = [];

let checkbtn = (obj) => {
  let btn = obj.reduce((total, acc) => {
    let c = findd(acc.btn);

    if (c) {
      let elemselec = c.map((e) => e.objselec);

      total.push({ ...acc, number: c.length - 1, elemselec });
    }
    return total;
  }, []);

  if (btn != "") {
    chrome.runtime.sendMessage({ type: "btnchecked", btn });
  }
};

let mouseover = (obj) => {
  if (obj.number) {
    let button = document.querySelector(
      `${obj.elemselec[number][0].join(">")}`
    );
    if (button) {
      button.classList.add("blink", `_${index}`);
      activebtn = button;
      let labell = label(number);

      let stylename = `_style${number}`;

      if (!labelstyle.includes(stylename)) {
        let obj = {};
        for (val of button.attributes) {
          obj[val.name] = val.value;
        }

        let aa = [button.nodeName.toLowerCase()];
        for (value in obj) {
          let c;

          c = `[${value}="${obj[value]}"]`;

          aa.push(c);
        }

        labelstyle.push({
          styleclass: stylename,
          btnclass: [aa.join(""), ["blink", `_${index}`]],
        });
      }
    }
  } else {
    let bt = obj.elemselec.forEach((e, index) => {
      let button = document.querySelector(`${e[0].join(">")}`);
      if (button) {
        button.classList.add("blink", `_${index}`);
        activebtn = button;
        let labell = label(index);
        let stylename = `_style${index}`;

        if (!labelstyle.includes(stylename)) {
          let obj = {};
          for (val of button.attributes) {
            obj[val.name] = val.value;
          }

          let aa = [button.nodeName.toLowerCase()];
          for (value in obj) {
            let c;

            c = `[${value}="${obj[value]}"]`;

            aa.push(c);
          }

          labelstyle.push({
            styleclass: stylename,
            btnclass: [aa.join(""), ["blink", `_${index}`]],
          });
        }
      }
    });
  }
};
let mouseout = (obj) => {
  let regex = /\[class=[^\[]*/gi;

  activebtn = undefined;

  labelstyle.forEach((e) => {
    let style = document.querySelector(`style[class=${e.styleclass}]`);
    let btn = document.querySelector(e.btnclass[0]);
    if (style) {
      body.removeChild(style);
    }
    if (btn) {
      btn.classList.remove(...e.btnclass[1]);
    }
  });

  // minor test
  let test = () => {
    if (obj.number) {
      let firstbtn = obj.elemselec[number][0];
      let index = firstbtn.length - 1;

      let child = firstbtn[index];

      if (regex.test(child)) {
        let m = child.match(regex)[0].split(`"]`).slice(0, 1);
        m.push(" ", `blink`, " ", `_${number}`, `"`, "]");
        let revv = child.replace(regex, m.join(""));
        obj.elemselec[number][0][index] = revv;
      } else {
        obj.elemselec[number][0][index] += `[class="blink _${number}"]`;
      }

      let button = document.querySelector(
        `${obj.elemselec[number][0].join(">")}`
      );
      if (button) {
        button.classList.remove("blink", `_${index}`);
      }
    } else {
      obj.elemselec.forEach((e, index) => {
        let firstbtn = e[0];

        let index2 = firstbtn.length - 1;

        let child = firstbtn[index2];

        if (regex.test(child)) {
          let m = child.match(regex)[0].split(`"]`).slice(0, 1);
          m.push(" ", `blink`, " ", `_${index}`, `"`, "]");
          let revv = child.replace(regex, m.join(""));
          e[0][index2] = revv;
        } else {
          e[0][index2] += `[class="blink _${index}"]`;
        }

        let button = document.querySelector(`${e[0].join(">")}`);
        if (button) {
          button.classList.remove("blink", `_${index}`);
        }
      });
    }
  };
};

let findd = (obj) => {
  let bnv = (degen, degen2) => {
    let number = 0;
    degen.forEach((e, index) => {
      for (val in e) {
        if (e[val] == degen2[index][val]) {
          number += 1;
        }
      }
    });

    return number;
  };

  let bnv2 = (degen, degen2) => {
    let number = 0;
    degen.forEach((e, index) => {
      for (val in e) {
        if (!degen2[index][val]) {
          number -= 1;
        }
      }
    });

    return number;
  };

  let desvalue = (objandvalue = obj.reduce((total, acc) => {
    total.push(...Object.values(acc));

    return total;
  }, []));

  let url = (obj, bol) => {
    let d = [];

    for (val of obj) {
      let aa = [val.nodename];
      for (value in val.prop) {
        let c;

        if (bol) {
          c = `[${value}="${val.prop[value]}"]`;
        } else {
          c = `[${value}]`;
        }
        aa.push(c);
      }

      // let c = `[${val}]`;
      d.push(aa.join(""));
    }

    d = d.reverse();

    return d;
  };

  let d = url(obj);
  let p = d.slice(1).join(">");

  let pa = Array.from(document.querySelectorAll(d[0]));

  if (pa == "") {
    return false;
  }

  let allaparent = pa.reduce((total, acc, index) => {
    let chi;

    if (obj[1]) {
      chi = acc.querySelectorAll(`:scope>${p}`);
    } else {
      chi = acc;
    }

    let children = (child, number) => {
      let parent = child.parentElement;

      return [
        parent,
        ...(() => {
          if (number) {
            return children(parent, number - 1);
          }
          return [];
        })(),
      ];
    };

    if (chi && Array.from(chi) != "") {
      let chiarray = Array.from(chi).map((e) => {
        let obj = {};
        for (val of e.attributes) {
          obj[val.name] = val.value;
        }

        return chi;
      });

      let ob = chiarray.map((e) => ({ ...obj[0].prop }));

      let checkforvalue = Array.from(chi).reduce(
        (total, acc) => {
          let objj = {};
          for (val of acc.attributes) {
            objj[val.name] = val.value;
          }

          let number = bnv([{ ...obj[0].prop }], [{ ...objj }]);

          if (number > total.number) {
            total.number = number;
            total.value = [acc];
          } else if (number == total.number) {
            total.number = number;
            total.value.push(acc);
          }

          return total;
        },
        { value: [], number: 0 }
      ).value;

      let checkfornonvalue = checkforvalue.reduce(
        (total, acc, index) => {
          let objj = {};
          for (val of acc.attributes) {
            objj[val.name] = val.value;
          }
          let number = bnv2([{ ...objj }], [{ ...obj[0].prop }]);

          if (index == 0) {
            total.number = number;
            total.value = [acc];
          } else if (number > total.number) {
            total.number = number;
            total.value = [acc];
          }

          return total;
        },
        { value: [], number: 0 }
      ).value;

      let chi2 = checkfornonvalue[0];

      let doc = (obj[1] && [
        chi2,
        ...children(chi2, d.slice(1).length - 1),
      ]) || [acc];

      let objdoc = doc.map((e) => {
        let obj = {};
        for (val of e.attributes) {
          obj[val.name] = val.value;
        }

        return { nodename: e.nodeName.toLowerCase(), prop: obj };
      });

      let urldoc = url(objdoc, true);

      let objselec = objdoc.map((e, index) => {
        return urldoc.slice(0, urldoc.length - index);
      });

      let objandvalue = objdoc.reduce((total, acc) => {
        total.push(...Object.values(acc.prop));

        return total;
      }, []);

      total.push({ doc, objdoc, objandvalue, objselec, mainelem: doc[0] });
    }

    return total;
  }, []);

  let checkforvalue = allaparent.reduce(
    (total, acc) => {
      let number = bnv(
        [...obj].map((e) => e.prop),
        [...acc.objdoc]
      );

      if (number > total.number) {
        total.number = number;
        total.value = [acc];
      } else if (number == total.number) {
        total.number = number;
        total.value.push(acc);
      }

      return total;
    },
    { value: [], number: 0 }
  ).value;

  let checkfornonvalue = checkforvalue.reduce(
    (total, acc, index) => {
      let number = bnv2(
        [...acc.objdoc],
        [...obj].map((e) => e.prop)
      );

      if (index == 0) {
        total.number = number;
        total.value = [acc];
      } else if (number > total.number) {
        total.number = number;
        total.value = [acc];
      } else if (number == total.number) {
        total.number = number;
        total.value.push(acc);
      }

      return total;
    },
    { value: [], number: 0 }
  ).value;

  return (checkfornonvalue != "" && checkfornonvalue) || false;
};
