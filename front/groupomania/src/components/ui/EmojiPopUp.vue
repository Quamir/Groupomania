<template>
  <div class="pop-up" id="popup">
    <div class="reaction-panel__emojis">
      <img
        src="../../assets/images/reactions/heart_eyes.svg"
        alt="heart eye emoji"
        class="pop-up__emoji"
      />
      <img
        src="../../assets/images/reactions/laugh.svg"
        alt="laughing emoji"
        class="pop-up__emoji"
      />
      <img
        src="../../assets/images/reactions/angry.svg"
        alt="angry emoji"
        class="pop-up__emoji"
      />
      <img
        src="../../assets/images/reactions/smile.svg"
        alt="smiling emoji"
        class="pop-up__emoji"
      />
      <img
        src="../../assets/images/reactions/smile.svg"
        alt="smiling emoji"
        class="pop-up__emoji"
      />
      <img
        src="../../assets/images/reactions/cry.svg"
        alt="crying emoji"
        class="pop-up__emoji"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pop-up {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
  width: 600px;
  height: 60px;
  border: 3px solid $secondary-color;
  background-color: #ffd96a;
  position: absolute;
  margin: auto;

  @include breakpoint-down(mobile) {
    width: 100vw;
  }

  &__emoji {
    width: 45px;
    height: 45px;
    margin-right: 5px;
    margin-left: 10px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
