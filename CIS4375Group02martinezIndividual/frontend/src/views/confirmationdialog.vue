<!-- This view allows a user to view confirmation of actions using a reusable component. -->
<template>
  <div v-if="show" class="confirmation-dialog">
    <div class="message">{{ message }}</div>
    <div class="buttons">
      <button @click="confirmAction">Confirm</button>
      <button @click="cancelAction">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //Displays message
    message: {
      type: String,
      required: true
    },
    //function for confirmation
    onConfirm: {
      type: Function,
      required: true
    },
    //function called when cancelled
    onCancel: {
      type: Function,
      default: () => {}
    },
    //boolean for visibility
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //confirms
    confirmAction() {
      this.onConfirm();
      //notify to close dialog
      this.$emit('close');
    },
    //method to cancel
    cancelAction() {
      this.onCancel();
      //notifies to close dialog
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.confirmation-dialog {
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  margin-block-end: 10px;
}

.buttons button {
  margin-inline-end: 10px;
}
</style>
