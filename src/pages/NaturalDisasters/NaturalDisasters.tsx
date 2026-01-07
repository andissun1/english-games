import { useSelector } from 'react-redux';
import { disastersSelectors } from '../../store/naturalDisastersReducer';
import style from './NaturalDisasters.module.css';
import { Table } from './Components/Table/Table';
import { useAppSelector } from '../../store/hooks';
import { useRef, useState } from 'react';

interface ITopicInfo {
  title: String;
  description: String;
  question: String;
  image: String;
}

export const NaturalDisasters = () => {
  const points = useAppSelector(disastersSelectors.points);
  const gameInfo = useSelector(disastersSelectors.gameInfo);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [topicInfo, setTopicInfo] = useState<ITopicInfo>({
    title: gameInfo.title,
    description: gameInfo.description,
    question: gameInfo.question,
    image: gameInfo.image,
  });

  const temper = useRef<HTMLImageElement>(null);

  const temperLevel = Number(points) * 1.7 + 31;
  const temperColor = () => {
    if (Number(points) <= 5) {
      return `var(--mRed)`;
    } else if (Number(points) <= 15 && Number(points) > 5) {
      return `var(--mOrange)`;
    } else if (Number(points) <= 25 && Number(points) > 15) {
      return `var(--mLightGreen)`;
    } else if (Number(points) > 25) {
      return `var(--mGreen)`;
    } else {
      return `var(--mRed)`;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicInfo({
      ...topicInfo,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={style.NaturalDisasters}>
      <div
        className={style.content}
        style={{ backgroundImage: `url(${gameInfo.image})` }}
      >
        {isOpenEditor ? (
          <input
            value={`${topicInfo.title}`}
            name="title"
            className={style.titleInput}
            onChange={handleChange}
          />
        ) : (
          <h1> {gameInfo.title}</h1>
        )}

        <div className={style.text}>
          {isOpenEditor ? (
            <>
              {' '}
              <input
                value={`${topicInfo.description}`}
                name="description"
                onChange={handleChange}
              />
              <input
                value={`${topicInfo.question}`}
                name="question"
                onChange={handleChange}
              />
              <label htmlFor="image">Background url:</label>
              <input name="image" value={`${topicInfo.image}`} onChange={handleChange} />
            </>
          ) : (
            <>
              {gameInfo.description}
              <strong>{gameInfo.question}</strong>
            </>
          )}
        </div>

        <div className={style.game}>
          <Table
            isOpenEditor={isOpenEditor}
            setIsOpenEditor={setIsOpenEditor}
            topicInfo={topicInfo}
          />

          <div className={style.desc}>
            Colour your total score on the thermometer:
            <div className={style.descContent}>
              <img
                src="/images/temp.png"
                className={style.temper}
                ref={temper}
                style={{
                  backgroundImage: `linear-gradient(to top, ${temperColor()} ${temperLevel}%, white 10%)`,
                }}
              />

              <div className={style.rules}>
                <div className={style.topLevel}>
                  <span>26+</span>A true expert!
                </div>
                <div className={style.preTopLevel}>
                  <span>16-25</span>A great lecturer on the subject!
                </div>
                <div className={style.middle}>
                  <span>6-15</span>
                  Keep practising!
                </div>
                <div className={style.bad}>
                  <span>0-5</span>
                  More work required!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
