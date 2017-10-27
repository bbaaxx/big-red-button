import { compose, pipe, trace as t } from './composition';
import Identity from './functors';

const f = n => n + 1;
const g = n => n * 2;

export function composingStuff(numpar) {
  pipe(f, t('pg->'), g, t('pf->'))(numpar);
  compose(t('cf->'), g, t('cg->'), f)(numpar);
  t('nf->')(g(t('ng->')(f(numpar))));
}

export function functoringStuff() {
  const u = Identity(2);

  // Identity law
  u.map(t('identity law'));
  u.map(x => x).map(t('identity law'));

  // Composition law
  const r1 = u.map(x => f(g(x)));
  const r2 = u.map(g).map(f);
  r1.map(t('composition law'));
  r2.map(t('composition law'));

  // valueOf
  const ints = Identity(2) + Identity(4);
  t('valueOf')(ints); // 6
  const hi = Identity('h') + Identity('i');
  t('valueOf')(hi); // "hi"

  // toString
  const tts = Identity('perrito');
  t('toString')(tts.toString());

  // [Symbol.iterator] enables standard JS iterations:
  console.warn('iterator');
  const arr = [6, 7, ...Identity(8)];
  t('iterator')(arr); // [6, 7, 8]

  // frange
  const fRange = (start, end) =>
    Array.from({ length: end - start + 1 }, (x, i) => Identity(i + start));
  t('fRange1')(fRange(2, 4));
}

export function funcMixinsStuff() {
  const flying = o => {
    let isFlying = false;
    return Object.assign({}, o, {
      fly() {
        isFlying = true;
        return this;
      },
      isFlying: () => isFlying,
      land() {
        isFlying = false;
        return this;
      },
    });
  };
  const quacking = quack => o => Object.assign({}, o, { quack: () => quack });
  const createUglyDuck = quack => quacking(quack)(flying({}));
  const createPrettyDuck = quack => pipe(flying, quacking(quack))({});
  // A bird
  const bird = flying({});
  console.log(bird.isFlying()); // false
  console.log(bird.fly().isFlying()); // true

  // Lets add sound
  const quacker = quacking('Quack!')({});
  console.log(quacker.quack());

  // The ducks
  const uglyDuck = createUglyDuck('Ugly Quack!!');
  console.log(uglyDuck.fly().quack());
  const prettyDuck = createPrettyDuck('Pretty Quack!!');
  console.log(prettyDuck.fly().quack());
}

export function arrayStuff() {
  const firstArray = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  console.log('Our first array', firstArray);
  console.log('Array.prototype', Array.prototype);
  console.log('prototype', firstArray.prototype);
  console.log('length', firstArray.length);

  firstArray.push(0);
  console.log('After .push(0):', firstArray);

  firstArray.pop();
  console.log('After .pop():', firstArray);

  firstArray.shift();
  console.log('After .shift():', firstArray);

  firstArray.unshift(1);
  console.log('After .unshift(1)', firstArray);

  const secondArray = firstArray.slice(0, firstArray.length);
  console.log('Second array from .slice(0, arr.length)', secondArray);
  console.log('They are not the same array', firstArray === secondArray);
  console.log('but they look the same', firstArray, secondArray);

  const thirdArray = [].concat(secondArray);
  console.log('A thirdArray from [].concat(secondArray)', thirdArray);
  console.log(
    'again, not the same array',
    firstArray === thirdArray,
    secondArray === thirdArray,
  );

  console.log(
    'average of third array',
    thirdArray.reduce((acc, val) => acc + val, 0) / thirdArray.length,
  );
  console.log('only evens', thirdArray.filter(val => val % 2 === 0));

  const tempArray = thirdArray.splice(3, 3);
  console.log('remove stuff from the middle of the array', thirdArray);
  console.log('resulting array from splicing', tempArray);

  tempArray.reverse();
  console.log("Let's reverse the temporal array", tempArray);

  thirdArray.splice.apply(thirdArray, [3, 0].concat(tempArray)); // eslint-disable-line
  console.log('and insert them back in the new order', thirdArray);
  console.log(
    'get the squares of each item (for secondArray)',
    secondArray.map(x => x * x),
  );
  console.log(
    'a new array from slices of two other arrays',
    [].concat(firstArray.slice(0, 5), secondArray.slice(5, secondArray.length)),
  );
}
