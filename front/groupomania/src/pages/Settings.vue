<template>
  <section>
    <the-header :picture="profilePicture"></the-header>
    <div class="user-info">
      <div class="user-info__profile-picture">
        <h3 class="title">{{ firstName }} {{ lastName }}</h3>
        <img :src="profilePicture" class="profile-picture" alt="" />
        <router-link to="/updateprofilepicture">
          <base-button class="base-btn">Change Picture</base-button>
        </router-link>
      </div>
      <div class="user-info__text">
        <div class="user-info__row">
          <p>Name</p>
          <p>{{ firstName }} {{ lastName }}</p>
          <router-link to="/changename">
            <base-button class="change-btn">change</base-button>
          </router-link>
        </div>
        <div class="user-info__row">
          <p>Email</p>
          <p>{{ email }}</p>
          <router-link to="/changeemail">
            <base-button class="change-btn">change</base-button>
          </router-link>
        </div>
        <div class="user-info__row">
          <p>password</p>
          <p>*******</p>
          <router-link to="/changepassword">
            <base-button class="change-btn">change</base-button>
          </router-link>
        </div>
        <div class="delete-account">
          <router-link to="/deleteaccount">
            <p>DELETE ACCOUNT</p>
          </router-link>
        </div>
      </div>
    </div>

    <footer>
      <img
        src="../assets/images/footer/group_1.jpg"
        class="footer__img"
        alt="group of professionals"
      />
      <img
        src="../assets/images/footer/group_2.jpg"
        class="footer__img"
        alt="group of professionals"
      />
      <img
        src="../assets/images/footer/group_3.jpg"
        class="footer__img"
        alt="group of professionals"
      />
    </footer>

    <div
      class="tint"
      v-if="renderFilter()"
      @click="tintReRoute('/settings')"
    ></div>
    <form @submit.prevent="deleteAccount">
      <base-module v-if="checkPath('/deleteaccount')">
        <template #form-content>
          <p>Are you sure you want to</p>
          <p>permanently delete your account?</p>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            :class="{ invalid: !deleteAccountPassword.isValid }"
            v-model.trim="deleteAccountPassword.val"
            @blur="clearValidity('deleteAccountPassword')"
          />
          <p class="validation-text" v-if="!deleteAccountPassword.isValid">
            incorrect password
          </p>
        </template>
        <template #buttons>
          <base-button type="submit" class="module__btn"
            >Delete Account</base-button
          >
          <base-button type="button" class="back-btn" @click="backBtn">
            Back</base-button
          >
        </template>
      </base-module>
    </form>
    <form @submit.prevent="changePassword" v-if="checkPath('/changepassword')">
      <base-module>
        <template #form-content>
          <p>Change Password</p>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            :class="{ invalid: !changePasswordPasswrod.isValid }"
            v-model.trim="changePasswordPasswrod.val"
            @blur="clearValidity('changePasswordPasswrod')"
          />
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            :class="{ invalid: !changePasswordEmail.isValid }"
            v-model.trim="changePasswordEmail.val"
            @blur="clearValidity('changePasswordEmail')"
          />
          <label for="new password">New Password</label>
          <input
            type="password"
            id="new password"
            :class="{ invalid: !changePasswordNewPassword.isValid }"
            v-model.trim="changePasswordNewPassword.val"
            @blur="clearValidity('changePasswordNewPassword')"
          />
          <label for="confrimpassword">Confrim Password</label>
          <input
            type="password"
            id="Confrim Password"
            :class="{ invalid: !changePasswordConfrim.isValid }"
            v-model.trim="changePasswordConfrim.val"
            @blur="clearValidity('changePasswordConfrim')"
          />
          <p class="validation-text" v-if="!passwordMatch">
            passwords do not match
          </p>
        </template>
        <template #buttons>
          <base-button type="submit" class="module__btn"
            >Update Password</base-button
          >
          <base-button type="button" class="back-btn" @click="backBtn">
            Back</base-button
          >
        </template>
      </base-module>
    </form>
    <form @submit.prevent="changeEmail" v-if="checkPath('/changeemail')">
      <base-module>
        <template #form-content>
          <p>Change Email</p>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            :class="{ invalid: !changeEmailPassword.isValid }"
            v-model.trim="changeEmailPassword.val"
            @blur="clearValidity('changeEmailPassword')"
          />
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            :class="{ invalid: !changeEmailEmail.isValid }"
            v-model.trim="changeEmailEmail.val"
            @blur="clearValidity('changeEmailEmail')"
          />
          <label for="new email">New Email</label>
          <input
            type="email"
            id="new email"
            :class="{ invalid: !changeEmailNewEmail.isValid }"
            v-model.trim="changeEmailNewEmail.val"
            @blur="clearValidity('changeEmailNewEmail')"
          />
          <p class="validation-text" v-if="!changeEmailEmail.isValid">
            invalid input
          </p>
        </template>
        <template #buttons>
          <base-button type="submit" class="module__btn"
            >Update Email</base-button
          >
          <base-button type="button" class="back-btn" @click="backBtn">
            Back</base-button
          >
        </template>
      </base-module>
    </form>
    <form @submit.prevent="changeName" v-if="checkPath('/changename')">
      <base-module>
        <template #form-content>
          <p>Change Name</p>
          <label for="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            :class="{ invalid: !changeNameName.isValid }"
            v-model.trim="changeNameName.val"
            @blur="clearValidity('changeNameName')"
          />
          <label for="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            :class="{ invalid: !changeNameLast.isValid }"
            v-model.trim="changeNameLast.val"
            @blur="clearValidity('changeNameLast')"
          />
        </template>
        <template #buttons>
          <base-button type="submit" class="module__btn"
            >Update Name</base-button
          >
          <base-button type="button" class="back-btn" @click="backBtn">
            Back</base-button
          >
        </template>
      </base-module>
    </form>
    <form @submit.prevent="changeProfilePicture">
      <base-module v-if="checkPath('/updateprofilepicture')">
        <template #form-content>
          <p>Update Picture</p>
          <img
            src="../assets/images/profile_img.svg"
            alt="profile picture"
            class="profile-picture"
          />
          <input type="file" id="file" name="file" @change="onFileSelected" />
        </template>
        <template #buttons>
          <base-button type="submit" class="module__btn"
            >Update Picture</base-button
          >
          <base-button type="button" class="back-btn" @click="backBtn">
            Back</base-button
          >
        </template>
      </base-module>
    </form>
  </section>
