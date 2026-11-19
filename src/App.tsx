import { useEffect, useRef, useState } from "react";

type Work = {
  id: number;
  category: "live" | "animation";
  title: string;
  reading: string;
  image?: string;
  synopsis: string;
  year: string;
  genre: string;
  members: string;
  director: string;
  duration: string;
  accent: string;
};

const EVENT = {
  title: "年末決算！映像作品大放出祭",
  date: "2026.12.13",
  day: "SUN",
  time: "13:00—18:00（予定）",
  venue: "道の駅 マチテラス日進 多目的室",
  address: "〒470-0121 愛知県日進市本郷町前田33番地",
};

const WORKS: Work[] = [
  {
    id: 1,
    category: "live",
    title: "午前0時のレンズ",
    reading: "GOZEN REIJI NO LENS",
    image:
      "https://images.unsplash.com/photo-1768142673697-83bd7610a20f?auto=format&fit=crop&w=1200&q=85",
    synopsis:
      "終電後の街を撮り続ける大学生が、ファインダー越しに見つけた「昨日の自分」。一晩だけの不思議な出会いを描く青春短編。",
    year: "2026",
    genre: "ドラマ",
    members: "映像制作ゼミ チームA",
    director: "山田 はる",
    duration: "18分",
    accent: "#f85b22",
  },
  {
    id: 2,
    category: "live",
    title: "遠まわりの帰り道",
    reading: "TOOMAWARI NO KAERIMICHI",
    image:
      "https://images.unsplash.com/photo-1752749099657-89a2a39b33d0?auto=format&fit=crop&w=1200&q=85",
    synopsis:
      "いつもの道を外れた二人が、知らなかった町と互いの本音に出会う。冬の夕暮れを舞台にしたロードムービー。",
    year: "2026",
    genre: "青春／ロードムービー",
    members: "佐藤ゼミ 3年有志",
    director: "近藤 湊",
    duration: "24分",
    accent: "#123052",
  },
  {
    id: 3,
    category: "live",
    title: "RECの外側",
    reading: "OUTSIDE THE REC",
    image:
      "https://images.unsplash.com/photo-1632187981988-40f3cbaeef5e?auto=format&fit=crop&w=1200&q=85",
    synopsis:
      "卒業制作の現場で回り始めた、もうひとつのカメラ。つくる人たちの葛藤と笑顔を追ったドキュメンタリー。",
    year: "2026",
    genre: "ドキュメンタリー",
    members: "ドキュメンタリー演習",
    director: "伊藤 凪",
    duration: "16分",
    accent: "#f2b52b",
  },
  {
    id: 4,
    category: "animation",
    title: "星くずスープ",
    reading: "STARDUST SOUP",
    image:
      "https://images.unsplash.com/photo-1683178617585-0cbdca3dd54b?auto=format&fit=crop&w=1200&q=85",
    synopsis:
      "眠れない夜、台所の小さな鍋から宇宙があふれ出す。手描きとストップモーションで紡ぐ、あたたかな物語。",
    year: "2026",
    genre: "2D／ストップモーション",
    members: "アニメーションゼミ",
    director: "森 すみれ",
    duration: "8分",
    accent: "#9557ad",
  },
  {
    id: 5,
    category: "animation",
    title: "ボタンの惑星",
    reading: "PLANET OF BUTTONS",
    image:
      "https://images.unsplash.com/photo-1672445419625-e9ff1e389605?auto=format&fit=crop&w=1200&q=85",
    synopsis:
      "なくしたボタンを追いかけて、服の裏側にある惑星へ。身近な素材が動き出すカラフルな冒険譚。",
    year: "2025",
    genre: "ストップモーション",
    members: "田中・高橋・水野",
    director: "田中 まどか",
    duration: "6分",
    accent: "#1a8e89",
  },
  {
    id: 6,
    category: "animation",
    title: "走れ、青い影",
    reading: "RUN, BLUE SHADOW",
    image:
      "https://images.unsplash.com/photo-1725457878663-59059c121a2a?auto=format&fit=crop&w=1200&q=85",
    synopsis:
      "自分から逃げ続ける「影」が、街の色を取り戻すまで。実験的な映像と音で描くモーション・グラフィックス。",
    year: "2026",
    genre: "モーション・グラフィックス",
    members: "映像表現演習 B班",
    director: "林 青葉",
    duration: "5分",
    accent: "#347cbd",
  },
];

const PROGRAM = [
  { time: "12:30", title: "開場", note: "受付開始・自由席" },
  { time: "13:00", title: "オープニング", note: "ごあいさつ／本日の見どころ" },
  { time: "13:15", title: "実写映画セレクション", note: "短編映画・ドキュメンタリー上映" },
  { time: "14:35", title: "休憩", note: "15 min." },
  { time: "14:50", title: "アニメーションセレクション", note: "2D・3D・ストップモーション上映" },
  { time: "16:00", title: "学生監督トーク", note: "制作秘話とQ&A" },
  { time: "17:15", title: "クロージング上映", note: "選抜作品＋エンディング" },
  { time: "18:00", title: "終了予定", note: "ご来場ありがとうございました" },
];

