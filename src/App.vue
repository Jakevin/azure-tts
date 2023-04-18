

<template>
  <div id="content">
    <el-input
          v-model="textarea"
          maxlength="400"
          placeholder="Please input"
          show-word-limit
          :rows="5"
          type="textarea"
        />

    <div style="text-align: left;" >
      設定 / Setting <el-tag class="ml-2" @click="openSetting = !openSetting ">展開 <el-icon><ArrowDownBold  /></el-icon></el-tag> 
      <div v-if="openSetting">
        <div>
          語音/Voice：
          <el-radio-group v-model="lang" class="ml-4">
            <el-radio label="zh-TW" size="large">中文</el-radio>
            <el-radio label="ja-JP" size="large">日本語</el-radio>
            <el-radio label="en-US" size="large">English</el-radio>
          </el-radio-group>
        </div>

        <div>
            語速/Speech rate：<br/>
          <el-radio-group v-model="speechRate" class="ml-4">
            <el-radio label="-40" size="large">超慢/Very Slow</el-radio>
            <el-radio label="-20" size="large">慢/Slow</el-radio>
            <el-radio label="0" size="large">正常/Normal</el-radio>
            <el-radio label="20" size="large">快/Fast</el-radio>
          </el-radio-group>
        </div>
        <div>
          Gender：
          <el-radio-group v-model="gender" class="ml-4">
            <el-radio label="female" size="large">女/Female</el-radio>
            <el-radio label="male" size="large">男/Male</el-radio>
          </el-radio-group>
        </div>
      </div>
      
    </div>

    <audio 
      :src="audioSRC"
      controls
    >
    </audio>
    
    <div style="display: flex; text-align: left;margin-top: 20px; ">
      單字
      <el-input
        v-model="vocabulary"
        placeholder="Please input"
        class="input-with-select"
      >
        <template #append>
          <el-button v-loading="isLoading" @click="generatePronounce(vocabulary,'v')"> 
            <el-icon> <Switch /> </el-icon> 
          </el-button>
        </template>
      </el-input>
      
      <audio style="margin-left: 20px;" ref="vocabularyPlayer" controls> </audio>
    </div>
    

    <div id="footer" v-loading="isLoading">
      <el-button style="width: 90px; height: 90px;"> 
        <el-icon style="font-size: 80px">
          <div>
            <Switch @click="generatePronounce(textarea,'sentence')"/>
          </div>
        </el-icon> 
      </el-button>
    </div>
  </div>

</template>

<script setup>
import { reactive,watch,ref } from 'vue'
const BASE_URL = "https://asia-east1-accupass-project.cloudfunctions.net/thingsboard/"

const openSetting = ref(false)
const lang = ref("en-US")
const gender = ref("female")
const speechRate = ref("0")

const textarea = ref("")
const audioSRC = ref("")

const vocabulary = ref("")
const vocabularyPlayer = ref()

const isLoading = ref(false)


async function generatePronounce(text,type) {
  try {
    isLoading.value = true

    let voice = "zh-CN-XiaoshuangNeural"

    if(gender.value=="male"){
      switch(lang.value){
        case "zh-TW":
          voice = 'zh-TW-YunJheNeural'
          break

        case "en-US":
          voice = 'en-US-GuyNeural'
          break

        case "ja-JP":
          voice = 'ja-JP-KeitaNeural'
          break
      }
    }else{
      switch(lang.value){
        case "zh-TW":
          voice ='zh-TW-HsiaoChenNeural'
          break

        case "en-US":
          voice = "en-US-JennyNeural"
          break

        case "ja-JP":
          voice = "ja-JP-MayuNeural"
          break
      }
    }

    const response = await fetch(`${BASE_URL}?type=pronounce`,
        {
            body: JSON.stringify({"text": text, "language": lang.value, "voice": voice, sr: `${speechRate.value}%`}),
            method: "post",
            headers: {
                "content-type": "application/json",
            },
        }
    )

    const reader = new FileReader();
    reader.onloadend = async () => {
      switch(type){
        case 'v':
        vocabularyPlayer.value.src = reader.result
        vocabularyPlayer.value?.play()
        break

        case 'sentence':
        audioSRC.value = reader.result

        break
      }
      
    }
    reader.readAsDataURL(await response.blob());
  } catch(error) {
    console.log(`Error: ${error}`);
  }     
  isLoading.value = false
}
</script>

<style scoped>
#content {
  text-align: center;
  background-color: #fff;
  width: 100%;
}

#footer{
  text-align: center;
  height: 100px; /* footer 的高度 */
  background-color: #fff;
  position: fixed; /* 固定在畫面底部 */
  bottom: 0;
  width: 100%;
}
</style>
