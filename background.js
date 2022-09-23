chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {});

chrome.runtime.onMessage.addListener(async (obj, sender, res) => {
  switch (obj.type) {
    case "checkfordownload":
      break;
    case "save":
      res({ success: true });
      let arr2 = await save(obj.btn);

      break;
  }

  return true;
});

setTimeout(() => {
  chrome.storage.local.get(["download"], function (result) {});
}, 1000);

function save(arr) {
  let id = Math.random().toString();

  let hostname = new URL(arr.url).hostname;

  return new Promise((res, rej) => {
    let objarr = [];
    chrome.storage.local.get(["download"], function (result) {
      console.log(result, "JFJFJFJFJFJ");

      var error = chrome.runtime.lastError;
      if (result.download) {
        index = result.download.findIndex((e) => e.hostname == hostname);
        if (index > -1) {
          let checkbn = check(result.download[index].pages, arr);
          console.log(checkbn);
          //  console.log(btn)
          if (!checkbn) {
            result.download[index].pages.push({ ...arr, id });
          }
        } else {
          result.download.push({ hostname, pages: [{ id, ...arr }] });
        }
      } else {
        result.download = [{ hostname, pages: [{ ...arr, id }] }];
      }

      index = result.download.findIndex((e) => e.hostname == hostname);

      chrome.runtime.sendMessage(
        { type: "saved", pages: result.download[index].pages },
        () => {}
      );

      chrome.storage.local.set({ download: result.download }, function () {
        res({ success: true });
      });
    });
  });
}

let check = (pages, arr) => {
  let btn = pages.reduce((total, acc) => {
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

    if (!total) {
      if (checkarr) {
        total = true;
      }
    }

    return total;
  }, false);

  return btn;
};
