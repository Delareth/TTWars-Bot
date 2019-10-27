import * as injectingCode from './controller';
import Vue from 'vue';
import UI from './UI';
import {store} from '../../store/index';

let firstSlash = location.href.indexOf("/", 0);
let firstDot = location.href.indexOf(".", 0);
let domain = location.href.substr(firstSlash + 2, firstDot - firstSlash - 2);

// не грузим если это главная страница ttwars.com
if(domain != "www")
{
  console.log("loading TTWars bot by Scr1m...");

  // generating vue

  // append div for display panel
  let mainDiv = document.createElement("div");
  mainDiv.id = "scr1m_bot";
  document.body.append(mainDiv);

  // append div for vue
  let vueDiv = document.createElement("div");
  vueDiv.id = "vue_ui";
  document.getElementById("scr1m_bot").append(vueDiv);

  // append vue control
  new Vue({
    el: '#vue_ui',
    store,
    render: h => h(UI)
  });

  // end vue generating

  let script = document.createElement('script');

  // form injected functions data
  script.textContent = "SAPI = {};"
  script.textContent += "SAPI.buildToFull = " + injectingCode.BuildToFull + ";";
  script.textContent += "SAPI.upgradeAllFields = " + injectingCode.UpgradeAllFields + ";";
  script.textContent += "SAPI.startRaid = " + injectingCode.StartRaid + ";";

  // load functions data to page
  (document.head||document.documentElement).appendChild(script);
  script.remove();

  console.log("TTWars Bot by Scr1m successful loaded!");
}