const NAV = ["ABOUT", "WORKS", "PROGRAM", "ACCESS", "CONTACT"];

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    camera: (
      <>
        <path d="M14.5 5 13 3H7L5.5 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2.5Z" />
        <circle cx="10" cy="12" r="4" />
      </>
    ),
    arrow: <path d="M3 10h13m-4-4 4 4-4 4" />,
    menu: (
      <>
        <path d="M2 5h16M2 10h16M2 15h16" />
      </>
    ),
    close: <path d="m3 3 14 14M17 3 3 17" />,
    train: (
      <>
        <rect x="4" y="2" width="12" height="14" rx="3" />
        <path d="M4 10h12M7 19l2-3m4 0 2 3M7 6h2m2 0h2" />
      </>
    ),
    car: (
      <>
        <path d="m3 12 2-5h10l2 5v4H3v-4Z" />
        <circle cx="6" cy="16" r="1.5" />
        <circle cx="14" cy="16" r="1.5" />
      </>
    ),
    pin: (
      <>
        <path d="M16 8c0 5-6 10-6 10S4 13 4 8a6 6 0 1 1 12 0Z" />
        <circle cx="10" cy="8" r="2" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Snow({ className = "" }: { className?: string }) {
  return (
    <span className={`snow ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function SectionTitle({
  number,
  en,
  children,
  light = false,
}: {
  number: string;
  en: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-title ${light ? "is-light" : ""}`}>
      <span className="section-no">{number}</span>
      <div>
        <p>{en}</p>
        <h2>{children}</h2>
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && node.classList.add("is-visible"),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function WorkCard({ work, onClick }: { work: Work; onClick: () => void }) {
  return (
    <button
      className="work-card"
      onClick={onClick}
      style={{ "--accent": work.accent } as React.CSSProperties}
    >
      <div className="work-image">
        {work.image ? (
          <img src={work.image} alt={`${work.title} 仮作品スチル`} />
        ) : (
          <div className="image-empty">NO IMAGE</div>
        )}
        <span>{work.category === "live" ? "LIVE ACTION" : "ANIMATION"}</span>
        <div className="work-play">PLAY</div>
      </div>
      <div className="work-content">
        <p className="work-reading">{work.reading}</p>
        <h3>{work.title}</h3>
        <div className="work-meta">
          <span>{work.genre}</span>
          <span>{work.duration}</span>
        </div>
        <p>{work.synopsis}</p>
        <span className="detail-link">
          作品詳細を見る <Icon name="arrow" size={18} />
        </span>
      </div>
    </button>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<"all" | "live" | "animation">("all");
  const [selected, setSelected] = useState<Work | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected || menuOpen ? "hidden" : "";
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && (setSelected(null), setMenuOpen(false));
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [selected, menuOpen]);

  const filteredWorks =
    category === "all" ? WORKS : WORKS.filter((work) => work.category === category);

  return (
    <main>
      <header className="site-header">
        <a className="mini-logo" href="#top" aria-label="トップへ">
          <span>NUAS</span>
          <strong>映像祭</strong>
        </a>
        <nav aria-label="メインナビゲーション">
          {NAV.map((item, index) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              <small>0{index + 1}</small>
              {item}
            </a>
          ))}
        </nav>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(true)}
          aria-label="メニューを開く"
        >
          <Icon name="menu" />
        </button>
      </header>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button onClick={() => setMenuOpen(false)} aria-label="メニューを閉じる">
          <Icon name="close" size={28} />
        </button>
        <p>YEAR-END FILM FESTIVAL</p>
        {NAV.map((item, index) => (
          <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenuOpen(false)}>
            <small>0{index + 1}</small> {item}
          </a>
        ))}
      </div>

      <section className="hero" id="top">
        <div className="hero-snow" aria-hidden="true">
          <Snow className="s1" />
          <Snow className="s2" />
          <Snow className="s3" />
        </div>
        <div className="hero-copy">
          <p className="hero-kicker">
            NAGOYA UNIVERSITY OF ARTS AND SCIENCES
            <span>STUDENT FILM FESTIVAL 2026</span>
          </p>
          <h1>
            <span className="year-end">年末決算！</span>
            <span className="main-title">映像作品</span>
            <span className="release-title">大放出祭</span>
          </h1>
          <div className="catchcopy">
            大学生が今年制作した
            <br />
            映像作品を一挙上映！
          </div>
        </div>

        <div className="hero-visual" aria-label="映写機とフィルムを組み合わせたイベントビジュアル">
          <div className="burst burst-one" />
          <div className="burst burst-two" />
          <div className="film-loop">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="projector">
            <div className="reel reel-one">
              <i />
              <i />
              <i />
            </div>
            <div className="reel reel-two">
              <i />
              <i />
              <i />
            </div>
            <div className="projector-body">
              <span className="lens" />
              <Icon name="camera" size={60} />
            </div>
            <div className="projector-leg" />
          </div>
          <div className="clapper">
            <span>TAKE 2026</span>
            <strong>ROLL THE YEAR!</strong>
          </div>
        </div>

        <div className="hero-info">
          <div className="date-block">
            <span>{EVENT.date.split(".")[0]}</span>
            <strong>
              {EVENT.date.split(".")[1]}.{EVENT.date.split(".")[2]}
            </strong>
            <em>{EVENT.day}</em>
          </div>
          <div className="time-block">
            <small>OPEN 12:30 / START</small>
            <strong>{EVENT.time}</strong>
            <p>{EVENT.venue}</p>
          </div>
          <div className="free-badge">
            <strong>入場無料</strong>
            <span>予約不要・途中入場OK</span>
          </div>
        </div>
        <a className="scroll-cue" href="#about">
          SCROLL <span />
        </a>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>FILM! ANIMATION! DOCUMENTARY! &nbsp; FILM! ANIMATION! DOCUMENTARY! &nbsp;</div>
      </div>

      <section className="about section" id="about">
        <Reveal>
          <SectionTitle number="01" en="ABOUT THE FESTIVAL">
            映像祭について
          </SectionTitle>
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-photo">
            <img
              src="https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?auto=format&fit=crop&w=1400&q=85"
              alt="映像制作現場でカメラを囲むスタッフ"
            />
            <span>MAKE / WATCH / FEEL</span>
            <div className="frame-corners" />
          </Reveal>
          <Reveal className="about-copy">
            <p className="eyebrow">STUDENTS’ FILMS, ONE BIG SCREEN.</p>
            <h3>
              つくった。
              <br />
              だから、観てほしい。
            </h3>
            <p>
              本映像祭は、名古屋学芸大学メディア造形学部映像メディア学科の学生が、授業や課題を通して制作した映像作品を上映するイベントです。
            </p>
            <p>
              映画やアニメーションなど、学生それぞれの視点や発想から生まれた作品をお届けします。作品の魅力をぜひ会場で体感してください。
            </p>
            <div className="about-tags">
              <span>映画</span>
              <span>アニメーション</span>
              <span>ドキュメンタリー</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="works section" id="works">
        <Snow className="works-snow" />
        <Reveal>
          <SectionTitle number="02" en="SCREENING WORKS" light>
            上映作品
          </SectionTitle>
          <p className="section-lead light">
            今年生まれた、まだ見ぬ物語たち。
            <br />
            カードを選んで作品の詳細をご覧ください。
          </p>
        </Reveal>
        <div className="work-filters" role="group" aria-label="作品カテゴリー">
          {[
            ["all", "ALL", "すべて"],
            ["live", "LIVE ACTION", "実写映画"],
            ["animation", "ANIMATION", "アニメーション"],
          ].map(([value, en, jp]) => (
            <button
              key={value}
              className={category === value ? "active" : ""}
              onClick={() => setCategory(value as typeof category)}
            >
              <small>{en}</small>
              {jp}
            </button>
          ))}
        </div>
        <div className="works-grid">
          {filteredWorks.map((work) => (
            <WorkCard key={work.id} work={work} onClick={() => setSelected(work)} />
          ))}
        </div>
        <p className="works-note">※ 掲載中の作品情報・画像は仮のものです。随時更新します。</p>
      </section>

      <section className="program section" id="program">
        <Reveal>
          <SectionTitle number="03" en="DAY PROGRAM">
            当日のプログラム
          </SectionTitle>
          <p className="section-lead">
            一本ずつ、違う世界へ。気になる時間からの途中入場も可能です。
          </p>
        </Reveal>
        <Reveal className="program-board">
          <div className="program-head">
            <div>
              <span>DEC.</span>
              <strong>13</strong>
              <em>SUN</em>
            </div>
            <p>
              SCREEN
              <br />
              SCHEDULE
            </p>
          </div>
          <div className="timeline">
            {PROGRAM.map((item, index) => (
              <div className="timeline-row" key={`${item.time}-${item.title}`}>
                <time>{item.time}</time>
                <span className="timeline-dot">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="film-edge" />
        </Reveal>
        <p className="temporary-note">
          上映時間・内容は現在調整中です。決まり次第このページでお知らせします。
        </p>
      </section>

      <section className="access section" id="access">
        <Reveal>
          <SectionTitle number="04" en="ACCESS & INFORMATION" light>
            開催情報・アクセス
          </SectionTitle>
        </Reveal>
        <div className="access-layout">
          <Reveal className="event-panel">
            <p className="panel-label">EVENT INFORMATION</p>
            <dl>
              <div>
                <dt>DATE</dt>
                <dd>
                  2026年12月13日 <span>日</span>
                </dd>
              </div>
              <div>
                <dt>TIME</dt>
                <dd>{EVENT.time}</dd>
              </div>
              <div>
                <dt>VENUE</dt>
                <dd>{EVENT.venue}</dd>
              </div>
              <div>
                <dt>ENTRY</dt>
                <dd>無料 / 予約不要 / 途中入場可</dd>
              </div>
            </dl>
            <div className="venue-photo">
              <div>
                <Icon name="camera" size={32} />
                <span>会場写真を掲載予定</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="map-panel">
            <iframe
              title="道の駅マチテラス日進の地図"
              src="https://www.google.com/maps?q=%E9%81%93%E3%81%AE%E9%A7%85%20%E3%83%9E%E3%83%81%E3%83%86%E3%83%A9%E3%82%B9%E6%97%A5%E9%80%B2&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="address">
              <Icon name="pin" />
              <div>
                <strong>{EVENT.venue}</strong>
                <p>{EVENT.address}</p>
              </div>
            </div>
            <div className="route-grid">
              <div>
                <Icon name="train" />
                <div>
                  <strong>公共交通機関</strong>
                  <p>名鉄豊田線「日進駅」より市内巡回バス「くるりんばす」をご利用ください。</p>
                </div>
              </div>
              <div>
                <Icon name="car" />
                <div>
                  <strong>お車でお越しの方</strong>
                  <p>施設駐車場をご利用いただけます。混雑時は公共交通機関をご利用ください。</p>
                </div>
              </div>
            </div>
            <a
              className="map-link"
              href="https://www.google.com/maps/search/?api=1&query=%E9%81%93%E3%81%AE%E9%A7%85%E3%83%9E%E3%83%81%E3%83%86%E3%83%A9%E3%82%B9%E6%97%A5%E9%80%B2"
              target="_blank"
              rel="noreferrer"
            >
              GOOGLE MAPで見る <Icon name="arrow" size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="contact section" id="contact">
        <Reveal className="contact-inner">
          <SectionTitle number="05" en="CONTACT" light>
            主催・お問い合わせ
          </SectionTitle>
          <div className="contact-card">
            <div>
              <p>ORGANIZED BY</p>
              <h3>名古屋学芸大学</h3>
              <h4>メディア造形学部 映像メディア学科</h4>
            </div>
            <div className="contact-info">
              <p>お問い合わせ先は現在準備中です。</p>
              <a href="mailto:filmfestival@example.com">filmfestival@example.com</a>
              <small>※ 上記アドレスは仮のものです</small>
            </div>
            <div className="socials">
              <a href="#contact" aria-label="Instagram">
                IG <span>Instagram</span>
              </a>
              <a href="#contact" aria-label="X">
                X <span>Official X</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer>
        <div className="footer-mark">
          <p>YEAR-END</p>
          <strong>
            映像作品
            <br />
            大放出祭
          </strong>
        </div>
        <div className="footer-event">
          <strong>
            {EVENT.date} {EVENT.day}
          </strong>
          <span>{EVENT.venue}</span>
        </div>
        <nav aria-label="フッターナビゲーション">
          {NAV.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <p className="copyright">
          © 2026 NAGOYA UNIVERSITY OF ARTS AND SCIENCES. ALL RIGHTS RESERVED.
        </p>
        <a className="to-top" href="#top" aria-label="ページ上部へ">
          ↑
        </a>
      </footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <article
            className="work-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="詳細を閉じる"
            >
              <Icon name="close" size={26} />
            </button>
            <div className="modal-image">
              {selected.image ? (
                <img src={selected.image} alt={`${selected.title} 仮作品スチル`} />
              ) : (
                <div className="image-empty">NO IMAGE</div>
              )}
              <span>{selected.category === "live" ? "LIVE ACTION" : "ANIMATION"}</span>
            </div>
            <div className="modal-copy">
              <p className="work-reading">{selected.reading}</p>
              <h2 id="modal-title">{selected.title}</h2>
              <p className="modal-synopsis">{selected.synopsis}</p>
              <dl>
                <div>
                  <dt>制作年度</dt>
                  <dd>{selected.year}</dd>
                </div>
                <div>
                  <dt>ジャンル</dt>
                  <dd>{selected.genre}</dd>
                </div>
                <div>
                  <dt>上映時間</dt>
                  <dd>{selected.duration}</dd>
                </div>
                <div>
                  <dt>監督</dt>
                  <dd>{selected.director}</dd>
                </div>
                <div>
                  <dt>制作メンバー</dt>
                  <dd>{selected.members}</dd>
                </div>
              </dl>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
