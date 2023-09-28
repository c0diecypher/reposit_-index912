const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Оплатить`
      });
    }
  };
  const expand = () => {
    tg.expand();
  };

  return {
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user,
    expand
  };
}
