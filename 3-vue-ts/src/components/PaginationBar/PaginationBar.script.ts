// Module imports
import { defineComponent, defineProps, PropType, watch } from 'vue';

// Component imports
import PaginationButton from './PaginationButton/PaginationButton.vue';

// Type definitions
interface IButton {
  value: number | 'Prev' | 'Next' | '...';
  isActive: boolean;
  isDisabled: boolean;
  onClick?: () => void;
  key: string | number;
}


export default defineComponent({
  name: 'PaginationBar',
  props: {
    page: { type: Number, default: 0 },
    totalPages: { type: Number, default: 0 },
    handlePage: {
      type: Function as PropType<(update: number | 'Prev' | 'Next') => void>,
      required: true
    }
  },
  setup(props) {

    const buttons: IButton[] = [];

    const generateButtons = () => {
      const prevDisabled = props.page === 1 ? true : false;
      const nextDisabled = props.page === props.totalPages ? true : false;

      buttons.push({
        value: 'Prev',
        isActive: false,
        isDisabled: prevDisabled,
        onClick: () => props.handlePage('Prev'),
        key: 'Prev'
      });

      if (props.page < 5 && props.totalPages <= 5) {
        for (let i = 1; i < props.totalPages + 1; i++) {
          const isActive = i == props.page;

          buttons.push({
            value: i,
            isActive: isActive,
            isDisabled: false,
            onClick: () => props.handlePage(i),
            key: i
          });
        }
      }

      if (props.page < 5 && props.totalPages > 5) {
        for (let i = 1; i < 6; i++) {
          const isActive = i == props.page;

          buttons.push({
            value: i,
            isActive: isActive,
            isDisabled: false,
            onClick: () => props.handlePage(i),
            key: i
          });
        }

        buttons.push({
          value: '...',
          isActive: false,
          isDisabled: true,
          key: '...-0'
        });

        buttons.push({
          value: props.totalPages,
          isActive: false,
          isDisabled: false,
          onClick: () => props.handlePage(props.totalPages),
          key: props.totalPages
        });
      }

      if (props.page >= 5 && props.page <= props.totalPages - 5) {
        const start = props.page - 2;
        const end = props.page + 3;

        buttons.push({
          value: 1,
          isActive: false,
          isDisabled: false,
          onClick: () => props.handlePage(1),
          key: 1
        });

        buttons.push({
          value: '...',
          isActive: false,
          isDisabled: true,
          key: '...-1'
        });

        for (let i = start; i < end; i++) {
          const isActive = i == props.page;

          buttons.push({
            value: i,
            isActive: isActive,
            isDisabled: false,
            onClick: () => props.handlePage(i),
            key: i
          });
        }

        buttons.push({
          value: '...',
          isActive: false,
          isDisabled: true,
          key: '...-2'
        });

        buttons.push({
          value: props.totalPages,
          isActive: false,
          isDisabled: false,
          onClick: () => props.handlePage(props.totalPages),
          key: props.totalPages
        });
      }

      if (props.page > 5 && props.page > props.totalPages - 5) {
        const start = props.totalPages - 4;
        const end = props.totalPages;

        buttons.push({
          value: 1,
          isActive: false,
          isDisabled: false,
          onClick: () => props.handlePage(1),
          key: 1
        });

        buttons.push({
          value: '...',
          isActive: false,
          isDisabled: true,
          key: '...-3'
        });

        for (let i = start; i <= end; i++) {
          const isActive = i == props.page;

          buttons.push({
            value: i,
            isActive: isActive,
            isDisabled: false,
            onClick: () => props.handlePage(i),
            key: i
          });
        }
      }

      buttons.push({
        value: 'Next',
        isActive: false,
        isDisabled: nextDisabled,
        onClick: () => props.handlePage('Next'),
        key: 'Next'
      });
    }

    watch([props.page, props.totalPages], () => {
      generateButtons();
    });

    generateButtons();

    return {
      buttons
    }
  },
  components: {
    PaginationButton
  }
});