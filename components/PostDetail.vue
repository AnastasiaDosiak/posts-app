<template>
  <div class="container mt-4">
    <a-card class="post-card">
      <div class="post-content">
        <h1 class="mt-5 mb-3">{{ data.title }}</h1>
        <p class="body-text">{{ data.body }}</p>
        <div class="d-flex justify-content-between">
          <div class="tags">
            <a-tag v-for="tag in data.tags" :key="tag" color="pink">{{ tag }}</a-tag>
          </div>
          <div class="reactions">
            Reactions: {{ data.reactions }}
          </div>
        </div>
        <div class="user-info">
          <span class="user-info-text">By:</span>
          <a-avatar src="https://picsum.photos/id/505/200/300" />
        </div>
      </div>
    </a-card>
  </div>
</template>



<script setup>
const route = useRoute()
const { data, pending, error } = await useAsyncData(
    () => $fetch(`https://dummyjson.com/posts/${route.params.id}`)
)
</script>

<style scoped>
.post-card {
  border-radius: 1rem;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: flex-end;
}

.post-content {
  flex: 1;
}

.reactions {
  font-weight: bold;
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: flex-end;
}

.tags {
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: flex-end;
}

.user-info-text {
  margin-right: 1rem;
}
</style>
