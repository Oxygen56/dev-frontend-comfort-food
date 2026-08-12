const ratio = document.querySelector('#ratio');
const tomatoNumber = document.querySelector('#tomato-number');
const eggNumber = document.querySelector('#egg-number');
const ratioName = document.querySelector('#ratio-name');
const ratioCopy = document.querySelector('#ratio-copy');
const ratioStatus = document.querySelector('#ratio-status');
const shareLine = document.querySelector('#share-line');
const copyButton = document.querySelector('#copy-ratio');
const copyStatus = document.querySelector('#copy-status');
const memoryMaker = document.querySelector('#memory-maker');
const momentInputs = [...document.querySelectorAll('input[name="moment"]')];
const memoryWord = document.querySelector('#memory-word');
const memoryCard = document.querySelector('#memory-card');
const cardTomato = document.querySelector('#card-tomato');
const cardEgg = document.querySelector('#card-egg');
const cardTitle = document.querySelector('#memory-card-title');
const cardMoment = document.querySelector('#card-moment');
const cardFor = document.querySelector('#card-for');
const makerStatus = document.querySelector('#maker-status');

const states = {
  eggDeep: {
    name: 'Cloud-soft',
    copy: 'Egg carries the bowl; tomato stays as a small bright edge.',
    share: 'cloud-soft egg with one bright edge',
  },
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
  tomatoDeep: {
    name: 'Market-red vivid',
    copy: 'Tomato fills the window; egg keeps one soft corner open.',
    share: 'market-red tomato, one soft corner',
  },
};

const moments = {
  weeknight: {
    name: 'Weeknight glow',
    copy: 'Keys down, dinner up.',
    share: 'a weeknight table',
  },
  rain: {
    name: 'Rain-window quiet',
    copy: 'Wet glass, slower spoons.',
    share: 'rain-window quiet',
  },
  sunday: {
    name: 'Sunday unhurried',
    copy: 'One more bowl, nowhere to rush.',
    share: 'an unhurried Sunday',
  },
};

function stateFor(value) {
  if (value <= 37) return states.eggDeep;
  if (value < 47) return states.egg;
  if (value >= 63) return states.tomatoDeep;
  if (value > 53) return states.tomato;
  return states.balanced;
}

function currentMoment() {
  const selected = momentInputs.find(input => input.checked);
  return moments[selected?.value || 'rain'];
}

function cleanWord() {
  return memoryWord.value.trim().replace(/\s+/g, ' ');
}

function updateRatio({ announce = true } = {}) {
  const tomato = Number(ratio.value);
  const egg = 100 - tomato;
  const state = stateFor(tomato);
  const moment = currentMoment();
  const word = cleanWord();

  document.documentElement.style.setProperty('--ratio', tomato);
  document.documentElement.style.setProperty('--tomato-size', (0.72 + (tomato - 30) / 68).toFixed(2));
  document.documentElement.style.setProperty('--egg-size', (0.72 + (egg - 30) / 68).toFixed(2));
  document.documentElement.dataset.ratioState = tomato < 47 ? 'egg' : tomato > 53 ? 'tomato' : 'balanced';
  tomatoNumber.textContent = tomato;
  eggNumber.textContent = egg;
  ratioName.textContent = state.name;
  ratioCopy.textContent = state.copy;
  cardTomato.textContent = tomato;
  cardEgg.textContent = egg;
  cardTitle.textContent = state.name;
  cardMoment.textContent = `${moment.name} · ${moment.copy}`;
  cardFor.hidden = !word;
  cardFor.textContent = word ? `Kept for ${word}.` : '';
  shareLine.textContent = `My Home Ratio is ${tomato}:${egg} — ${moment.share}; ${state.share}${word ? `; kept for ${word}` : ''}.`;
  ratio.setAttribute('aria-valuetext', `${tomato} percent tomato, ${egg} percent egg: ${state.name}`);
  if (announce) ratioStatus.textContent = `${state.name}: ${tomato} percent tomato and ${egg} percent egg.`;
}

ratio.addEventListener('input', () => updateRatio());
momentInputs.forEach(input => input.addEventListener('change', () => {
  document.documentElement.dataset.moment = input.value;
  updateRatio({ announce: false });
}));
memoryWord.addEventListener('input', () => updateRatio({ announce: false }));
document.documentElement.dataset.moment = momentInputs.find(input => input.checked)?.value || 'rain';
updateRatio({ announce: false });

memoryMaker.addEventListener('submit', event => {
  event.preventDefault();
  updateRatio({ announce: false });
  makerStatus.textContent = `Memory card sealed: ${shareLine.textContent}`;
  memoryCard.focus({ preventScroll: true });
  memoryCard.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'center',
  });
});

copyButton.addEventListener('click', async () => {
  const text = shareLine.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = 'Copied. Keep it, change it, or send it home.';
  } catch {
    copyStatus.textContent = 'Copy was unavailable. Select the sentence above instead.';
  }
});

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');
