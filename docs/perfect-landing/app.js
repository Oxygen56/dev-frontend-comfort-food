const ratio = document.querySelector('#ratio');
const tomatoNumber = document.querySelector('#tomato-number');
const eggNumber = document.querySelector('#egg-number');
const ratioName = document.querySelector('#ratio-name');
const ratioCopy = document.querySelector('#ratio-copy');
const ratioStatus = document.querySelector('#ratio-status');
const shareLine = document.querySelector('#share-line');
const copyButton = document.querySelector('#copy-ratio');
const copyStatus = document.querySelector('#copy-status');

const states = {
  egg: {
    name: 'A soft landing',
    copy: 'Gentle folds lead; tomato arrives like a warm window opening.',
    share: 'soft folds first, bright tomato after',
  },
  balanced: {
    name: 'Quietly balanced',
    copy: 'Bright edges, soft folds, neither asking to be the lead.',
    share: 'bright edges, soft folds',
  },
  tomato: {
    name: 'Window-light bright',
    copy: 'Tomato leads with a vivid spark; egg makes somewhere soft to land.',
    share: 'bright tomato first, soft folds after',
  },
};

function stateFor(value) {
  if (value < 47) return states.egg;
  if (value > 53) return states.tomato;
  return states.balanced;
}

function updateRatio({ announce = true } = {}) {
  const tomato = Number(ratio.value);
  const egg = 100 - tomato;
  const state = stateFor(tomato);

  document.documentElement.style.setProperty('--ratio', tomato);
  document.documentElement.style.setProperty('--tomato-size', (0.72 + (tomato - 30) / 68).toFixed(2));
  document.documentElement.style.setProperty('--egg-size', (0.72 + (egg - 30) / 68).toFixed(2));
  tomatoNumber.textContent = tomato;
  eggNumber.textContent = egg;
  ratioName.textContent = state.name;
  ratioCopy.textContent = state.copy;
  shareLine.textContent = `My Home Ratio is ${tomato}:${egg} — ${state.share}.`;
  if (announce) ratioStatus.textContent = `${state.name}: ${tomato} percent tomato and ${egg} percent egg.`;
}

ratio.addEventListener('input', () => updateRatio());
updateRatio({ announce: false });

copyButton.addEventListener('click', async () => {
  const text = shareLine.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = 'Copied. Keep it, change it, or send it home.';
  } catch {
    copyStatus.textContent = 'Copy was unavailable. Select the sentence above instead.';
  }
});
