<template>
  <div class="explore-container">
    <div class="explore-header">
      <img src="/search_placeholder.png" alt="Logo" class="explore-logo">
      <span class="explore-seperator">|</span>
      <span class="explore-title"> Explore</span>
    </div>
    <div class="explore-search">
      <div class="explore-input">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input placeholder="enter some keywords" class="explore-input-field" v-model="searchText">
      </div>
      <button class="explore-button" @click="toSearch">
        Search
      </button>
    </div>
    <div class="search-selected">
      <div class="search-content">
        <div class="search-content__header">Search for: </div>
        <el-radio-group v-model="selectSearch" fill="#3b82f6" class="search-radios">
          <el-radio-button label="profile" size="large">profile</el-radio-button>
          <el-radio-button label="tweet" size="large">tweet</el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router'
const router = useRouter()
const searchText = ref("")
const selectSearch = ref("profile")
const toSearch = async () => {
  if (selectSearch.value === "profile") {
    await router.push({ name: "profile", query: { username: searchText.value } })
  } else {
    await router.push({ name: "tweet", query: { tweet: searchText.value } })
  }
}
</script>
<style lang="scss" scoped>
.explore-container {
  font-size: 200%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 6.25rem;
  /* 100px */
}

.explore-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  /* 8px */
}

.explore-logo {
  height: 4rem;
  /* 40px */
  width: 10rem;
  /* 100px */
  object-fit: cover;
}

.explore-seperator {
  color: #2563eb;
  margin: 0 0.5rem;
  font-size: 4rem;
  /* 8px */
}

.explore-title {
  font-size: 3rem;
  font-weight: 600;
  color: #3b82f6;
}

.explore-search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.explore-input {
  width: 50rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  border: 0.125rem solid gray;
  /* 2px */
  border-radius: 0.25rem;
  /* 4px */
  padding: 0.25rem 0.5rem;
  /* 4px 8px */
}

.explore-input svg {
  color: gray;
  width: 2rem;
  height: 2rem;
}

.explore-input input {
  flex: 1;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 2rem;
}

.explore-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  /* 4px */
  font-size: 2rem;
  font-weight: 500;
  transition: background-color 0.3s;
  outline: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  /* 4px 8px */
  margin-left: 0.25rem;
  /* 4px */
  background-color: #3b82f6;
  color: white;
}

.explore-button:hover {
  background-color: #2563eb;
}

.search-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  /* 10px */
  margin-top: 0.625rem;
  /* 10px */
  width: 100%;
}

.search-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.625rem;
  /* 10px */
  margin-top: 0.625rem;
  /* 10px */
}

.search-content__header {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;

}

.search-radios {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* 10px */
  margin-top: 0.625rem;
  /* 10px */
}
</style>