</template>

<script>
import { useRoute } from "vue-router";
import router from "../router/index.js";
import TheHeader from "../components/layout/TheHeader.vue";
import tintReRoute from "../mixins/tintReRoute";
import getUserInfo from "../mixins/getUserInfo";
import validation from "../mixins/validation";
import http from "../mixins/http";
export default {
  mixins: [tintReRoute, http, getUserInfo, validation],
  data() {
    changename: false;
    return {
      id: null,
      profilePicture: null,
      firstName: null,
      lastName: null,
      email: null,
      changeNameName: {
        val: "",
        isValid: true,
      },
      changeNameLast: {
        val: "",
        isValid: true,
      },
      changeEmailPassword: {
        val: "",
        isValid: true,
      },
      changeEmailEmail: {
        val: "",
        isValid: true,
      },
      changeEmailNewEmail: {
        val: "",
        isValid: true,
      },
      changePasswordPasswrod: {
        val: "",
        isValid: true,
      },
      changePasswordEmail: {
        val: "",
        isValid: true,
      },
      changePasswordNewPassword: {
        val: "",
        isValid: true,
      },
      changePasswordConfrim: {
        val: "",
        isValid: true,
      },
      deleteAccountPassword: {
        val: "",
        isValid: true,
      },
      emailMatch: true,
      passwordMatch: true,
      selectedFile: null,
    };
  },
  components: {
    TheHeader,
  },
  created() {
    this.checkToken();
    this.getUserData();
  },
  methods: {
    renderFilter() {
      if (
        useRoute().path === "/deleteaccount" ||
        useRoute().path === "/changepassword" ||
        useRoute().path === "/changeemail" ||
        useRoute().path === "/changename" ||
        useRoute().path === "/updateprofilepicture"
      ) {
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
        return true;
      } else {
        return false;
      }
    },

    backBtn() {
      this.$router.go(-1);
      document.body.style.overflow = "visable";
      document.body.style.touchAction = "unset";
    },
    checkPath(path) {
      if (useRoute().path === path) {
        return true;
      } else {
        return false;
      }
    },

    async getUserData() {
      const data = await this.fetchGet("http://localhost:3000/api/user/user");

      this.id = data.message.id;
      this.profilePicture = data.message.profile_picture;
      this.firstName = data.message.first_name;
      this.lastName = data.message.last_name;
      this.email = data.message.email;
    },

    async changeName() {
      const body = {
        id: this.id,
        firstName: this.changeNameName.val,
        lastName: this.changeNameLast.val,
      };

      this.changeNameName.isValid = this.validate(this.changeNameName.val);
      this.changeNameLast.isValid = this.validate(this.changeNameLast.val);

      const data = await this.fetchWithBody(
        "http://localhost:3000/api/user/changename",
        body,
        "PATCH"
      );

      console.log(data);
      router.replace({ path: "/settings" });
      this.getUserData();
    },

    async changeEmail() {
      const body = {
        email: this.changeEmailEmail.val,
        password: this.changeEmailPassword.val,
        newEmail: this.changeEmailNewEmail.val,
      };

      this.changeEmailEmail.isValid = this.validate(this.changeEmailEmail.val);
      this.changeEmailPassword.isValid = this.validate(
        this.changeEmailPassword.val
      );
      this.changeEmailNewEmail.isValid = this.validate(
        this.changeEmailNewEmail.val
      );
   
      const data = await this.fetchWithBody(
        "http://localhost:3000/api/user/changeemail",
        body,
        "PATCH"
      );

      console.log(data);

      if(data.message === 'fail'){
        this.changeEmailEmail.isValid = false;
      }else{
        this.changeEmailPassword.val = '';
        this.changeEmailNewEmail.val = '';

        router.replace({ path: "/settings" });
        this.getUserData();
      }
    },

    async changePassword() {
      const body = JSON.stringify({
        email: this.changePasswordEmail.val,
        newPassword: this.changePasswordPasswrod.val,
        newPassword: this.changePasswordNewPassword.val,
      });

      this.changePasswordEmail.isValid = this.validate(
        this.changePasswordEmail.val
      );
      this.changePasswordPasswrod.isValid = this.validate(
        this.changePasswordPasswrod.val
      );
      this.changePasswordNewPassword.isValid = this.validate(
        this.changePasswordNewPassword.val
      );
      this.changePasswordConfrim.isValid = this.validate(
        this.changePasswordConfrim.val
      );

      this.passwordMatch = this.matchString(
        this.changePasswordNewPassword.val,
        this.changePasswordConfrim.val
      );

      const data = await this.fetchWithBody(
        "http://localhost:3000/api/user/changepassword",
        body,
        "PATCH"
      );

      console.log(data);
      router.replace({ path: "/settings" });
      this.getUserData();
    },

    async changeProfilePicture() {
      const fd = new FormData();
      fd.append("id", this.id);
      fd.append("image", this.selectedFile, this.selectedFile.name);

      const data = await this.fetchWithFd(
        "http://localhost:3000/api/user/changeprofilepicture",
        fd,
        "PATCH"
      );

      console.log(data);
      router.replace({ path: "/settings" });
      this.getUserData();
    },

    async deleteAccount() {
      const body = {
        password: this.deleteAccountPassword.val,
        email: this.email,
      };

      this.deleteAccountPassword.isValid = this.validate(
        this.deleteAccountPassword.val
      );

      const data = await this.fetchWithBody(
        "http://localhost:3000/api/user/deleteaccount",
        body,
        "DELETE"
      );

      console.log(data.message.notice);
      if (data.message.notice === "incorrect password") {
        this.deleteAccountPassword.isValid = false;
        console.log(this.deleteAccountPassword.isValid);
      } else {
        router.replace({ path: "/login" });
      }
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  width: 100%;
  height: 55.8vh;
  padding-left: 4%;

  @include breakpoint-down(mobile) {
    flex-direction: column;
    height: 90vh;
    padding: unset;
  }

  &__profile-picture {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    @include breakpoint-down(mobile) {
      align-items: center;
      margin-bottom: 30px;
    }

    & .title {
      font-size: rem(30);
      margin: auto;

      @include breakpoint-down(mobile) {
        margin-bottom: 15px;
      }
    }

    & .profile-picture {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      margin-bottom: 15%;

      @include breakpoint-down(mobile) {
        margin-bottom: 20px;
      }
    }

    & .base-btn {
      width: 100%;
      height: 40px;
      font-size: rem(18);
      margin: auto;

      @include breakpoint-down(mobile) {
        width: 80%;
        margin-left: 10%;
      }
    }

    & a {
      width: 100%;
    }
  }

  &__text {
    padding-left: 30%;
    padding-top: 70px;
    width: 70%;

    @include breakpoint-down(mobile) {
      align-items: center;
      padding: unset;
      width: 100%;
    }

    & p {
      padding-bottom: 10px;
      padding-top: 10px;
      font-size: rem(20);
      font-weight: bolder;
      color: $secondary-color;
    }

    & .delete-account {
      display: flex;
      justify-content: center;

      & p {
        font-size: rem(12);
        color: red;

        @include breakpoint-down(mobile) {
          font-size: rem(16);
        }

        &:hover {
          cursor: pointer;
        }
      }
    }

    & .change-btn {
      padding-bottom: 5px;
      width: 100px;
      height: 40px;
      font-size: rem(16);

      @include breakpoint-down(mobile) {
        align-self: center;
        width: 50%;
      }
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5%;

    @include breakpoint-down(mobile) {
      flex-direction: column;
      width: 90%;
      margin: auto;
      & p {
        font-size: rem(22);
        margin: auto;
      }

      & a {
        width: 100%;
        margin-left: 25%;
      }
    }
  }
}

footer {
  width: 100%;
  height: 37.2vh;
  display: flex;
  align-items: flex-end;

  @include breakpoint-down(mobile) {
    height: 20vh;
  }
}

.footer__img {
  width: 33.33%;
  height: 55%;
  object-fit: cover;
}

.tint {
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  position: absolute;
  background: rgba(107, 104, 104, 0.7);
}

.module {
  height: 600px;
  width: 650px;
  margin-top: 10px;
  background-color: white;
  box-shadow: 0px 0px 25px 25px rgba(253, 45, 1, 0.1);
  border: 5px solid rgba(253, 45, 1, 0.3);
  position: absolute;
  top: 10%;
  left: 30vw;

  @include breakpoint-down(mobile) {
    position: absolute;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    left: 0;
    top: -10px;
    border-radius: unset;
    font-size: 30px;
  }

  & p {
    margin: auto;
    font-size: rem(25);

    @include breakpoint-down(mobile) {
      text-align: center;
      &:nth-child(2) {
        margin-bottom: 60px;
      }
    }
  }

  & label {
    margin: auto;
  }

  & input {
    width: 60%;
  }

  &__btn {
    height: 40px;
    margin-top: 30px;
    font-size: rem(20);
  }
}

.back-btn {
  display: none;

  @include breakpoint-down(mobile) {
    display: unset;
    width: 45%;
    height: 40px;
    margin-top: 20px;
    font-size: rem(20);
  }
}

.profile-picture {
  width: 200px;
}

.invalid {
  box-shadow: 0px 0px 2px 4px red;
}

.validation-text {
  color: red;
  font-size: rem(10);
  margin-bottom: -50px !important;
}
</style>

