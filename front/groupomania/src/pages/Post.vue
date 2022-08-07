<template>
  <section>
    <div class="post-img__wrapper" @click="exitOnClick()">
      <img
        src="../assets/images/x_icon.svg"
        alt="exit button"
        class="post-img__exit-btn"
        @click="$router.go(-1)"
      />
      <img :src="media" alt="post image" class="post-img__img" />
    </div>
    <div class="comments">
      <div class="comments__poster-info" @click="exitOnClick()">
        <div class="comments-info__text">
          <router-link
            :to="'/profile/' + userId + '.' + firstName + '.' + lastName"
          >
            <img
              :src="profilePicture"
              alt="profile picture"
              class="comments__profile-picture"
            />
          </router-link>
          <p>{{ firstName }} {{ lastName }}</p>
          <p>{{ timestamp }}</p>
        </div>
        <div>
          <p class="comments-info__des">{{ descriptionText }}</p>
        </div>
      </div>
      <div class="comments__likes">
        <span>likes</span>
        <img
          src="../assets/images/reactions/like.svg"
          alt="like button"
          class="like-desktospan"
          @click="reaction(postId, tokenId, 'like') && postDataChange()"
        />
        <span>{{ like }}</span>
        <img
          src="../assets/images/reactions/comment.png"
          alt="comment button"
        />
        <span>{{ comments }}</span>
      </div>
      <div class="comments__reactions">
        <img
          src="../assets/images/reactions/heart_eyes.svg"
          alt="heart eye emoji"
          class="comments__emoji"
          @click="reaction(postId, tokenId, 'heartreact')"
        />
        <span>{{ heartEyeEmoji }}</span>
        <img
          src="../assets/images/reactions/laugh.svg"
          alt="laughing emoji"
          class="comments__emoji"
          @click="reaction(postId, tokenId, 'laughreact')"
        />
        <span>{{ laughEmoji }}</span>
        <img
          src="../assets/images/reactions/angry.svg"
          alt="angry emoji"
          class="comments__emoji"
          @click="reaction(postId, tokenId, 'angryreact')"
        />
        <span>{{ angryEmoji }}</span>
        <img
          src="../assets/images/reactions/smile.svg"
          alt="smiling emoji"
          class="comments__emoji"
          @click="reaction(postId, tokenId, 'smilereact')"
        />
        <span>{{ smileEmoji }}</span>
        <img
          src="../assets/images/reactions/cry.svg"
          alt="crying emoji"
          class="comments__emoji"
          @click="reaction(postId, tokenId, 'cryreact')"
        />
        <span>{{ cryEmoji }}</span>
      </div>
      <div class="commenter" @click="exitOnClick()">
        <div
          class="commenter__wrapper"
          v-for="comment in commentsArray"
          :comment="comment"
          :key="comment.index"
        >
          <div class="commenter__info">
            <p class="commenter__name">
              {{ comment.first_name }} {{ comment.last_name }}
            </p>
            <img
              :src="comment.profile_picture"
              alt="commenter's picture"
              class="commenter__img"
            />
          </div>
          <div class="commenter__text-wrapper">
            <div class="commenter__text">
              <p>{{ comment.time_stamp.split("T")[0] }}</p>
              <p>{{ comment.comment_text }}</p>
            </div>
            <div class="commenter__response">
              <p>like</p>
              <p>Reply</p>
            </div>
            <div class="commenter-opt" v-if="comment.user_id === tokenId">
              <form
                v-if="edit === true"
                v-on:keydown.enter="editUserComment(comment.id)"
              >
                <textarea
                  class="commenter-opt__text"
                  id="post-comment"
                  placeholder="write a comment...."
                  cols="70"
                  rows="2"
                  v-model.trim="editText.val"
                >
                <input type="submit" hidden>
                </textarea>
              </form>
              <div class="commenter-opt__btns">
                <button class="commenter-opt__edit" @click="toggleEditComment">
                  edit
                </button>
                <form
                  @submit.prevent="deleteUserComment(comment.id)"
                  class="commenter-opt__del"
                >
                  <button type="submit">DELETE</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        v-on:keydown.enter="postComment"
        class="comment-text"
      >
        <textarea
          id="post-comment"
          placeholder="write a comment...."
          cols="70"
          rows="2"
          v-model.trim="commentText.val"
        >
          <input type="submit" hidden>
          </textarea
        >
      </form>
      <form v-if="deleteBtn" @submit.prevent="deletePost" class="del-btn">
        <button type="submit">DELETE POST</button>
      </form>

      <emoji-pop-up v-if="modelVisable" class="emoji-pop"></emoji-pop-up>
    </div>
  </section>
