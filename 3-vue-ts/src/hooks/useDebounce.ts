// Module imports
import { ref, onUnmounted } from "vue";

// Type declarations
type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;


// Hook declaration
export function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay = 250
) {
  const timer = ref<Timer>();

  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value);
  });

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.value);
    timer.value = newTimer;
  }) as Func;

  return debouncedFunction;
}