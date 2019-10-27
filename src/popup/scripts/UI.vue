<template>
  <div class="ui_main_box" ref="mainBox" @mousedown="startDrag">
    <div class="ui_header">TTWars Bot v{{getVersion}} by Scr1m ({{status}})</div>

    <div class="ui_button_box">
      <input class="ui_input" type="text" placeholder="Введите ID здания" ref="buildID" @mousedown="mouseOnButton" />
      <div class="ui_button" @click="upgradeToFull" @mousedown="mouseOnButton">Достроить здание</div>
    </div>

    <div class="ui_button_box">
      <input class="ui_input" type="text" placeholder="Введите название рейда" ref="raidName" @mousedown="mouseOnButton" />
      <div class="ui_button" @click="prepareRaid" @mousedown="mouseOnButton">Отправить рейд</div>
    </div>

    <div class="ui_button_box">
      <input class="ui_input" type="text" placeholder="Введите название войска" ref="improveName" @mousedown="mouseOnButton" />
      <div class="ui_button" @click="improveTroop" @mousedown="mouseOnButton">Улучшить</div>
    </div>

    <div class="ui_button_box">
      <div class="ui_button" @click="upgradeAllFields" @mousedown="mouseOnButton">Улучшить все поля</div>
      <div class="ui_button" @click="trainScouts" @mousedown="mouseOnButton">Обучить скаутов</div>
    </div>

    <div class="ui_button_box">
      <div class="ui_button" @click="trainRams" @mousedown="mouseOnButton">Обучить тараны</div>
      <div class="ui_button" @click="trainCatapults" @mousedown="mouseOnButton">Обучить каты</div>
    </div>

    <div class="ui_button_box">
      <div class="ui_button" @click="trainClubs" @mousedown="mouseOnButton">Обучить дубов</div>
      <div class="ui_button" @click="trainTeutonics" @mousedown="mouseOnButton">Обучить коней</div>
    </div>

    <div class="ui_button_box" v-if="isGoldServer">
      <div class="ui_button" @click="buyResources" @mousedown="mouseOnButton">Купить ресурсы</div>
      <div class="ui_button" @click="buyAnimals" @mousedown="mouseOnButton">Купить животных</div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isMouseOnButton: false,
      status: "idle",
      isGoldServer: false,
      domain: ""
    }
  },
  computed: 
  {
    getVersion: function()
    {
      return this.$store.state.version;
    }
  },
  mounted: function()
  {
    let firstSlash = location.href.indexOf("/", 0);
    let firstDot = location.href.indexOf(".", 0);
    let domain = location.href.substr(firstSlash + 2, firstDot - firstSlash - 2);
    this.domain = domain;

    if(domain.indexOf("unl", 0) != -1) this.isGoldServer = true;

    this.$nextTick(() => {
      this.$refs.mainBox.style.top = window.innerHeight - this.$refs.mainBox.clientHeight + "px";
    });
  },
  methods:
  {
    startDrag: function()
    {
      if(this.isMouseOnButton) return;

      const mousemove = (e) => {
        this.$refs.mainBox.style.top = e.pageY + "px";
        this.$refs.mainBox.style.left = e.pageX - this.$refs.mainBox.clientWidth / 2 + "px";
      }

      const mouseup = () => {
        document.removeEventListener("mouseup", mouseup);
        document.removeEventListener("mousemove", mousemove);
      }

      document.addEventListener("mouseup", mouseup);
      document.addEventListener("mousemove", mousemove);
    },
    mouseOnButton: function()
    {
      this.isMouseOnButton = true;
      
      const mouseup = () => {
        this.isMouseOnButton = false;

        document.removeEventListener("mouseup", mouseup);
      }

      document.addEventListener("mouseup", mouseup);
    },
    upgradeToFull: function()
    {
      this.status = "work";
      location.href="javascript:SAPI.buildToFull('" + this.$refs.buildID.value + "'); void 0";
    },
    upgradeAllFields: function()
    {
      this.status = "work";
      location.href="javascript:SAPI.upgradeAllFields(); void 0";
    },
    trainTeutonics: function()
    {
      this.status = "work";
      let troopName = "Teutonic Knight";
      let buildURL = "https://" + this.domain + ".ttwars.com/build.php?id=23";

      this.prepareTrainButton(troopName, buildURL);
    },
    trainRams: function()
    {
      this.status = "work";
      let troopName = "Ram";
      let buildURL = "https://" + this.domain + ".ttwars.com/build.php?id=25";

      this.prepareTrainButton(troopName, buildURL);
    },
    trainCatapults: function()
    {
      this.status = "work";
      let troopName = "Catapult";
      let buildURL = "https://" + this.domain + ".ttwars.com/build.php?id=25";

      this.prepareTrainButton(troopName, buildURL);
    },
    trainClubs: function()
    {
      this.status = "work";
      let troopName = "Clubswinger";
      let buildURL = "https://" + this.domain + ".ttwars.com/build.php?id=32";

      this.prepareTrainButton(troopName, buildURL);
    },
    trainScouts: function()
    {
      this.status = "work";
      let troopName = "Scout";
      let buildURL = "https://" + this.domain + ".ttwars.com/build.php?id=32";

      this.prepareTrainButton(troopName, buildURL);
    },
    prepareTrainButton: function(troopName, buildURL)
    {
      if(this.isGoldServer)
      {
        this.tradeResoucesForTroops(troopName, buildURL).then(resWindow => {
          resWindow.close();

          let newWin = window.open(buildURL, "", "width=200,height=200");

          newWin.onload = () => {
            this.activateTrainButton(newWin, troopName);
          }
        });
      }
      else
      {
        let newWin = window.open(buildURL, "", "width=200,height=200");

        newWin.onload = () => {
          this.activateTrainButton(newWin, troopName);
        }
      }
    },
    activateTrainButton: function(newWin, troopName)
    {
      for(let elem of newWin.document.getElementsByClassName("details"))
      {
        if(elem.innerText.split(" (")[0].trim() == troopName)
        {
          elem.getElementsByTagName("a")[2].click();
          break;
        }
      }

      for(let elem of newWin.document.getElementsByClassName("green startTraining"))
      {
        if(elem.innerText == "Train")
        {
          elem.click();
          
          setTimeout(() => {
            newWin.close();
            window.location.reload();
          }, 1000);

          break;
        }
      }
    },
    tradeResoucesForTroops: function(troopName, windowUrl)
    {
      return new Promise((resolve, reject) => {
        let resWindow = window.open(windowUrl, "", "width=200,height=200");

        resWindow.onload = () => {
          for(let detailElem of resWindow.document.getElementsByClassName("details"))
          {
            if(detailElem.innerText.split(" (")[0].trim() == troopName)
            {
              for(let elem of detailElem.getElementsByClassName("gold"))
              {
                if(elem.innerText == "Exchange resources")
                {
                  elem.click();

                  const timer = setTimeout(() => {
                    for(let changeElem of resWindow.document.getElementsByClassName("gold"))
                    {
                      if(changeElem.innerText == "Distribute remaining resources.")
                      {
                        clearInterval(timer);
                        changeElem.click();

                        const endTimer = setInterval(() => {
                          for(let endElem of resWindow.document.getElementsByClassName("gold"))
                          {
                            if(endElem.innerText == "Redeem now5")
                            {
                              clearInterval(endTimer);
                              endElem.click();
                              
                              setTimeout(() => {
                                resolve(resWindow);
                              }, 1000);
                            }
                          }
                        }, 100);
                      }
                    }
                  }, 100);
                }
              }
            }
          }
        }
      });
    },
    prepareRaid: function()
    {
      this.status = "work";
      let raidName = this.$refs.raidName.value;

      if(raidName.length == 0) 
      {
        alert("Неверное название рейда!");
        this.status = "idle";
        return;
      }

      let newWin = window.open("https://" + this.domain + ".ttwars.com/build.php?tt=99&id=39", "", "width=200,height=200");

      newWin.onload = () => {
        this.markAllRaidElements(newWin, raidName).then(isMarked => {
          if(!isMarked)
          {
            window.alert("Список " + raidName + " не найден в фарм листе!");
            newWin.close();
            this.status = "idle";
          }

          newWin.location.href = "javascript:SAPI.startRaid(); void 0";

          setTimeout(() => {
            let isSystemError = false;

            for(let elem of newWin.document.getElementsByClassName("listEntry"))
            {
              if(elem.getElementsByClassName("listTitleText")[0].innerText.split(" - ")[1] == raidName)
              {
                for(let searchErrorElem of elem.getElementsByTagName("p"))
                {
                  if(searchErrorElem.innerText == "System: You must wait some time before sending another raid.")
                  {
                    isSystemError = true;
                  }
                }
              }
            }

            if(isSystemError) 
            {
              window.alert("[Travian error] System: You must wait some time before sending another raid.");
            }

            newWin.close();
            window.location.reload();
          }, 2000);
        });
      }
    },
    markAllRaidElements: function(raidWindow, raidName)
    {
      return new Promise((resolve, reject) => {
        let isRaidFinded = false;

        for(let elem of raidWindow.document.getElementsByClassName("listEntry"))
        {
          if(elem.getElementsByClassName("listTitleText")[0].innerText.split(" - ")[1] == raidName)
          {
            isRaidFinded = true;

            elem.getElementsByClassName("openedClosedSwitch switchOpened")[0].click();

            const timer = setInterval(() => {
              let markAllElem = elem.getElementsByClassName("markAll check")[0];

              if(markAllElem == undefined) return;

              clearInterval(timer);

              markAllElem.click();

              const isCheckedTimer = setInterval(() => {
                if(!markAllElem.checked) return;

                clearInterval(isCheckedTimer);
                resolve(true);
              });
            }, 100);
          }
        }

        if(!isRaidFinded) resolve(false);
      });
    },
    // TODO:: Сделать сюда проверку на наличие окна о времени (неудачная покупка)
    buyResources: function()
    {
      this.status = "work";
      location.href = "javascript:window.fireEvent('startWayOfPayment', ['buyResources6', 'paymentWizard']); void 0";

      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    buyAnimals: function()
    {
      this.status = "work";
      location.href = "javascript:window.fireEvent('startWayOfPayment', ['buyAnimal5', 'paymentWizard']); void 0";

      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    // TODO end
    improveTroop: function()
    {
      let name = this.$refs.improveName.value;

      if(name.length == 0) return alert("Введите название войска");
      this.status = "work";

      const timer = setInterval(() => {
        let newWin = window.open("https://" + this.domain + ".ttwars.com/build.php?id=24", "", "width=200,height=200");

        newWin.onload = () => {
          for(let elem of newWin.document.getElementsByClassName("information"))
          {
            if(elem.getElementsByClassName("title")[0].innerText.split(" ")[1] == name)
            {
              if(elem.getElementsByClassName("level")[0].innerText.split(" ")[1] == "20")
              {
                clearInterval(timer);
                newWin.close();
                window.location.reload();
                return;
              }
              
              for(let buttonElem of elem.getElementsByClassName("button-content"))
              {
                if(buttonElem.innerText == "Improve")
                {
                  console.log("[0]");
                  buttonElem.click();

                  setTimeout(() => {
                    console.log("[1]");
                    newWin.close();
                  }, 200);
                  
                  break;
                }
              }
            }
          }
        };
      }, 3000);
    }
  },
}
</script>

<style scoped>

.ui_main_box {
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(14, 14, 14, 0.7);
  z-index: 9999;
  padding: 5px;
  border-radius: 5px;
}

.ui_header {
  user-select: none;
  font: 18px Consolas;
  color: rgb(241, 241, 241);
  margin-bottom: 5px;
  text-align: center;
}

.ui_button_box {
  display: flex;
  margin-bottom: 5px;
}

.ui_button_box > :nth-child(2)
{
  margin-left: 5px;
}

.ui_button {
  width: 180px;
  height: 24px;
  background: rgba(241, 241, 241, 0.3);
  border: 1px solid rgba(241, 241, 241, 0.5);
  cursor: pointer;
  transition: .2s all ease;
  user-select: none;
  /* Текст */
  font: 700 17px Consolas;
  color: #2ecc71;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ui_button:hover {
  font: 700 18px Consolas;
}

.ui_input {
  width: 178px;
}

</style>
