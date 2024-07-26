// Module imports
import { defineComponent } from "vue";

// Component imports
import ContentModal from "@/components/ContentModal/ContentModal.vue";


export default defineComponent({
  name: 'ModalProvider',
  data() {
    return {
      isModalVisible: false
    }
  },
  methods: {
    openModal(id: string) {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  components: {
    ContentModal
  }
});