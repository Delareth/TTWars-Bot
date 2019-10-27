<template>
  <div class="box">
    <p>TTWars bot {{getVersion}} by Scr1m</p>
    <button @click="showPanel">Показать панель</button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      panelState: true
    }
  },
  computed: 
  {
    getVersion: function()
    {
      return this.$store.state.version;
    }
  },
  methods:
  {
    showPanel: function()
    {
      this.panelState = !this.panelState;

      if(this.panelState)
      {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(tabs[0].id, { code: "document.getElementById('scr1m_bot').style.display = 'block';" });
        });
      }
      else
      {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(tabs[0].id, { code: "document.getElementById('scr1m_bot').style.display = 'none';" });
        });
      }
    },
    alertToPage: function(text)
    {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, { code: "alert('" + text + "');" });
      });
    },
    consoleToPage: function(stringOrNumber)
    {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, { code: "console.log('" + stringOrNumber + "');" });
      });
    }
  }
}
</script>

<style lang="scss" scoped>

.box {
  width: 150px;

  display: flex;
  justify-content: center;
  flex-direction: column;
}

p {
  font-size: 16px;
}
</style>
