import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easy-to-use.svg').default,
    description: (
      <>
          Opensql is designed to be easy to install and run as well as write more readable sql code
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/focus.svg').default,
    description: (
      <>
          Opensql main focus is on writing more readable code as well as developing tables as quickly as possible using popular drivers.
      </>
    ),
  },
  {
    title: 'Multi Drivers',
    Svg: require('@site/static/img/support.svg').default,
    description: (
      <>
          Currently, Opensql supports three relational database drivers,
          respectively: Microsoft SQL Server, PostreSQL, MySQL adn It supports many databases in the future.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
