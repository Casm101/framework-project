import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TestComponent',
  data() {
    return {
      msg: 'Click me!'
    }
  },
  methods: {
    update() {
      this.msg = 'You clicked me!';
    }
  }
});