</template>

<script>
import http from "../mixins/http";
import utils from "../mixins/utilmixins";
import router from "../router/index.js";
import getUserInfo from "../mixins/getUserInfo";
export default {
  mixins: [http, utils, getUserInfo],
  data() {
    return {
      postId: this.$route.path.split("/")[2],
      userId: null,
      tokenId: null,
      descriptionText: null,
      firstName: null,
      lastName: null,
      media: null,
      profilePicture: null,
      timestamp: null,
      titleText: null,
      modelVisable: false,
      commentsArray: [],
      like: null,
      angryEmoji: null,
      cryEmoji: null,
      heartEyeEmoji: null,
      laughEmoji: null,
      shockEmoji: null,
      smileEmoji: null,
      comments: null,
      deleteBtn: null,
      deleteComment: null,
      edit: false,
      commentText: {
        val: "",
        isValid: true,
      },
      editText: {
        val: "",
        isValid: true,
      },
    };
  },
  created() {
    this.checkToken();
    this.getUserId();
    this.getPost();
    this.getComments();
  },
  methods: {
    toggleModel() {
      this.modelVisable = !this.modelVisable;
    },

    async getUserId() {
      const body = { id: localStorage.getItem("token") };
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/user/id",
        body,
        "POST"
      );
      this.tokenId = data.message;
    },

    async getPost() {
      const body = { id: this.postId };
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/post/singlepost",
        body,
        "POST"
      );
      const array = data.message;

      console.log(data);
      this.media = array[0].media;
      this.descriptionText = array[0].description_text;
      this.firstName = array[0].first_name;
      this.lastName = array[0].last_name;
      this.profilePicture = array[0].profile_picture;
      this.timestamp = array[0].time_stamp.split("T")[0];
      this.titleText = array[0].title_text;
      this.like = array[0].pl;
      this.angryEmoji = array[0].ae;
      this.cryEmoji = array[0].ce;
      this.heartEyeEmoji = array[0].he;
      this.laughEmoji = array[0].le;
      this.smileEmoji = array[0].sme;
      this.comments = array[0].pc;
      this.userId = array[0].user_id;

      if (this.userId === this.tokenId) {
        this.deleteBtn = true;
        this.deleteComment = true;
      }
    },

    async postDataChange() {
      const body = { id: this.postId };
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/post/singlepost",
        body,
        "POST"
      );
      const array = await data.message;
      console.log(array);

      this.like = array[0].pl;
      this.angryEmoji = array[0].ae;
      this.cryEmoji = array[0].ce;
      this.heartEyeEmoji = array[0].he;
      this.laughEmoji = array[0].le;
      this.smileEmoji = array[0].sme;
      this.comments = array[0].pc;
    },

    async deletePost() {
      const body = { id: this.postId };
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/post/delete",
        body,
        "DELETE"
      );
      router.go(-1);
    },

    async getComments() {
      this.commentsArray = [];
      const body = { id: this.postId };
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/comment/allcomments",
        body,
        "POST"
      );

      console.log(data);
      console.log(this.tokenId);
      this.extractPromise(data, this.commentsArray);
    },

    async postComment() {
      const userInfo = await this.getUserInfo();
      const body = {
        postId: this.postId,
        userId: userInfo.message.id,
        text: this.commentText.val,
      };

      const data = await this.fetchWithBody(
        "http://localhost:3000/api/comment/write",
        body,
        "POST"
      );
      console.log(data);
      this.getComments();
      this.postDataChange();
      this.commentText.val = "";
    },

    toggleEditComment() {
      if (this.edit == false) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    },

    async deleteUserComment(id) {
      const body = { id: id };
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/comment/delete",
        body,
        "DELETE"
      );
      this.getComments();
    },

    async editUserComment(id) {
      const body = { id: id, text: this.editText.val };
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/comment/edit",
        body,
        "PATCH"
      );
      console.log(data);
      this.getComments();
      this.editText.val = "";
      this.edit = false;
    },

    exitOnClick() {
      if ((this.modelVisable = true)) {
        this.modelVisable = !this.modelVisable;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;

  @include breakpoint-down(mobile) {
    flex-direction: column;
  }
}

.post-img {
  &__wrapper {
    width: 50vw;
    height: 100vh;
    overflow: hidden;

    @include breakpoint-down(mobile) {
      width: 100vw;
      height: 40vh;
    }
  }

  &__exit-btn {
    position: absolute;
    padding-top: 20px;
    padding-left: 10px;
    opacity: 60%;
    width: 50px;

    &:hover {
      cursor: pointer;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: fill;

    @include breakpoint-down(mobile) {
      width: 100%;
      object-fit: fill;
    }
  }
}

.comments {
  width: 50vw;
  height: 93vh;
  display: flex;
  flex-direction: column;

  @include breakpoint-down(mobile) {
    width: 100%;
    height: max-content;
  }

  &__poster-info {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-left: 40px;
    margin-bottom: 20px;

    @include breakpoint-down(mobile) {
      margin-left: 10px;
    }
  }

  &__profile-picture {
    align-self: flex-start;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-right: 20px;
    margin-bottom: 15px;
  }

  &-info__text {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & p {
      padding-bottom: 15px;
      font-size: rem(15);
      font-weight: 500;
    }
  }

  &-info__des {
    margin-left: 50px;

    @include breakpoint-down(mobile) {
      margin: unset;
    }
  }
  &__likes {
    display: flex;
    align-items: center;
    padding-left: 50px;
    border-top: 2px solid $secondary-color;
    border-bottom: 2px solid $secondary-color;

    @include breakpoint-down(mobile) {
      padding: unset;
      margin-left: 10px;
    }

    & img {
      width: 40px;
      height: 40px;
      margin-right: 7px;

      &:hover {
        cursor: pointer;
      }
    }

    & span {
      font-size: rem(20);
      font-weight: 500;
      padding-right: 15px;
    }
  }

  &__reactions {
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-left: 50px;
    border-bottom: 2px solid $secondary-color;

    @include breakpoint-down(mobile) {
      padding: unset;
      margin-left: 7px;
    }

    & span {
      padding-right: 10px;
      font-size: rem(20);
      font-weight: 500;
    }
  }

  &__emoji {
    width: 40px;
    height: 40px;
    margin-right: 10px;

    &:hover {
      cursor: pointer;
    }
  }
}

.commenter {
  height: 100%;
  overflow-y: scroll;
  padding-left: 15px;
  padding-top: 30px;
  padding-bottom: 16px;
  margin-bottom: 15px;

  &__wrapper {
    display: flex;
    width: 95%;
    border-radius: 15px;
    padding-left: 10px;
    margin-bottom: 20px;
    background: rgba(107, 104, 104, 0.3);
  }

  &__info {
    padding-right: 20px;
    padding-bottom: 15px;
  }

  &__name {
    text-indent: 10px;
    font-weight: 600;
    padding-top: 10px;
    padding-bottom: 7px;
  }

  &__img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  &__text-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__text {
    padding-bottom: 15px;

    & p:nth-child(1) {
      padding-bottom: 5px;
    }
  }

  &__response {
    display: flex;
    padding-bottom: 10px;

    & p {
      padding-right: 15px;
      font-weight: 600;
    }
  }

  &-opt {
    display: flex;
    flex-direction: column;
    margin-top: 10%;

    @include breakpoint-down(mobile) {
      margin-right: 10px;
      padding: 5px;
      margin-top: unset;
      justify-content: center;
      align-items: center;
    }

    &__btns {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      @include breakpoint-down(mobile) {
        height: 20px;
      }
    }

    &__text {
      width: 90%;
      margin-bottom: 10px;
      resize: none;
      outline: none;
      border-radius: 10px;
      border: 2.5px solid $secondary-color;
      text-indent: 5px;
      padding-top: 2px;
      background-color: rgba(107, 104, 104, 0.3);
    }

    &__del,
    &__edit {
      margin-left: 20%;

      @include breakpoint-down(mobile) {
        height: 24px;
      }
    }
  }
}

.comment-text {
  padding-left: 20px;
  & textarea {
    resize: none;
    outline: none;
    border-radius: 10px;
    border: 2.5px solid $secondary-color;
    text-indent: 5px;
    padding-top: 2px;
    background-color: rgba(107, 104, 104, 0.3);

    @include breakpoint-down(mobile) {
      width: 95%;
    }
  }
}

.emoji-pop {
  display: none;

  @include breakpoint-down(mobile) {
    position: absolute;
    top: 250px;
    background-color: #6b6868 !important;
  }
}
</style>