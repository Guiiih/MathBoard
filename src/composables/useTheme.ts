import { ref, watchEffect, provide, inject, Ref } from 'vue'; 

const ThemeSymbol = Symbol();

export function provideTheme() {
  const theme = ref('light');

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  watchEffect(() => {
    if (theme.value === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  });

  provide(ThemeSymbol, {
    theme,
    toggleTheme,
  });
}

export function useTheme() {
  const context = inject(ThemeSymbol);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um componente que forneça contexto de tema.');
  }
  return context as { theme: Ref<string>; toggleTheme: () => void };
}