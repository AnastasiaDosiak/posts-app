<template>
  <div class="container mt-4">
    <a-card class="post-card">
      <div class="post-content">
        <h1 class="mt-5 mb-3">{{ post.title }}</h1>
        <p class="body-text">{{ post.body }}</p>
        <div class="d-flex justify-content-between">
          <div class="tags">
            <a-tag v-for="tag in post.tags" :key="tag" color="pink">{{ tag }}</a-tag>
          </div>
          <div class="reactions">
            Reactions: {{ post.reactions }}
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
import {getPostById} from "~/server/api/post";

const route = useRoute()
const post = await getPostById(route.params.id);
</script>

<style src="assets/post-details.css" scoped/>

