document.addEventListener("DOMContentLoaded", () => {
  // ── 1) 각 구별 AI 요약 HTML 정의 ──
  const summaryByGu = {
    "동구": `
      <h2>AI 요약: 동구 폭우·침수 피해 지역 &amp; 대응 권고</h2>
      <ol>
        <li>
          <strong>동구 피해 Top 5 동</strong>
          <ul>
            <li><strong>계림1동</strong>: 뉴스 235건 · 피해점수 503 · 누적강수 600 mm · 재산 127건·생명 89건<br>
                <em>키워드</em>: 피해, 복구, 침수, 도로, 안전</li>
            <li><strong>서남동</strong>: 뉴스 43건 · 피해점수 134.8 · 최대강수 86 mm · 재산 31건·생명 16건<br>
                <em>키워드</em>: 침수, 재난, 지원, 도로</li>
            <li><strong>지원1동</strong>: 뉴스 31건 · 피해점수 57.5 · 재산 18건·생명 9건<br>
                <em>키워드</em>: 구조, 노인, 차량</li>
            <li><strong>지산1동</strong>: 뉴스 15건 · 피해점수 31.8 · 최대강수 142 mm · 재산 7건·생명 8건<br>
                <em>키워드</em>: 싱크홀, 지반, 복구</li>
            <li><strong>학운동</strong>: 뉴스 10건 · 피해점수 29.4 · 재산 8건·생명 5건<br>
                <em>키워드</em>: 대피, 유가족, 재난</li>
          </ul>
        </li>
        <li>
          <strong>즉시 대응 권고</strong>
          <ul>
            <li>배수로·하천 제체물 제거 및 하수구 청소</li>
            <li>인접 교량·도로에 안전 펜스 설치</li>
            <li>배수펌프·펌프장 가동 테스트, CCTV·무인센서 점검</li>
            <li>주민 알림 채널(문자·앱) 점검 및 긴급 대피 안내</li>
          </ul>
        </li>
      </ol>
      <blockquote>
      </blockquote>
    `,
    "서구": `
      <h2>AI 요약: 서구 폭우·침수 피해 지역 &amp; 대응 권고</h2>
      <ol>
        <li>
          <strong>서구 피해 Top 5 동</strong>
          <ul>
            <li><strong>양동</strong>: 뉴스 373건 · 피해점수 843 · 누적강수 691 mm · 재산 251건·생명 140건<br>
                <em>키워드</em>: 피해, 지역, 지원, 점검</li>
            <li><strong>서창동</strong>: 뉴스 41건 · 피해점수 83 · 최대강수 63 mm · 재산 35건·생명 7건<br>
                <em>키워드</em>: 서비스, 피해, 복구, 점검</li>
            <li><strong>유덕동</strong>: 뉴스 21건 · 피해점수 65 · 최대강수 142 mm · 재산 20건·생명 16건<br>
                <em>키워드</em>: 싱크홀, 침수, 신고</li>
            <li><strong>풍암동</strong>: 뉴스 17건 · 피해점수 57 · 최대강수 90 mm · 재산 16건·생명 13건<br>
                <em>키워드</em>: 통제, 긴급, 도로</li>
            <li><strong>금호1동</strong>: 뉴스 20건 · 피해점수 55 · 강수 0 mm · 재산 17건·생명 12건<br>
                <em>키워드</em>: 누수, 파열, 사고</li>
          </ul>
        </li>
        <li>
          <strong>즉시 대응 권고</strong>
          <ul>
            <li>상수도관·하수관로 응급 점검 및 예비 부속 교체</li>
            <li>도로·맨홀 커버 청소 및 순환 배수 계획 수립</li>
            <li>우회도로 안내 표지판 설치 &amp; 교통 관제실 연계</li>
          </ul>
        </li>
      </ol>
      <blockquote>
      </blockquote>
    `,
    "남구": `
      <h2>AI 요약: 남구 폭우·침수 피해 지역 &amp; 대응 권고</h2>
      <ol>
        <li>
          <strong>남구 피해 Top 5 동</strong>
          <ul>
            <li><strong>양림동</strong>: 뉴스 208건 · 피해점수 391 · 최대강수 142 mm · 누적강수 600 mm · 재산 127건·생명 71건<br>
                <em>키워드</em>: 피해, 지역, 지원, 점검, 재난</li>
            <li><strong>백운1동</strong>: 뉴스 10건 · 피해점수 27 · 최대강수 86 mm · 누적강수 0 mm · 재산 9건·생명 9건<br>
                <em>키워드</em>: 대피, 범람, 하천, 안전, 지역</li>
            <li><strong>봉선1동</strong>: 뉴스 14건 · 피해점수 30 · 최대강수 0 mm · 누적강수 200 mm · 재산 10건·생명 4건<br>
                <em>키워드</em>: 대비, 폭염, 시민, 방안, 안전</li>
            <li><strong>진월동</strong>: 뉴스 8건 · 피해점수 20 · 최대강수 51 mm · 누적강수 0 mm · 재산 6건·생명 5건<br>
                <em>키워드</em>: 고립, 구조, 차량, 빗물, 담양</li>
            <li><strong>방림1동</strong>: 뉴스 8건 · 피해점수 18 · 최대강수 0 mm · 누적강수 0 mm · 재산 7건·생명 4건<br>
                <em>키워드</em>: 누수, 붕괴, 사고, 상수도관, 안전</li>
          </ul>
        </li>
        <li>
          <strong>즉시 대응 권고</strong>
          <ul>
            <li>하천·하수구 제체물 제거 및 도로 배수로 긴급 청소</li>
            <li>배수펌프·펌프장 가동 테스트 및 맨홀·우수관 점검</li>
            <li>취약노인 시설 안전 점검 및 대피 안내문 문자 발송</li>
            <li>실시간 범람 감시 CCTV·무인센서 가동 여부 확인</li>
          </ul>
        </li>
      </ol>
      <blockquote>
      </blockquote>
    `,
    "북구": `
      <h2>AI 요약: 북구 폭우·침수 피해 지역 &amp; 대응 권고</h2>
      <ol>
        <li>
          <strong>북구 피해 Top 5 동</strong>
          <ul>
            <li><strong>중앙동</strong>: 뉴스 611건 · 피해점수 1616 · 최대강수 300 mm · 누적강수 600 mm · 재산 425건·생명 219건<br>
                <em>키워드</em>: 피해, 복구, 재난, 수해, 지원</li>
            <li><strong>신안동</strong>: 뉴스 83건 · 피해점수 249 · 최대강수 142 mm · 누적강수 412 mm · 재산 76건·생명 34건<br>
                <em>키워드</em>: 복구, 지원, 대책, 점검, 신안교</li>
            <li><strong>건국동</strong>: 뉴스 70건 · 피해점수 176 · 최대강수 80 mm · 누적강수 400 mm · 재산 60건·생명 14건<br>
                <em>키워드</em>: 서비스, 복구, 점검, 수해, 방문</li>
            <li><strong>석곡동</strong>: 뉴스 36건 · 피해점수 153 · 최대강수 75 mm · 누적강수 600 mm · 재산 28건·생명 25건<br>
                <em>키워드</em>: 수색, 대피, 실종, 신고, 앵커</li>
            <li><strong>용봉동</strong>: 뉴스 27건 · 피해점수 57 · 최대강수 86 mm · 누적강수 400 mm · 재산 18건·생명 12건<br>
                <em>키워드</em>: 호우경보, 범람, 차량, 도심, 통제</li>
          </ul>
        </li>
        <li>
          <strong>즉시 대응 권고</strong>
          <ul>
            <li>하천 제체물·댐 하류 점검 및 배수로 청소</li>
            <li>교량·도로 안전 펜스 설치 및 우회로 확보</li>
            <li>긴급 구조팀 배치 및 주민 안내체계 가동</li>
          </ul>
        </li>
      </ol>
      <blockquote>
      </blockquote>
    `,
    "광산구": `
      <h2>AI 요약: 광산구 폭우·침수 피해 지역 &amp; 대응 권고</h2>
      <ol>
        <li>
          <strong>광산구 피해 Top 5 동</strong>
          <ul>
            <li><strong>송정1동</strong>: 뉴스 274건 · 피해점수 574 · 최대강수 80 mm · 누적강수 600 mm · 재산 189건·생명 88건<br>
                <em>키워드</em>: 복구, 지원, 재난, 시설, 안전</li>
            <li><strong>삼도동</strong>: 뉴스 101건 · 피해점수 259 · 최대강수 80 mm · 누적강수 180 mm · 재산 75건·생명 46건<br>
                <em>키워드</em>: 본부, 점검, 정책, 지원, 도로</li>
            <li><strong>평동</strong>: 뉴스 57건 · 피해점수 149 · 최대강수 142 mm · 누적강수 0 mm · 재산 55건·생명 24건<br>
                <em>키워드</em>: 수해, 복구, 장록교, 구간, 점검</li>
            <li><strong>본량동</strong>: 뉴스 47건 · 피해점수 105 · 최대강수 0 mm · 누적강수 600 mm · 재산 25건·생명 22건<br>
                <em>키워드</em>: 싱크홀, 침하, 복구, 주택, 안전</li>
            <li><strong>동곡동</strong>: 뉴스 30건 · 피해점수 60 · 최대강수 86 mm · 누적강수 400 mm · 재산 19건·생명 13건<br>
                <em>키워드</em>: 고립, 차량, 하천, 범람, 주택</li>
          </ul>
        </li>
        <li>
          <strong>즉시 대응 권고</strong>
          <ul>
            <li>저지대 배수펌프·펌프장 작동 테스트</li>
            <li>인접 교량·도로 안전 펜스 설치 및 점검</li>
            <li>하수관로 이물질 제거 및 배수로 정비</li>
          </ul>
        </li>
      </ol>
      <blockquote>
      </blockquote>
    `
  };

  // ── 2) AI 요약 업데이트 함수 ──
  function updateAISummary(gu) {
    const container = document.getElementById("ai-summary");
    container.innerHTML = summaryByGu[gu] || "<p>요약 데이터가 없습니다.</p>";
  }

  let topoDataByGu = {};  // 지형 랭킹 데이터 저장

  // ===== 지형 CSV 불러오기 =====
  fetch("data/gwangju_gu_top5.csv")
    .then(res => res.text())
    .then(text => {
      const rows = text.trim().split("\n").slice(1);
      rows.forEach(row => {
        const cols = row.split(",");
        const gu = cols[0].trim(),
              dong = cols[2].trim(),
              score = parseFloat(cols[5].trim());
        topoDataByGu[gu] = topoDataByGu[gu] || [];
        topoDataByGu[gu].push({ dong, score });
      });

      // 초기 화면: 북구 데이터 + AI 요약
      updateRanking("북구");
      updateNewsRanking("북구");
      updateRainRanking("북구");
      updateAISummary("북구");
    })
    .catch(err => console.error("CSV 오류:", err));

  // ===== 버튼 클릭 이벤트 =====
  document.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      const guName = btn.textContent.trim();

      updateRanking(guName);
      updateNewsRanking(guName);
      updateRainRanking(guName);
      updateAISummary(guName);

      // 카드 제목 업데이트
      document.querySelector(".card:nth-child(1) .card__title")
        .childNodes[0].nodeValue = `${guName} 뉴스 랭킹 TOP 5 `;
      document.querySelector(".card:nth-child(2) .card__title")
        .childNodes[0].nodeValue = `${guName} 강수량 랭킹 TOP 5 `;
      document.querySelector(".card:nth-child(3) .card__title")
        .childNodes[0].nodeValue = `${guName} 지형 랭킹 TOP 5 `;
    });
  });

  // ===== 지형 랭킹 업데이트 =====
  function updateRanking(gu) {
    const list = document.querySelector(".cards .card:nth-child(3) .rank");
    list.innerHTML = "";
    if (!topoDataByGu[gu]) {
      return list.innerHTML = "<li>데이터 없음</li>";
    }
    topoDataByGu[gu]
      .sort((a,b)=>b.score-a.score)
      .slice(0,5)
      .forEach((item,i)=>{  
        const li = document.createElement("li");
        li.textContent = `${i+1}. ${item.dong}`;
        list.appendChild(li);
      });
  }

  // ===== 뉴스 랭킹 업데이트 =====
  function updateNewsRanking(gu) {
    const list = document.querySelector(".cards .card:nth-child(1) .rank");
    list.innerHTML = "";
    const fileMap = {
      "광산구":"data/광산구_top5.csv",
      "남구":"data/남구_top5.csv",
      "동구":"data/동구_top5.csv",
      "북구":"data/북구_top5.csv",
      "서구":"data/서구_top5.csv"
    };
    const fp = fileMap[gu];
    if (!fp) return list.innerHTML = "<li>파일 없음</li>";
    fetch(fp).then(r=>r.text()).then(txt=>{
      txt.trim().split("\n").slice(1).slice(0,5).forEach((row,i)=>{
        const dong = row.split(",")[2].trim();
        const li = document.createElement("li");
        li.textContent = `${i+1}. ${dong}`;
        list.appendChild(li);
      });
    }).catch(_=> list.innerHTML="<li>데이터 오류</li>");
  }

  // ===== 강수량 랭킹 업데이트 =====
  function updateRainRanking(gu) {
    const list = document.querySelector(".cards .card:nth-child(2) .rank");
    list.innerHTML = "";
    fetch("data/rain.csv").then(r=>r.text()).then(txt=>{
      const data = txt.trim().split("\n").slice(1)
        .map(r=>{const c=r.split(",");return{gu:c[0].trim(),dong:c[1].trim(),rain:parseFloat(c[2])||0};})
        .filter(d=>d.gu===gu);

      if (data.every(d=>d.rain===0)) {
        for(let i=1;i<=5;i++){
          const li = document.createElement("li");
          li.textContent = `${i}. -`;
          list.appendChild(li);
        }
      } else {
        data.sort((a,b)=>b.rain-a.rain).slice(0,5).forEach((item,i)=>{
          const li = document.createElement("li");
          li.textContent = `${i+1}. ${item.dong} (${item.rain}mm)`;
          list.appendChild(li);
        });
      }
    }).catch(_=> list.innerHTML="<li>데이터 오류</li>");
  }
});
