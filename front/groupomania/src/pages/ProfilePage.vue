<template>
  <section>
    <the-header
      :picture="userProfilePicture"
      :route="settingsBtn"
      class="profile-header"
    ></the-header>
    <div class="cover" v-if="paramsEqual || findUser">
      <div class="cover__color-bg">
        <div class="cover__img-container">
          <img
            :src="profilePicture"
            alt="profile picture"
            class="cover__profile-img"
          />
          <p class="cover__name">{{ firstName }}_{{ lastName }}</p>
        </div>
      </div>
    </div>

    <div class="page-error" v-show="!paramsEqual && !findUser">
      <p>Cant find Page</p>
      <img src="../assets/images/cantfind.jpg" alt="unable to find page" />
    </div>

    <div class="title">
      <h1>Post By {{ firstName }} {{ lastName }}</h1>
    </div>

    <div class="post-wrapper">
      <div
        class="posts"
        v-for="post in profilePostArray"
        :post="post"
        :key="post.index"
      >
        <post-element
          :link="post.id"
          :timestamp="post.time_stamp.split('T')[0]"
          :media="post.media"
          :title="post.title_text"
          :description="post.description_text"
          :name="post.first_name"
          :profilePicture="post.profile_picture"
          :pl="post.pl"
          :pc="post.pc"
        >
        </post-element>
      </div>
    </div>
  </section>
</template>

<script>
import TheHeader from "../components/layout/TheHeader.vue";
import getUserInfo from "../mixins/getUserInfo";
import http from "../mixins/http";
export default {
  mixins: [http, getUserInfo],
  components: {
    TheHeader,
  },
  data() {
    return {
      id: null,
      firstName: null,
      lastName: null,
      userProfilePicture: null,
      profilePicture: null,
      profileId: null,
      paramsEqual: null,
      findUser: null,
      profilePostArray: [],
      settingsBtn: "",
    };
  },
  created() {
    this.CheckUserAccount();
    this.vistProfilePage();
  },
   watch: {
    $route(to, from) {
        this.profilePostArray = [];
        this.CheckUserAccount();
        this.vistProfilePage();
    },
  },
  methods: {
    async CheckUserAccount() {
      const data = await this.fetchGet("http://localhost:3000/api/user/user");

      console.log(data.message);
      this.userProfilePicture = data.message.profile_picture;
      const id = data.message.id;
      const name = `${data.message.first_name}_${data.message.last_name}`;

      const param = `/profile/${id}.${name}`;
      const params = param;

      if (this.$route.path === params) {
        console.log(true);
        this.paramsEqual = true;
        this.firstName = data.message.first_name;
        this.lastName = data.message.last_name;
      } else {
        console.log(false);
        this.paramsEqual = false;
      }

      this.settingsBtn = `/profile/${id}.${name}`;
      console.log(this.settingsBtn);
    },
    async vistProfilePage() {
      const route = this.$route.path.split(".");
      const splitRoute = route[0].split("/");
      this.profileId = splitRoute[2];
      const body = { id: parseInt(splitRoute[2]) };
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/user/profile",
        body,
        "POST"
      );

      console.log(this.profileId);

      if (data.message.status === "fail") {
        console.log("can\t find user");
        this.findUser = false;
        console.log(this.findUser);
        console.log(this.paramsEqual);
      } else {
        this.findUser = true;
        this.firstName = data.message.first_name;
        this.lastName = data.message.last_name;
        this.profilePicture = data.message.profile_picture;
        this.profilePost();
      }
    },

    async profilePost() {
      const body = { id: this.profileId };
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/post/profilepost",
        body,
        "POST"
      );

      this.extractPromise(data, this.profilePostArray);

      console.log(this.profilePostArray);
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-header {
  height: 10vh;
  background-color: rgba(253, 45, 1, 45%);
}

.cover {
  &__color-bg {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 20vh;
    background-color: rgba(253, 45, 1, 45%);
    margin-bottom: 125px;

    @include breakpoint-down(mobile) {
      height: 27vh;
      margin-bottom: 40px;
    }
  }

  &__img-container {
    display: flex;
    padding-top: 30px;

    @include breakpoint-down(mobile) {
      flex-direction: column;
      align-items: center;
      padding-top: 10px;
    }
  }

  &__profile-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;

    @include breakpoint-down(mobile) {
      width: 150px;
      height: 150px;
    }
  }

  &__name {
    font-size: rem(45);
    font-weight: bold;
    padding-top: 60px;
    padding-left: 100px;

    @include breakpoint-down(mobile) {
      padding-top: unset;
      padding-left: 20px;
      font-size: rem(30);
    }
  }
}

.title {
  display: flex;
  align-items: center;
  width: 40vw;
  height: 50px;
  margin: auto;
  margin-bottom: 35px;
  border-radius: 25px;
  background-color: rgba(107, 104, 104, 0.3);

  @include breakpoint-down(mobile) {
    width: 90vw;
    margin: auto;
    margin-bottom: 40px;
  }

  & h1 {
    text-indent: 50px;
    font-size: rem(25);

    @include breakpoint-down(mobile) {
      text-indent: 80px;
      font-size: rem(18);
    }
  }
}

.posts {
  width: 99vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.page-error {
  width: 100vw;
  height: 90vh;
  overflow: hidden;
  position: relative;

  & p {
    position: absolute;
    top: 30%;
    left: 43%;
    font-size: rem(50);
    font-weight: bold;
    color: $secondary-color;
  }
  & img {
    width: 100%;
    height: 100%;
  }
}
</style>