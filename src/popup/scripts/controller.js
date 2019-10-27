export function BuildToFull(id) {
  id = parseInt(id);
  if(isNaN(id) || id > 38 || id < 1) return alert("Ошибка улучшения здания, неверно указан номер здания");

  let currentBuildingLvl = 0;
  let firstSlash = location.href.indexOf("/", 0);
  let firstDot = location.href.indexOf(".", 0);
  let domain = location.href.substr(firstSlash + 2, firstDot - firstSlash - 2);
  console.log(domain);

  const build = () => {
    let newWin = window.open("https://" + domain + ".ttwars.com/build.php?id=" + id + "&fastUP=0", "", "width=200,height=200");

    newWin.onload = function() {
      if(newWin.document.getElementsByClassName("inlineIcon duration")[0] === undefined)
      {
        newWin.close();
        window.location.reload();
        return;
      }

      let rawTime = newWin.document.getElementsByClassName("inlineIcon duration")[0].textContent.trim().split(":");
      let timeToNext = parseInt(rawTime[0]) * 3600000 + parseInt(rawTime[1]) * 60000 + parseInt(rawTime[2]) * 1000;
      // добавляем 1 секунду на всякий случай
      timeToNext += 1000;
      window.console.log(timeToNext);

      let buildWin = newWin.open("https://" + domain + ".ttwars.com/build.php?id=" + id + "&fastUP=1", "", "width=200,height=200");

      buildWin.onload = function() {
        buildWin.close();
        currentBuildingLvl++;
      }

      newWin.close();
      
      setTimeout(() => {
        build();
      }, timeToNext);
    }

    console.log("lvls builded: " + currentBuildingLvl);
  }

  build();
}

export function UpgradeAllFields() {
  // last field id = 18
  let currentField = 1;

  let currentBuildingLvl = 0;
  let firstSlash = location.href.indexOf("/", 0);
  let firstDot = location.href.indexOf(".", 0);
  let domain = location.href.substr(firstSlash + 2, firstDot - firstSlash - 2);
  console.log(domain);

  const build = () => {
    if(currentField == 19)
    {
      window.location.reload();
      return;
    }

    let newWin = window.open("https://" + domain + ".ttwars.com/build.php?id=" + currentField + "&fastUP=0", "", "width=200,height=200");

    newWin.onload = function() {
      if(newWin.document.getElementsByClassName("inlineIcon duration")[0] === undefined)
      {
        newWin.close();
        currentField++;
        currentBuildingLvl = 0;
        return build();
      }

      let rawTime = newWin.document.getElementsByClassName("inlineIcon duration")[0].textContent.trim().split(":");
      let timeToNext = parseInt(rawTime[0]) * 3600000 + parseInt(rawTime[1]) * 60000 + parseInt(rawTime[2]) * 1000;
      // добавляем 1 секунду на всякий случай
      timeToNext += 1000;
      window.console.log(timeToNext);

      let buildWin = newWin.open("https://" + domain + ".ttwars.com/build.php?id=" + currentField + "&fastUP=1", "", "width=200,height=200");

      buildWin.onload = function() {
        buildWin.close();
        currentBuildingLvl++;
      }

      newWin.close();
      
      setTimeout(() => {
        build();
      }, timeToNext);
    }

    console.log("current upgrade field: " + currentField + " | lvls builded: " + currentBuildingLvl);
  }

  build();
}

export function StartRaid()
{
  for(let elem of document.getElementsByClassName("green "))
  {
    if(elem.innerText == "Start raid")
    {
      elem.removeAttribute("onclick");

      setTimeout(() => {
        elem.click();
      }, 100);
    }
  }
}