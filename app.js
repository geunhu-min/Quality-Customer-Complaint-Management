const sampleState = {
  cost: [
    { item: "예방 비용 (부적합)", "6/22": 951970, "6/23": 1198181, "6/24": "", "6/25": "", "6/26": "", monthTotal: 19131910, yearTotal: 169092153, monthAverage: 29841547 },
    { item: "실패 비용 (클레임+패널티)", "6/22": 2223930, "6/23": 1117200, "6/24": "", "6/25": "", "6/26": "", monthTotal: 14799130, yearTotal: 123261390, monthAverage: 21688292 },
    { item: "조치 비용", "6/22": "", "6/23": "", "6/24": "", "6/25": "", "6/26": "", monthTotal: 215200, yearTotal: 1369700, monthAverage: 254380 },
    { item: "기타 (브랜드 검사)", "6/22": "", "6/23": "", "6/24": "", "6/25": "", "6/26": "", monthTotal: "", yearTotal: 19381974, monthAverage: 4845494 }
  ],
  summary: [
    { category: "시공미결", prevTotal: 421, prevAvg: 35, m1: 41, m2: 22, m3: 43, m4: 22, m5: 17, w1: 6, w2: 2, w3: 6, d622: "8(0)", d623: "0(0)", d624: "(0)", d625: "(0)", d626: "(0)", d629: "(0)", d630: "(0)", m6Total: "22(0)", m7: "(0)", m8: "(0)", m9: "(0)", m10: "(0)", m11: "(0)", m12: "(0)", total: "167(0)", avg: "29(0)" },
    { category: "고객불만", prevTotal: 1090, prevAvg: 91, m1: 138, m2: 165, m3: 176, m4: 108, m5: 102, w1: 18, w2: 18, w3: 31, d622: "12(3)", d623: "9(3)", d624: "(3)", d625: "(3)", d626: "(3)", d629: "(3)", d630: "(3)", m6Total: "88(50)", m7: "(50)", m8: "(50)", m9: "(50)", m10: "(50)", m11: "(50)", m12: "(50)", total: "777(600)", avg: "138(50)" },
    { category: "감성/취급", prevTotal: 15, prevAvg: 1, m1: 6, m2: 6, m3: 2, m4: 0, m5: 0, w1: 0, w2: 0, w3: 0, d622: "0(0)", d623: "0(0)", d624: "(0)", d625: "(0)", d626: "(0)", d629: "(0)", d630: "(0)", m6Total: "0(0)", m7: "(0)", m8: "(0)", m9: "(0)", m10: "(0)", m11: "(0)", m12: "(0)", total: "14(0)", avg: "3(0)" },
    { category: "계", prevTotal: 1526, prevAvg: 127, m1: 185, m2: 193, m3: 221, m4: 130, m5: 119, w1: 24, w2: 20, w3: 37, d622: "20(3)", d623: "9(3)", d624: "(3)", d625: "(3)", d626: "(3)", d629: "(3)", d630: "(3)", m6Total: "110(50)", m7: "(50)", m8: "(50)", m9: "(50)", m10: "(50)", m11: "(50)", m12: "(50)", total: "958(600)", avg: "170(50)" },
    { category: "PPM", prevTotal: 1011, prevAvg: "", m1: 865, m2: 955, m3: 1139, m4: 1325, m5: 964, w1: 1078, w2: 544, w3: 1128, d622: "-", d623: "-", d624: "-", d625: "-", d626: "-", d629: "-", d630: "-", m6Total: 903, m7: "-", m8: "-", m9: "-", m10: "-", m11: "-", m12: "-", total: "-", avg: 1037 }
  ],
  details: [
    { category: "고객불만", type: "외관", brand: "일룸", source: "1라인", code: "IDT14CP02A", color: "WW", lot: ".", supplier: "최윤희", defect: "상판 백커 쪽떨어짐 및 HPM 이물질\n- 6월22일 조치품 하자" },
    { category: "고객불만", type: "외관", brand: "일룸", source: "1라인", code: "IDT14CP04A", color: "WW", lot: ".", supplier: "서지희", defect: "상판 HPM 크랙\n- 2월6일 시공, 회수 확인 필요" },
    { category: "고객불만", type: "외관", brand: "데스커", source: "1라인", code: "DSTFAH0600", color: "WW", lot: ".", supplier: "까망언니", defect: "상판 글루라인 불량\n- 6월22일 시공, 고객 요청건" },
    { category: "고객불만", type: "외관", brand: "일룸", source: "1라인", code: "HSFS0090V", color: "GYM", lot: "C26602", supplier: "김경화-숙", defect: "우측판 엣지 전사지 벗겨짐" },
    { category: "고객불만", type: "외관", brand: "일룸", source: "4라인", code: "IHD14CP03A", color: "WW", lot: "C26529", supplier: "안은주(구매)(N10)", defect: "도어 이물질" }
  ],
  images: []
};

const defaultCostKeys = ["6/22", "6/23", "6/24", "6/25", "6/26"];
const penaltyPerClaim = 60000;
const dashboardStorageKey = "qualityClaimDashboard.savedLinks.v1";
// 서버 없이(GitHub Pages 등) 처음 여는 브라우저에서도 같은 구글시트 CSV 링크로 자동 복원되도록 하는 기본값.
// "데이터 삽입 링크 내보내기"로 최신 값을 복사해서 이 배열에 붙여넣고 다시 배포하세요.
const SEED_SAVED_LINK_GROUPS = [
  {
    "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSFYXeMShNStCI5zaJkYod1jzt2kZwvRpEbs58ONy7XTDxXKPvwnczeyNmoAWYXwifLhHy6vTBlGqw0/pub?output=csv",
    "kind": "receiptHistory",
    "label": "접수내역 (누적데이터)",
    "groupKey": "receipt-history",
    "groupTitle": "접수내역 (누적데이터)",
    "order": 300,
    "entries": [
      {
        "label": "접수내역 (누적데이터)",
        "sourceSheet": "Sheet1",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSFYXeMShNStCI5zaJkYod1jzt2kZwvRpEbs58ONy7XTDxXKPvwnczeyNmoAWYXwifLhHy6vTBlGqw0/pub?output=csv",
        "selected": true,
        "excluded": 0
      }
    ]
  },
  {
    "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=1327724814&single=true&output=csv",
    "kind": "cost",
    "label": "2025년 마감자료",
    "groupKey": "existing-25-cost",
    "groupTitle": "2025년 마감자료",
    "order": 2025,
    "entries": [
      {
        "label": "1월",
        "sourceSheet": "1월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=1327724814&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "2월",
        "sourceSheet": "2월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=264078655&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "3월",
        "sourceSheet": "3월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=1544727133&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "4월",
        "sourceSheet": "4월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=1346968907&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "5월",
        "sourceSheet": "5월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=2040823720&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "6월",
        "sourceSheet": "6월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=559311695&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "7월",
        "sourceSheet": "7월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=185586825&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "8월",
        "sourceSheet": "8월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=1996748640&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "9월",
        "sourceSheet": "9월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=1062153671&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "10월",
        "sourceSheet": "10월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=2020378325&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "11월",
        "sourceSheet": "11월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=531619125&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "12월",
        "sourceSheet": "12월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJXzXGFoYejbdQXDU-kVwNV58v6EZM-V0lUc8-hPRmpZAr6s0F0vm4ltoydVyiiLGXrUV3h87HblIk/pub?gid=629107804&single=true&output=csv",
        "selected": true,
        "excluded": 0
      }
    ]
  },
  {
    "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWCyt-i0tGBGzj2ELfCyn8zJaYPD6PpkvyF3pMjxI_3IURP3Nl977gfqfhZN_S1HrmhllrMSAREG6d/pub?gid=745914384&single=true&output=csv",
    "kind": "cost",
    "label": "2026년 마감자료",
    "groupKey": "existing-26-cost",
    "groupTitle": "2026년 마감자료",
    "order": 2026,
    "entries": [
      {
        "label": "1월",
        "sourceSheet": "1월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWCyt-i0tGBGzj2ELfCyn8zJaYPD6PpkvyF3pMjxI_3IURP3Nl977gfqfhZN_S1HrmhllrMSAREG6d/pub?gid=745914384&single=true&output=csv",
        "selected": true,
        "excluded": 22
      },
      {
        "label": "2월",
        "sourceSheet": "2월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWCyt-i0tGBGzj2ELfCyn8zJaYPD6PpkvyF3pMjxI_3IURP3Nl977gfqfhZN_S1HrmhllrMSAREG6d/pub?gid=484452932&single=true&output=csv",
        "selected": true,
        "excluded": 28
      },
      {
        "label": "3월",
        "sourceSheet": "3월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWCyt-i0tGBGzj2ELfCyn8zJaYPD6PpkvyF3pMjxI_3IURP3Nl977gfqfhZN_S1HrmhllrMSAREG6d/pub?gid=439556826&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "4월",
        "sourceSheet": "4월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWCyt-i0tGBGzj2ELfCyn8zJaYPD6PpkvyF3pMjxI_3IURP3Nl977gfqfhZN_S1HrmhllrMSAREG6d/pub?gid=469246773&single=true&output=csv",
        "selected": true,
        "excluded": 5
      },
      {
        "label": "5월",
        "sourceSheet": "5월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWCyt-i0tGBGzj2ELfCyn8zJaYPD6PpkvyF3pMjxI_3IURP3Nl977gfqfhZN_S1HrmhllrMSAREG6d/pub?gid=2032769594&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "6월",
        "sourceSheet": "6월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWCyt-i0tGBGzj2ELfCyn8zJaYPD6PpkvyF3pMjxI_3IURP3Nl977gfqfhZN_S1HrmhllrMSAREG6d/pub?gid=940348938&single=true&output=csv",
        "selected": true,
        "excluded": 0
      },
      {
        "label": "7월",
        "sourceSheet": "7월",
        "sourceUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWCyt-i0tGBGzj2ELfCyn8zJaYPD6PpkvyF3pMjxI_3IURP3Nl977gfqfhZN_S1HrmhllrMSAREG6d/pub?gid=1638344096&single=true&output=csv",
        "selected": true,
        "excluded": 0
      }
    ]
  }
];
const monthlyStatusSnapshotKey = "qualityClaimDashboard.monthlyStatusSnapshot.v1";
const imageDbName = "qualityClaimDashboard.images.v1";
const imageStoreName = "images";

let state = {
  cost: structuredClone(sampleState.cost),
  summary: structuredClone(sampleState.summary),
  details: structuredClone(sampleState.details),
  images: [],
  uploads: [],
  costMeta: defaultCostMeta()
};

let activeUploadId = "sample";
let fileCardsCollapsed = true;
let collapsedGroups = {};
let restoringSavedState = false;
let selectedDetailDate = "";
let detailDateOptions = [];
let pendingDetailImageNo = null;
let pendingDetailImageDate = "";
let savedLinkGroupsCache = [];
let activeDashboardTab = "daily";
let restoredViewSnapshot = null;
let monthlyStatusAutoLoading = false;
let monthlyStatusAutoFailed = false;
let existingDeadlineAutoChecked = false;
let existingDeadlineAutoLoading = false;
let weeklySelectedWeek = "";
let weeklyExpandedLine = "";
let weeklyExpandedType = "";
let monthlyExpandedLine = "";
let monthlyExpandedType = "";
let monthlyDefectSelectedMonth = "";

const kindNames = {
  cost: "품질 비용",
  summary: "접수내역 (금월데이터)",
  receiptHistory: "접수내역 (누적데이터)",
  monthlyStatus: "월간현황 자료",
  details: "세부내역",
  images: "이미지",
  photoFolder: "사진폴더"
};

const summaryKeys = [
  "prevTotal", "prevAvg", "m1", "m2", "m3", "m4", "m5", "w1", "w2", "w3",
  "d622", "d623", "d624", "d625", "d626", "d629", "d630", "m6Total",
  "m7", "m8", "m9", "m10", "m11", "m12", "total", "avg"
];

const aliases = {
  item: ["항목", "구분", "비용항목", "item"],
  category: ["구분", "분류", "category"],
  type: ["유형", "타입", "type"],
  brand: ["브랜드", "brand"],
  source: ["원인처", "원인", "라인", "source"],
  code: ["제품코드", "품번", "코드", "code"],
  color: ["색상", "color"],
  lot: ["LOT NO", "LOT", "lot"],
  supplier: ["공급", "담당", "업체", "supplier"],
  defect: ["하자내역", "내용", "클레임내용", "defect"]
};

function syncStickyTabsOffset() {
  const header = document.querySelector(".app-header");
  const tabs = document.querySelector(".dashboard-tabs");
  if (!header || !tabs) return;
  tabs.style.top = header.offsetHeight + "px";
}
window.addEventListener("resize", syncStickyTabsOffset);

function setSyncIndicator(state) {
  const dot = document.getElementById("syncDot");
  const label = document.getElementById("syncLabel");
  if (!dot || !label) return;
  dot.className = "sync-dot " + state;
  label.textContent = state === "checking" ? "동기화 확인중" : state === "fail" ? "동기화 불가" : "동기화 완료";
}

document.addEventListener("DOMContentLoaded", () => {
  bindUpload("costFile", "cost");
  bindUpload("summaryFile", "summary");
  bindUpload("detailsFile", "details");
  bindImages();
  bindDropZones();
  bindDataInsert();
  bindDashboardTabs();
  syncStickyTabsOffset();

  document.getElementById("loadSample")?.addEventListener("click", restoreSample);
  document.getElementById("clearData")?.addEventListener("click", clearAllData);
  document.getElementById("showSelected")?.addEventListener("click", () => renderAll("선택한 자료만 합산 표시 중"));
  document.getElementById("toggleFileCards")?.addEventListener("click", toggleFileCards);
  document.getElementById("exportSavedLinkGroups")?.addEventListener("click", exportSeedSavedLinkGroups);
  document.getElementById("clearSelection")?.addEventListener("click", clearSelection);
  document.getElementById("deleteSelected")?.addEventListener("click", deleteSelectedUploads);
  document.getElementById("downloadDb")?.addEventListener("click", downloadLocalDb);
  document.getElementById("saveDashboard")?.addEventListener("click", exportDashboardData);
  document.getElementById("loadDashboard")?.addEventListener("click", () => document.getElementById("dashboardFile")?.click());
  document.getElementById("dashboardFile")?.addEventListener("change", importDashboardData);
  document.getElementById("detailDateSelect")?.addEventListener("change", (event) => {
    selectedDetailDate = event.target.value;
    rebuildFromSelection();
    renderDetails();
  });
  window.__lastRestoreHadFailures = false;
  setSyncIndicator("checking");
  restoreSavedDashboardState().then(async (restored) => {
    if (!restored) renderAll();
    if (window.__dailyStableReadyPromise) {
      try { await window.__dailyStableReadyPromise; } catch (_) {}
    }
    setSyncIndicator(window.__lastRestoreHadFailures ? "fail" : "done");
  }).catch(() => {
    setSyncIndicator("fail");
  });
});

function bindUpload(inputId, kind) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener("change", async (event) => {
    const files = [...event.target.files];
    if (!files.length) return;
    for (const file of files) {
      try {
        await loadDataFile(file, kind);
      } catch (err) {
        alert(`업로드 오류: ${err.message}`);
      }
    }
    event.target.value = "";
  });
}

function bindImages() {
  const input = document.getElementById("imageFiles");
  if (!input) return;
  input.addEventListener("change", async (event) => {
    await loadImages([...event.target.files], pendingDetailImageNo, pendingDetailImageDate || selectedDetailDate);
    pendingDetailImageNo = null;
    pendingDetailImageDate = "";
    event.target.value = "";
  });
}

function bindDataInsert() {
  const modal = document.getElementById("dataInsertModal");
  document.getElementById("openDataInsert")?.addEventListener("click", () => {
    fillSavedLinkInputs();
    modal?.classList.add("open");
    modal?.setAttribute("aria-hidden", "false");
  });
  document.getElementById("closeDataInsert")?.addEventListener("click", closeDataInsert);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeDataInsert();
  });
  document.getElementById("loadReceiptData")?.addEventListener("click", () => {
    loadSpreadsheetLink({
      inputId: "receiptDataLink",
      kind: "summary",
      label: "접수내역 (금월데이터)",
      groupKey: "26-summary",
      groupTitle: "접수내역 (금월데이터)",
      order: 261
    });
  });
  document.getElementById("clearReceiptDataLink")?.addEventListener("click", () => clearLinkedGroup("26-summary", "receiptDataLink"));

  document.getElementById("loadExistingDataPublish")?.addEventListener("click", loadExistingDataBulk);
  document.getElementById("clearExistingDataPublishLink")?.addEventListener("click", deleteExistingDataBulk);
  document.getElementById("existingDataPublishYear")?.addEventListener("change", populateExistingDataBulkInput);
  document.getElementById("loadReceiptHistoryPublish")?.addEventListener("click", () => {
    loadPublishedCsvLink({
      inputId: "receiptHistoryPublishLink",
      kind: "receiptHistory",
      label: "접수내역 (누적데이터)",
      groupKey: "receipt-history",
      groupTitle: "접수내역 (누적데이터)",
      order: 300
    });
  });
  document.getElementById("clearReceiptHistoryPublishLink")?.addEventListener("click", () => clearLinkedGroup("receipt-history", "receiptHistoryPublishLink"));
}

function bindDashboardTabs() {
  document.querySelectorAll("[data-dashboard-tab]").forEach((button) => {
    button.addEventListener("click", () => setDashboardTab(button.dataset.dashboardTab));
  });
  setDashboardTab(activeDashboardTab);
}

function setDashboardTab(tab) {
  activeDashboardTab = tab || "daily";
  document.querySelectorAll("[data-dashboard-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.dashboardTab === activeDashboardTab);
  });
  document.querySelectorAll("[data-dashboard-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.dashboardPanel === activeDashboardTab);
  });
}

function closeDataInsert() {
  const modal = document.getElementById("dataInsertModal");
  modal?.classList.remove("open");
  modal?.setAttribute("aria-hidden", "true");
}

async function loadSpreadsheetLink({ inputId, kind, label, groupKey, groupTitle, order }) {
  const input = document.getElementById(inputId);
  const url = input?.value.trim();
  if (!url) {
    alert("스프레드시트 링크를 입력해 주세요.");
    return;
  }

  try {
    const dataSets = await fetchSpreadsheetDataSets(url, kind, label);
    if (kind === "monthlyStatus") monthlyStatusAutoFailed = false;
    const groupMeta = linkedGroupMeta({ kind, label, groupKey, groupTitle, order }, url, dataSets);
    removeExistingLinkedEntries(groupMeta.groupKey);
    let entry = null;
    dataSets.forEach((dataSet) => {
      entry = addUploadEntry({
        kind,
        fileName: dataSet.fileName || url,
        label: dataSet.label || label,
        rows: normalizeRows(dataSet.rows, kind),
        countHint: dataSet.countHint,
        defectAmount: dataSet.defectAmount,
        sourceUrl: url,
        sourceSheet: dataSet.sheetName || "",
        selected: true,
        excluded: 0,
        sourceType: "spreadsheet-link",
        groupKey: groupMeta.groupKey,
        groupTitle: groupMeta.groupTitle,
        order: groupMeta.order
      });
    });
    activeUploadId = entry?.id || activeUploadId;
    rebuildFromSelection();
    const allRows = dataSets.flatMap((dataSet) => dataSet.rows || []);
    const loadedDays = [...new Set(allRows.map((row) => row.__sheetTitle).filter(Boolean))].length;
    const loadedText = loadedDays ? ` · 시트 ${loadedDays}개 읽음` : "";
    renderAll(`${label} 링크 연결 완료${loadedText}`);
    saveDashboardState();
    fillSavedLinkInputs();
    renderLinkedDataList();
    closeDataInsert();
    if (kind === "receiptHistory" && typeof window.__dailyStableReloadV23 === "function") window.__dailyStableReloadV23();
    refreshClaimAccumFrame();
    alert(`${label} 삽입 완료${loadedText}`);
  } catch (err) {
    alert(`링크 불러오기 실패: ${err.message}`);
  }
}

function parseMonthPrefixedLine(line) {
  const text = String(line || "").trim();
  const match = text.match(/^(\d{1,2})\s*월\s*[:\-]?\s*(https?:\/\/.+)$/);
  if (match) return { month: Number(match[1]), url: match[2].trim() };
  return { month: null, url: text };
}

async function fetchPublishedCsvDataSet(urlText, kind, label, year) {
  const lines = String(urlText || "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  if (kind === "cost" && lines.length > 1) return fetchPublishedCsvMonthlyDataSets(lines, label, year);
  return fetchPublishedCsvSingleDataSet(parseMonthPrefixedLine(lines[0] || urlText).url, kind, label, year);
}

async function fetchPublishedCsvSingleDataSet(url, kind, label, year) {
  if (!window.XLSX) throw new Error("SheetJS 라이브러리가 필요합니다.");
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `게시 주소 응답 오류 ${res.status}`);
  }
  const text = await res.text();
  const workbook = XLSX.read(text, { type: "string" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) throw new Error("시트를 읽지 못했습니다.");
  const rows = (kind === "cost" ? deadlineRowsFromSheet(sheet) : excelRowsFromSheet(sheet)).map((row) => {
    row.__sheetTitle = sheetName;
    return row;
  });
  return [{
    label,
    fileName: url,
    sheetName,
    documentTitle: year ? `${year}년 마감자료` : "",
    countHint: rows.length,
    defectAmount: kind === "cost" ? sumDeadlineAmount(rows) : undefined,
    rows
  }];
}

async function fetchPublishedCsvMonthlyDataSets(lines, label, year) {
  if (!window.XLSX) throw new Error("SheetJS 라이브러리가 필요합니다.");
  const monthLabels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const documentTitle = year ? `${year}년 마감자료` : "";
  const results = await Promise.all(lines.map(async (line, i) => {
    const parsed = parseMonthPrefixedLine(line);
    const monthNum = parsed.month || (i + 1);
    const monthLabel = monthLabels[monthNum - 1] || `${monthNum}월`;
    const url = parsed.url;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`${monthLabel} 시트: ${err.error || `응답 오류 ${res.status}`}`);
    }
    const text = await res.text();
    const workbook = XLSX.read(text, { type: "string" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error(`${monthLabel} 시트를 읽지 못했습니다.`);
    const rows = deadlineRowsFromSheet(sheet).map((row) => {
      row.__sheetTitle = monthLabel;
      return row;
    });
    return {
      label: monthLabel,
      fileName: url,
      sheetName: monthLabel,
      documentTitle,
      countHint: rows.length,
      defectAmount: sumDeadlineAmount(rows),
      rows
    };
  }));
  return results;
}

async function loadPublishedCsvLink({ inputId, kind, label, groupKey, groupTitle, order, year }) {
  const input = document.getElementById(inputId);
  const url = input?.value.trim();
  if (!url) {
    alert("웹에 게시 주소를 입력해 주세요.");
    return;
  }
  try {
    const dataSets = await fetchPublishedCsvDataSet(url, kind, label, year);
    const groupMeta = linkedGroupMeta({ kind, label, groupKey, groupTitle, order }, url, dataSets);
    removeExistingLinkedEntries(groupMeta.groupKey);
    let entry = null;
    dataSets.forEach((dataSet) => {
      entry = addUploadEntry({
        kind,
        fileName: dataSet.fileName || url,
        label: dataSet.label || label,
        rows: normalizeRows(dataSet.rows, kind),
        countHint: dataSet.countHint,
        defectAmount: dataSet.defectAmount,
        sourceUrl: url,
        sourceSheet: dataSet.sheetName || "",
        selected: true,
        excluded: 0,
        sourceType: "spreadsheet-link",
        groupKey: groupMeta.groupKey,
        groupTitle: groupMeta.groupTitle,
        order: groupMeta.order
      });
    });
    activeUploadId = entry?.id || activeUploadId;
    rebuildFromSelection();
    renderAll(`${label} 웹게시 링크 연결 완료`);
    saveDashboardState();
    fillSavedLinkInputs();
    renderLinkedDataList();
    closeDataInsert();
    if (kind === "receiptHistory" && typeof window.__dailyStableReloadV23 === "function") window.__dailyStableReloadV23();
    refreshClaimAccumFrame();
    alert(`${label} 삽입 완료`);
  } catch (err) {
    alert(`웹게시 링크 불러오기 실패: ${err.message}`);
  }
}

async function fetchDriveFolderImages(url) {
  const res = await fetch(`/api/google-drive-folder?url=${encodeURIComponent(url)}`, { cache: "no-store" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `폴더 조회 오류 ${res.status}`);
  }
  const data = await res.json();
  return data.files || [];
}

function removeExistingLinkedEntries(groupKey) {
  state.uploads = state.uploads.filter((entry) => entry.groupKey !== groupKey);
  removeCachedLinkedGroups([groupKey]);
}

function fillSavedLinkInputs() {
  const receiptGroups = linkedGroupsForInput("26-summary");
  const receiptHistoryGroups = linkedGroupsForInput("receipt-history");
  setInputValue("receiptDataLink", "");
  setInputValue("receiptHistoryPublishLink", "");
  populateExistingDataBulkInput();
  setInputStatus("receiptDataLink", receiptGroups);
  setInputStatus("receiptHistoryPublishLink", receiptHistoryGroups, "https://docs.google.com/spreadsheets/d/e/.../pub?output=csv");
  renderLinkedDataList();
}

function existingDataGroupKeyForYear(year) {
  const yy = String(year || "").slice(-2);
  return yy ? `existing-${yy}-cost` : "";
}

function existingDataGroupForYear(year) {
  const groupKey = existingDataGroupKeyForYear(year);
  if (!groupKey) return null;
  return allLinkedDisplayGroups().find((group) => group.key === groupKey) || null;
}

function populateExistingDataBulkInput() {
  const yearSel = document.getElementById("existingDataPublishYear");
  const input = document.getElementById("existingDataPublishLink");
  if (!input) return;
  const group = existingDataGroupForYear(yearSel?.value);
  const items = group ? (group.items || []) : [];
  if (items.length > 1) {
    input.value = items.filter((item) => item.sourceUrl).map((item) => item.sourceUrl).join("\n");
  } else {
    input.value = items[0]?.sourceUrl || "";
  }
}

function refreshClaimAccumFrame() {
  const frame = document.querySelector(".defect-close-frame");
  const win = frame?.contentWindow;
  if (!win) return;
  try {
    if (typeof win.syncClosingLinksFromMainDashboard === "function") {
      Promise.resolve(win.syncClosingLinksFromMainDashboard()).then(() => {
        if (typeof win.render === "function") win.render();
      }).catch(() => {});
    }
  } catch (_) {}
}

async function loadExistingDataBulk() {
  const yearSel = document.getElementById("existingDataPublishYear");
  const input = document.getElementById("existingDataPublishLink");
  const year = yearSel?.value || "";
  const raw = input?.value.trim();
  if (!year) {
    alert("연도를 선택해 주세요.");
    return;
  }
  if (!raw) {
    alert("웹에 게시 주소를 입력해 주세요.");
    return;
  }
  const groupKey = existingDataGroupKeyForYear(year);
  const groupTitle = `${year}년 마감자료`;
  try {
    const dataSets = await fetchPublishedCsvDataSet(raw, "cost", "기존데이터", year);
    state.uploads = state.uploads.filter((entry) => entry.groupKey !== groupKey);
    let entry = null;
    dataSets.forEach((dataSet) => {
      entry = addUploadEntry({
        kind: "cost",
        fileName: dataSet.fileName || raw,
        label: dataSet.label,
        rows: normalizeRows(dataSet.rows, "cost"),
        countHint: dataSet.countHint,
        defectAmount: dataSet.defectAmount,
        sourceUrl: dataSet.fileName || raw,
        sourceSheet: dataSet.sheetName || "",
        selected: true,
        excluded: 0,
        sourceType: "spreadsheet-link",
        groupKey,
        groupTitle,
        order: Number(year)
      });
    });
    activeUploadId = entry?.id || activeUploadId;
    rebuildFromSelection();
    renderAll(`${groupTitle} 연결 완료`);
    saveDashboardState();
    fillSavedLinkInputs();
    renderLinkedDataList();
    refreshClaimAccumFrame();
    alert(`${groupTitle} 삽입 완료 (${dataSets.length}개월, 총 ${dataSets.reduce((sum, d) => sum + (d.countHint || 0), 0)}건)`);
  } catch (err) {
    alert(`웹게시 링크 불러오기 실패: ${err.message}`);
  }
}

function deleteExistingDataBulk() {
  const yearSel = document.getElementById("existingDataPublishYear");
  const year = yearSel?.value || "";
  if (!year) return;
  const groupKey = existingDataGroupKeyForYear(year);
  const hasData = state.uploads.some((entry) => entry.groupKey === groupKey) ||
    savedLinkGroupsCache.some((group) => (group.groupKey || group.sourceUrl) === groupKey);
  if (!hasData) {
    alert(`${year}년 마감자료가 없습니다.`);
    return;
  }
  if (!confirm(`${year}년 마감자료를 전부 삭제할까요?`)) return;
  state.uploads.filter((entry) => entry.groupKey === groupKey).forEach(revokeEntryImages);
  state.uploads = state.uploads.filter((entry) => entry.groupKey !== groupKey);
  removeCachedLinkedGroups([groupKey]);
  activeUploadId = state.uploads[0]?.id || "sample";
  renderAll(`${year}년 마감자료 삭제 완료`);
  saveDashboardState();
  fillSavedLinkInputs();
  renderLinkedDataList();
  refreshClaimAccumFrame();
  alert(`${year}년 마감자료 삭제 완료`);
}

function setInputValue(inputId, value) {
  const input = document.getElementById(inputId);
  if (input) input.value = value || "";
}

function firstSourceUrl(groupKey) {
  const loaded = state.uploads.find((entry) => entry.groupKey === groupKey && entry.sourceUrl)?.sourceUrl || "";
  if (loaded) return loaded;
  return firstGroupSourceUrl(allLinkedDisplayGroups().find((group) => group.key === groupKey));
}

function linkedGroupsForInput(groupKey) {
  if (groupKey === "existing-data") {
    return allLinkedDisplayGroups().filter((group) => group.items.some((entry) => entry.kind === "cost"));
  }
  return allLinkedDisplayGroups().filter((group) => group.key === groupKey);
}

function allLinkedDisplayGroups() {
  const loadedGroups = groupUploads(state.uploads.filter((entry) => entry.sourceType === "spreadsheet-link"));
  const loadedKeys = new Set(loadedGroups.map((group) => group.key));
  const cachedGroups = groupUploads(cachedLinkedEntries()).filter((group) => !loadedKeys.has(group.key));
  return [...loadedGroups, ...cachedGroups]
    .sort((a, b) => groupSortOrder(a) - groupSortOrder(b) || a.title.localeCompare(b.title, "ko"));
}

function cachedLinkedEntries() {
  return savedLinkGroupsCache.flatMap((group) => {
    const entries = group.entries?.length ? group.entries : [{ label: group.label, selected: true, excluded: 0 }];
    return entries.map((entry, index) => ({
      id: `saved-${hashString(`${group.groupKey || group.sourceUrl}-${index}`)}`,
      kind: group.kind,
      fileName: group.sourceUrl,
      label: entry.label || group.label || group.groupTitle || kindNames[group.kind] || "저장 링크",
      rows: [],
      sourceUrl: group.sourceUrl,
      sourceSheet: entry.sourceSheet || "",
      selected: entry.selected ?? true,
      excluded: Number(entry.excluded || 0),
      sourceType: "spreadsheet-link",
      groupKey: group.groupKey || group.sourceUrl,
      groupTitle: group.groupTitle || group.label || kindNames[group.kind] || "저장 링크",
      order: group.order ?? 500
    }));
  });
}

function removeCachedLinkedGroups(groupKeys) {
  const keys = new Set(groupKeys);
  savedLinkGroupsCache = savedLinkGroupsCache.filter((group) => !keys.has(group.groupKey || group.sourceUrl));
}

function firstGroupSourceUrl(group) {
  return group?.items?.find((entry) => entry.sourceUrl)?.sourceUrl || "";
}

function setInputStatus(inputId, groups, fallbackPlaceholder = "스프레드시트 링크를 붙여넣기") {
  const input = document.getElementById(inputId);
  const status = document.getElementById(`${inputId}Status`);
  if (!input || !status) return;
  const titles = (groups || []).map((group) => linkedGroupDisplayTitle(group)).filter(Boolean);
  const savedText = titles.length ? `저장됨: ${titles.join(", ")}` : "";
  status.textContent = savedText;
  input.placeholder = savedText || fallbackPlaceholder;
  input.title = titles.length ? savedText : "";
}

function clearLinkedGroup(groupKey, inputId) {
  const groupKeys = groupKey === "existing-data"
    ? [...new Set(allLinkedDisplayGroups().filter((group) => group.items.some((entry) => entry.kind === "cost")).map((group) => group.key))]
    : [groupKey];
  const hasData = state.uploads.some((entry) => groupKeys.includes(entry.groupKey)) ||
    savedLinkGroupsCache.some((group) => groupKeys.includes(group.groupKey || group.sourceUrl));
  setInputValue(inputId, "");
  if (!hasData) return;
  if (!confirm("이 항목과 연결된 자료를 삭제할까요?")) {
    fillSavedLinkInputs();
    return;
  }
  state.uploads
    .filter((entry) => groupKeys.includes(entry.groupKey))
    .forEach(revokeEntryImages);
  state.uploads = state.uploads.filter((entry) => !groupKeys.includes(entry.groupKey));
  removeCachedLinkedGroups(groupKeys);
  activeUploadId = state.uploads[0]?.id || "sample";
  renderAll("링크 자료 삭제 완료");
  saveDashboardState();
  fillSavedLinkInputs();
}

function linkedGroupMeta(base, url, dataSets) {
  const documentTitle = dataSets.find((dataSet) => dataSet.documentTitle)?.documentTitle || "";
  if (base.groupKey !== "existing-data") {
    return documentTitle ? { ...base, groupTitle: documentTitle } : base;
  }
  const year = detectYearFromName(`${documentTitle} ${url}`) || detectYearFromDataSets(dataSets);
  const title = documentTitle || (year ? `${year}년 마감자료` : base.groupTitle);
  return {
    ...base,
    groupKey: `existing-${year || hashString(url)}-${hashString(url)}`,
    groupTitle: title,
    order: year ? Number(year) : base.order
  };
}

function detectYearFromDataSets(dataSets) {
  const text = (dataSets || []).map((dataSet) => `${dataSet.label || ""} ${dataSet.sheetName || ""} ${dataSet.documentTitle || ""}`).join(" ");
  return detectYearFromName(text);
}

function renderLinkedDataList() {
  const holder = document.getElementById("linkedDataList");
  if (!holder) return;
  const groups = allLinkedDisplayGroups();
  if (!groups.length) {
    holder.innerHTML = `<div class="linked-empty">연결된 링크가 없습니다.</div>`;
    return;
  }
  holder.innerHTML = groups.map((group) => {
    const first = group.items.find((entry) => entry.sourceUrl) || {};
    const detail = linkedGroupDetailText(group);
    return `
      <div class="linked-row" title="${escapeHtml(first.sourceUrl || "")}">
        <div>
          <strong>${escapeHtml(linkedGroupDisplayTitle(group))}</strong>
          ${detail ? `<span>${escapeHtml(detail)}</span>` : ""}
        </div>
        <button type="button" onclick="deleteLinkedGroup('${group.key}')">삭제</button>
      </div>`;
  }).join("");
}

function linkedGroupDetailText(group) {
  const values = [...new Set(group.items
    .map((entry) => normalizeLinkTitle(entry.sourceSheet || entry.label || ""))
    .map((value) => cleanSpreadsheetTitle(value))
    .filter(Boolean)
    .filter((value) => value !== linkedGroupDisplayTitle(group)))];
  if (!values.length) return kindNames[group.items[0]?.kind] || "";
  const sorted = values.sort((a, b) => monthNumberFromLabel(a) - monthNumberFromLabel(b) || a.localeCompare(b, "ko", { numeric: true }));
  const visible = sorted.slice(0, 12);
  const rest = sorted.length - visible.length;
  return `${visible.join(", ")}${rest > 0 ? ` 외 ${rest}개` : ""}`;
}

function monthNumberFromLabel(value) {
  const match = String(value || "").match(/(\d{1,2})\s*월/);
  return match ? Number(match[1]) : 999;
}

function linkedGroupDisplayTitle(group) {
  const title = group.items.map((entry) => entry.groupTitle).find(Boolean) || group.title || "";
  return cleanSpreadsheetTitle(title);
}

function cleanSpreadsheetTitle(title) {
  return normalizeLinkTitle(String(title || ""))
    .replace(/\.(xlsx|xls|csv)$/i, "")
    .replace(/\s*-\s*Google Sheets$/i, "")
    .trim() || "스프레드시트";
}

function normalizeLinkTitle(title) {
  return String(title || "")
    .replaceAll("접수내역(기존데이터)", "접수내역 (누적데이터)")
    .replace(/^접수내역$/, "접수내역 (금월데이터)");
}

function deleteLinkedGroup(groupKey) {
  const group = allLinkedDisplayGroups().find((item) => item.key === groupKey);
  if (!group) return;
  if (!confirm(`${group.title} 링크 자료를 삭제할까요?`)) return;
  const ids = new Set(group.items.map((entry) => entry.id));
  group.items.forEach(revokeEntryImages);
  state.uploads = state.uploads.filter((entry) => !ids.has(entry.id));
  removeCachedLinkedGroups([groupKey]);
  if (groupKey === "monthly-status") localStorage.removeItem(monthlyStatusSnapshotKey);
  activeUploadId = state.uploads[0]?.id || "sample";
  renderAll("링크 자료 삭제 완료");
  saveDashboardState();
  fillSavedLinkInputs();
}

async function fetchSpreadsheetDataSets(url, kind, label) {
  if (isPublishedCsvUrl(url)) {
    return fetchPublishedCsvDataSet(url, kind, label);
  }
  if (isGoogleSheetUrl(url) && kind === "cost") {
    const workbook = await fetchGoogleMonthlyWorkbookByExport(url);
    if (workbook.length) return workbook;
    throw new Error("월별 시트를 찾지 못했습니다. 시트명에 1월, 2월처럼 월 표시가 있는지 확인해 주세요.");
  }
  if (isGoogleSheetUrl(url) && (kind === "receiptHistory" || kind === "monthlyStatus")) {
    const workbook = await fetchGoogleRawWorkbookDataSet(url, label);
    if (workbook.length) return workbook;
  }
  const rows = await fetchSpreadsheetRows(url);
  const documentTitle = rows.find((row) => row.__documentTitle)?.__documentTitle || "";
  return [{ label, fileName: url, documentTitle, rows }];
}

async function fetchGoogleRawWorkbookDataSet(url, label) {
  if (!window.XLSX) throw new Error("SheetJS 라이브러리가 필요합니다.");
  const info = googleSheetInfo(url);
  if (!info) throw new Error("Google Sheets 링크가 아닙니다.");
  const workbookFile = await fetchGoogleWorkbookBuffer(url, info.id);
  const workbook = XLSX.read(new Uint8Array(workbookFile.buffer), { type: "array" });
  const documentTitle = workbookFile.title || workbook.Props?.Title || "";
  const rows = workbook.SheetNames.flatMap((sheetName) =>
    excelRowsFromSheet(workbook.Sheets[sheetName]).map((row) => ({
      ...row,
      __sheetTitle: sheetName,
      __documentTitle: documentTitle
    }))
  );
  return [{
    label,
    fileName: url,
    sheetName: workbook.SheetNames.join(", "),
    documentTitle,
    countHint: rows.length,
    rows
  }];
}

async function fetchSpreadsheetRows(url) {
  const errors = [];
  if (isGoogleSheetUrl(url)) {
    try {
      return await fetchGoogleWorkbookBySheetNames(url);
    } catch (err) {
      errors.push(err.message);
    }
    try {
      return await fetchGoogleSheetByJsonp(url);
    } catch (err) {
      errors.push(err.message);
    }
  }

  try {
    const csvUrl = spreadsheetCsvUrl(url);
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error(`CSV 응답 오류 ${response.status}`);
    return parseFile(await response.text(), "spreadsheet.csv");
  } catch (err) {
    errors.push(err.message);
  }

  throw new Error(`${errors.join(" / ")}. 공유 권한 또는 게시 설정을 확인해 주세요.`);
}

async function fetchGoogleMonthlyWorkbookByExport(url) {
  if (!window.XLSX) throw new Error("SheetJS 라이브러리가 필요합니다.");
  const info = googleSheetInfo(url);
  if (!info) throw new Error("Google Sheets 링크가 아닙니다.");
  const workbookFile = await fetchGoogleWorkbookBuffer(url, info.id);
  const buffer = workbookFile.buffer;
  const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });
  const documentTitle = workbookFile.title || workbook.Props?.Title || "";
  const monthlySheets = workbook.SheetNames
    .map((sheetName) => ({ sheetName, month: parseMonthFromText(sheetName) }))
    .filter((sheet) => sheet.month)
    .sort((a, b) => monthNumber(a.month) - monthNumber(b.month));
  if (!monthlySheets.length) {
    throw new Error(`월별 시트를 찾지 못했습니다. 읽은 시트: ${workbook.SheetNames.join(", ")}`);
  }

  return monthlySheets.map((target) => ({
    label: target.month,
    fileName: `${url} / ${target.sheetName}`,
    sheetName: target.sheetName,
    documentTitle,
    countHint: countFromSheetName(target.sheetName),
    rows: deadlineRowsFromSheet(workbook.Sheets[target.sheetName]).map((row) => {
      row.__sheetTitle = target.sheetName;
      row.__documentTitle = documentTitle;
      return row;
    })
  })).map((dataSet) => ({
    ...dataSet,
    countHint: dataSet.countHint || dataSet.rows.length,
    defectAmount: sumDeadlineAmount(dataSet.rows)
  }));
}

async function fetchGoogleWorkbookBuffer(url, sheetId) {
  const proxyUrl = `/api/google-workbook?url=${encodeURIComponent(url)}`;
  try {
    const proxyResponse = await fetch(proxyUrl);
    if (proxyResponse.ok) {
      return {
        buffer: await proxyResponse.arrayBuffer(),
        title: decodeURIComponent(proxyResponse.headers.get("X-Sheet-Title") || "")
      };
    }
  } catch (err) {
    // file:// or a static host without the local proxy falls back to direct export.
  }

  const response = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`);
  if (!response.ok) throw new Error(`워크북 응답 오류 ${response.status}`);
  return {
    buffer: await response.arrayBuffer(),
    title: filenameFromContentDisposition(response.headers.get("Content-Disposition"))
  };
}

function filenameFromContentDisposition(value) {
  const text = String(value || "");
  const encoded = text.match(/filename\*=UTF-8''([^;]+)/i);
  if (encoded) return decodeURIComponent(encoded[1]).replace(/\.(xlsx|xls)$/i, "");
  const plain = text.match(/filename="?([^";]+)"?/i);
  return plain ? plain[1].replace(/\.(xlsx|xls)$/i, "") : "";
}

async function fetchGoogleMonthlyWorkbookBySheetNames(url) {
  const info = googleSheetInfo(url);
  if (!info) throw new Error("Google Sheets 링크가 아닙니다.");
  const referenceRows = await fetchGoogleSheetByJsonp(url).catch(() => []);
  const referenceSignature = rowsSignature(referenceRows);
  const monthSheets = Array.from({ length: 12 }, (_, index) => index + 1);
  const loaded = await Promise.allSettled(monthSheets.map((month) => {
    const sheetName = `${month}월`;
    return fetchGoogleSheetByJsonp(`https://docs.google.com/spreadsheets/d/${info.id}/edit?sheet=${encodeURIComponent(sheetName)}`)
      .then((rows) => ({ month, sheetName, rows }));
  }));

  return loaded
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
    .filter(({ month, rows }) => rows.length && rows.some((row) => {
      const date = findReceiptDate([row]) || findDateInRow(row);
      return date ? date.getMonth() + 1 === month : rowLooksLikeMonth(row, month);
    }) || (rowsSignature(rows) !== referenceSignature && rows.length))
    .filter(({ rows }, index, all) => {
      const signature = rowsSignature(rows);
      return all.findIndex((item) => rowsSignature(item.rows) === signature) === index;
    })
    .map(({ month, sheetName, rows }) => ({
      label: `${month}월`,
      fileName: `${url} / ${sheetName}`,
      rows: rows.map((row) => {
        row.__sheetTitle = sheetName;
        row.__documentTitle = row.__documentTitle || `${month}월`;
        return row;
      })
    }))
    .sort((a, b) => monthNumber(a.label) - monthNumber(b.label));
}

function rowsSignature(rows) {
  return JSON.stringify((rows || []).slice(0, 5).map((row) => (row.__cells || rowValues(row)).slice(0, 12)));
}

function spreadsheetCsvUrl(url) {
  const text = String(url || "").trim();
  if (/output=csv|format=csv/i.test(text)) return text;
  const match = text.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/);
  if (!match) return text;
  const parsed = new URL(text);
  const gid = parsed.searchParams.get("gid") || "0";
  return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv&gid=${gid}`;
}

function isGoogleSheetUrl(url) {
  return /docs\.google\.com\/spreadsheets\/d\/[^/]+/.test(String(url || ""));
}

function isPublishedCsvUrl(url) {
  return /docs\.google\.com\/spreadsheets\/d\/e\//.test(String(url || ""));
}

function googleSheetInfo(url) {
  const text = String(url || "").trim();
  const match = text.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/);
  if (!match) return null;
  const parsed = new URL(text);
  return {
    id: match[1],
    gid: parsed.searchParams.get("gid") || "0",
    sheet: parsed.searchParams.get("sheet") || ""
  };
}

function fetchGoogleSheetByJsonp(url) {
  const info = googleSheetInfo(url);
  if (!info) return Promise.reject(new Error("Google Sheets 링크가 아닙니다."));

  return new Promise((resolve, reject) => {
    const callback = `__sheetCallback_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callback];
      script.remove();
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Google Sheets 응답 시간 초과"));
    }, 15000);

    window[callback] = (payload) => {
      clearTimeout(timer);
      cleanup();
      try {
        if (payload?.status === "error") {
          reject(new Error(payload.errors?.[0]?.detailed_message || "Google Sheets 읽기 실패"));
          return;
        }
        resolve(gvizPayloadToRows(payload));
      } catch (err) {
        reject(err);
      }
    };

    script.onerror = () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error("Google Sheets 스크립트 로드 실패"));
    };
    const target = info.sheet
      ? `sheet=${encodeURIComponent(info.sheet)}`
      : `gid=${encodeURIComponent(info.gid)}`;
    script.src = `https://docs.google.com/spreadsheets/d/${info.id}/gviz/tq?${target}&tqx=out:json;responseHandler:${callback}`;
    document.head.appendChild(script);
  });
}

async function fetchGoogleWorkbookBySheetNames(url) {
  const info = googleSheetInfo(url);
  if (!info) throw new Error("Google Sheets 링크가 아닙니다.");
  const referenceRows = await fetchGoogleSheetByJsonp(url).catch(() => []);
  const referenceDate = findReceiptDate(referenceRows);
  const documentYear = yearFromText(url) || referenceDate?.getFullYear() || 2026;
  const documentMonth = monthFromText(url) || (referenceDate ? referenceDate.getMonth() + 1 : 6);
  const daySheets = Array.from({ length: 31 }, (_, index) => index + 1);
  const loaded = await Promise.allSettled(daySheets.map((day) => {
    const sheetName = `${day}일`;
    return fetchGoogleSheetByJsonp(`https://docs.google.com/spreadsheets/d/${info.id}/edit?sheet=${encodeURIComponent(sheetName)}`)
      .then((rows) => ({ day, sheetName, rows }));
  }));

  const results = [];
  loaded.forEach((result) => {
    if (result.status !== "fulfilled") return;
    const { day, sheetName, rows } = result.value;
    const expectedStamp = dateStamp(new Date(documentYear, documentMonth - 1, day));
    const matchingRows = rows.filter((row) => {
      const date = findReceiptDate([row]);
      return date && dateStamp(date) === expectedStamp;
    });
    if (!matchingRows.length) return;
    rows.forEach((row) => {
      row.__sheetTitle = sheetName;
      row.__documentTitle = `${documentYear}년 ${documentMonth}월`;
      row.__sheetDate = `${String(documentYear).slice(-2)}${String(documentMonth).padStart(2, "0")}${String(day).padStart(2, "0")}`;
      row.__headers = row.__headers || Object.keys(row);
      row.__cells = row.__cells || Object.values(row);
    });
    results.push(...rows);
  });
  if (!results.length) throw new Error("일자 시트 데이터를 찾지 못했습니다.");
  return results;
}

async function fetchGoogleWorkbookByJsonp(url) {
  const info = googleSheetInfo(url);
  if (!info) throw new Error("Google Sheets 링크가 아닙니다.");
  const sheets = await fetchGoogleSheetList(info.id);
  if (!sheets.length) return fetchGoogleSheetByJsonp(url);

  const documentMonth = monthFromText(sheets[0].documentTitle) || monthFromText(url) || 6;
  const documentYear = yearFromText(sheets[0].documentTitle) || yearFromText(url) || 2026;
  const targets = sheets
    .map((sheet) => ({ ...sheet, day: dayFromSheetTitle(sheet.title) }))
    .filter((sheet) => sheet.day)
    .sort((a, b) => a.day - b.day);

  const selected = targets.length ? targets : sheets.filter((sheet) => String(sheet.gid) === String(info.gid));
  const results = [];
  for (const sheet of selected) {
    const rows = await fetchGoogleSheetByJsonp(`https://docs.google.com/spreadsheets/d/${info.id}/edit?gid=${sheet.gid}`);
    rows.forEach((row) => {
      row.__sheetTitle = sheet.title;
      row.__documentTitle = sheet.documentTitle;
      row.__sheetDate = `${String(documentYear).slice(-2)}${String(documentMonth).padStart(2, "0")}${String(sheet.day || 1).padStart(2, "0")}`;
      row.__headers = row.__headers || Object.keys(row);
      row.__cells = row.__cells || Object.values(row);
    });
    results.push(...rows);
  }
  return results;
}

async function fetchGoogleWorkbookByHtml(url) {
  const info = googleSheetInfo(url);
  if (!info) throw new Error("Google Sheets 링크가 아닙니다.");
  const response = await fetch(`https://docs.google.com/spreadsheets/d/${info.id}/edit?gid=${info.gid}`);
  if (!response.ok) throw new Error(`시트 탭 정보 응답 오류 ${response.status}`);
  const html = await response.text();
  const documentTitle = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || html.match(/<title>([^<]+)/)?.[1] || "";
  const documentMonth = monthFromText(documentTitle) || monthFromText(url) || 6;
  const documentYear = yearFromText(documentTitle) || yearFromText(url) || 2026;
  const sheets = parseSheetTabsFromHtml(html)
    .map((sheet) => ({ ...sheet, day: dayFromSheetTitle(sheet.title) }))
    .filter((sheet) => sheet.day)
    .sort((a, b) => a.day - b.day);
  if (!sheets.length) throw new Error("일자 시트 탭을 찾지 못했습니다.");

  const results = [];
  const loaded = await Promise.allSettled(sheets.map((sheet) =>
    fetchGoogleSheetByJsonp(`https://docs.google.com/spreadsheets/d/${info.id}/edit?gid=${sheet.gid}`)
      .then((rows) => ({ sheet, rows }))
  ));
  loaded.forEach((result) => {
    if (result.status !== "fulfilled") return;
    const { sheet, rows } = result.value;
    rows.forEach((row) => {
      row.__sheetTitle = sheet.title;
      row.__documentTitle = documentTitle;
      row.__sheetDate = `${String(documentYear).slice(-2)}${String(documentMonth).padStart(2, "0")}${String(sheet.day).padStart(2, "0")}`;
      row.__headers = row.__headers || Object.keys(row);
      row.__cells = row.__cells || Object.values(row);
    });
    results.push(...rows);
  });
  if (!results.length) throw new Error("일자 시트 데이터를 읽지 못했습니다.");
  return results;
}

function parseSheetTabsFromHtml(html) {
  const tabs = [];
  const pattern = /\[\d+,0,\\"(\d+)\\",\[\{\\"1\\":\[\[0,0,\\"([^\\"]+)\\"/g;
  let match;
  while ((match = pattern.exec(html))) {
    tabs.push({ gid: match[1], title: unescapeSheetText(match[2]) });
  }
  const seen = new Set();
  return tabs.filter((tab) => {
    const key = `${tab.gid}:${tab.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function unescapeSheetText(text) {
  return String(text || "")
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

function fetchGoogleSheetList(sheetId) {
  return new Promise((resolve, reject) => {
    const callback = `__sheetListCallback_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callback];
      script.remove();
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("시트 목록 응답 시간 초과"));
    }, 15000);

    window[callback] = (payload) => {
      clearTimeout(timer);
      cleanup();
      try {
        const documentTitle = payload?.table?.props?.title || "";
        const rows = payload?.table?.rows || [];
        const sheets = rows.map((row) => {
          const title = gvizCellValue(row.c?.[0]);
          const gid = gvizCellValue(row.c?.[1]);
          return title && gid !== "" ? { title: String(title), gid: String(gid), documentTitle } : null;
        }).filter(Boolean);
        resolve(sheets);
      } catch (err) {
        reject(err);
      }
    };

    script.onerror = () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error("시트 목록 로드 실패"));
    };
    script.src = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json;responseHandler:${callback}&tq=${encodeURIComponent("select A,B")}`;
    document.head.appendChild(script);
  });
}

function gvizPayloadToRows(payload) {
  const table = payload?.table;
  const cols = table?.cols || [];
  const rows = table?.rows || [];
  const headers = cols.map((col, index) => String(col.label || col.id || `컬럼${index + 1}`).trim() || `컬럼${index + 1}`);
  return rows.map((row, rowIndex) => {
    const cells = headers.map((_, index) => gvizCellValue(row.c?.[index]));
    return {
      ...Object.fromEntries(headers.map((header, index) => [header, cells[index]])),
      __headers: headers,
      __cells: cells,
      __rowIndex: rowIndex
    };
  });
}

function gvizCellValue(cell) {
  if (!cell) return "";
  return cell.f ?? cell.v ?? "";
}

function bindDropZones() {
  document.querySelectorAll(".upload-slot").forEach((slot) => {
    slot.addEventListener("dragover", (event) => {
      event.preventDefault();
      slot.classList.add("drag-over");
    });
    slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
    slot.addEventListener("drop", async (event) => {
      event.preventDefault();
      slot.classList.remove("drag-over");
      const files = [...event.dataTransfer.files];
      if (!files.length) return;
      const kind = slot.dataset.kind;
      if (kind === "images") {
        await loadImages(files.filter((file) => file.type.startsWith("image/")));
      } else {
        for (const file of files) {
          try {
            await loadDataFile(file, kind);
          } catch (err) {
            alert(`업로드 오류: ${err.message}`);
          }
        }
      }
    });
  });
}

async function loadDataFile(file, kind) {
  const dataSets = isExcelFile(file.name)
    ? await parseExcelDataSets(file)
    : [{ label: uploadLabel(file.name), fileName: file.name, rows: parseFile(await file.text(), file.name) }];

  removeExistingFileEntries(file.name, kind);

  let lastEntry = null;
  dataSets.forEach((dataSet) => {
    const rows = normalizeRows(dataSet.rows, kind);
    lastEntry = addUploadEntry({
      kind,
      fileName: dataSet.fileName,
      label: dataSet.label,
      rows,
      selected: true,
      excluded: 0
    });
  });
  activeUploadId = lastEntry?.id || activeUploadId;
  rebuildFromSelection();
  renderAll(dataSets.length > 1 ? `${file.name} 월별 시트 ${dataSets.length}개 분리 완료` : `${file.name} 업로드 완료`);
}

function removeExistingFileEntries(fileName, kind) {
  state.uploads
    .filter((entry) => entry.kind === kind && (entry.fileName === fileName || entry.fileName.startsWith(`${fileName} /`)))
    .forEach(revokeEntryImages);
  state.uploads = state.uploads.filter((entry) => {
    if (entry.kind !== kind) return true;
    return entry.fileName !== fileName && !entry.fileName.startsWith(`${fileName} /`);
  });
}

function isExcelFile(fileName) {
  return /\.(xls|xlsx)$/i.test(fileName);
}

async function parseExcelDataSets(file) {
  if (!window.XLSX) {
    throw new Error("엑셀 파일을 읽으려면 인터넷 연결 또는 SheetJS 라이브러리가 필요합니다.");
  }
  const workbook = XLSX.read(new Uint8Array(await file.arrayBuffer()), { type: "array" });
  const monthlySheets = workbook.SheetNames
    .map((sheetName) => ({ sheetName, month: parseMonthFromText(sheetName) }))
    .filter((sheet) => sheet.month)
    .sort((a, b) => monthNumber(a.month) - monthNumber(b.month));

  const targets = monthlySheets.length > 1
    ? monthlySheets
    : workbook.SheetNames.slice(0, 1).map((sheetName) => ({ sheetName, month: uploadLabel(file.name) }));

  return targets.map((target) => ({
    label: target.month,
    fileName: monthlySheets.length > 1 ? `${file.name} / ${target.sheetName}` : file.name,
    rows: excelRowsFromSheet(workbook.Sheets[target.sheetName])
  }));
}

function excelRowsFromSheet(sheet) {
  const aoa = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: false });
  const headerIndex = findExcelHeaderIndex(aoa);
  const headers = (aoa[headerIndex] || []).map((cell, index) => String(cell || `컬럼${index + 1}`).trim() || `컬럼${index + 1}`);
  return aoa
    .map((cells, rowIndex) => {
      const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
      row.__headers = headers;
      row.__cells = cells;
      row.__rowIndex = rowIndex;
      return row;
    })
    .filter((row) => (row.__cells || []).some((cell) => String(cell ?? "").trim()));
}

function deadlineRowsFromSheet(sheet) {
  const aoa = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: false });
  const headerIndex = findDeadlineHeaderIndex(aoa);
  const headers = (aoa[headerIndex] || []).map((cell, index) => String(cell || `컬럼${index + 1}`).trim() || `컬럼${index + 1}`);
  const indexes = deadlineColumnIndexes(headers);
  return aoa
    .slice(headerIndex + 1)
    .map((cells, rowIndex) => {
      const row = {};
      ["유형", "세부유형", "포장", "브랜드", "제품코드", "색상", "수량", "금액", "하자상세"].forEach((key) => {
        row[key] = indexes[key] !== undefined ? (cells[indexes[key]] ?? "") : "";
      });
      row.__headers = headers;
      row.__cells = headers.map((_, index) => cells[index] ?? "");
      row.__rowIndex = rowIndex;
      return row;
    })
    .filter((row) => row["유형"] || row["세부유형"] || row["제품코드"])
    .filter((row) => String(row["포장"] || "").trim().toUpperCase() !== "VN")
    .sort((a, b) =>
      String(a["포장"] || "").localeCompare(String(b["포장"] || ""), "ko") ||
      String(a["세부유형"] || "").localeCompare(String(b["세부유형"] || ""), "ko")
    );
}

function findDeadlineHeaderIndex(aoa) {
  for (let index = 0; index < Math.min(aoa.length, 30); index += 1) {
    const row = (aoa[index] || []).map(cleanKey);
    if (row.includes(cleanKey("유형")) && row.includes(cleanKey("세부유형")) && row.includes(cleanKey("포장")) && row.includes(cleanKey("제품코드"))) {
      return index;
    }
  }
  return findExcelHeaderIndex(aoa);
}

function deadlineColumnIndexes(headers) {
  const indexes = {};
  headers.forEach((header, index) => {
    const key = cleanKey(header);
    if (key === cleanKey("유형")) indexes["유형"] = index;
    else if (key === cleanKey("세부유형")) indexes["세부유형"] = index;
    else if (key === cleanKey("포장")) indexes["포장"] = index;
    else if (key === cleanKey("브랜드") || key.includes(cleanKey("브랜드")) || key.includes("brand")) indexes["브랜드"] = index;
    else if (key === cleanKey("제품코드")) indexes["제품코드"] = index;
    else if (key === cleanKey("색상") || key.includes(cleanKey("색상"))) indexes["색상"] = index;
    else if (key === cleanKey("수량")) indexes["수량"] = index;
    else if (key === cleanKey("금액")) indexes["금액"] = index;
    else if (key === cleanKey("하자상세")) indexes["하자상세"] = index;
  });
  return indexes;
}

function countFromSheetName(sheetName) {
  const text = String(sheetName || "");
  const candidates = [
    text.match(/월[^\d]*(\d{1,5})\s*건?/),
    text.match(/\((\d{1,5})\s*건?\)/),
    text.match(/\[(\d{1,5})\s*건?\]/)
  ];
  const found = candidates.find(Boolean);
  return found ? Number(found[1]) : 0;
}

function sumDeadlineAmount(rows) {
  return (rows || []).reduce((sum, row) => sum + numeric(row["금액"]), 0);
}

function findExcelHeaderIndex(aoa) {
  let best = 0;
  let bestScore = -1;
  aoa.slice(0, 30).forEach((row, index) => {
    const text = row.map((cell) => String(cell || "")).join(" ");
    const score = [
      /접수\s*일자/.test(text),
      /시공\s*미결/.test(text),
      /유형/.test(text),
      /구분/.test(text),
      /일일\s*합계|합계\s*금액/.test(text),
      /금액/.test(text),
      /실패|클레임|패널티/.test(text),
      /260\d{3}|25\d{4}|26\d{4}/.test(text)
    ].filter(Boolean).length;
    if (score > bestScore) {
      best = index;
      bestScore = score;
    }
  });
  return best;
}

function parseMonthFromText(value) {
  const match = String(value || "").match(/(\d{1,2})\s*월/);
  if (!match) return null;
  const month = Number(match[1]);
  if (month < 1 || month > 12) return null;
  return `${month}월`;
}

function monthNumber(value) {
  return Number(String(value || "").match(/\d{1,2}/)?.[0] || 99);
}

function rowLooksLikeMonth(row, month) {
  return rowValues(row).concat(Object.keys(row)).some((value) => {
    const date = parseDateFromText(value);
    if (date) return date.getMonth() + 1 === month;
    return monthFromText(value) === month;
  });
}

async function loadImages(files, imageNo = null, imageDate = "") {
  if (!files.length) return;
  const images = await Promise.all(files.map(async (file, index) => {
    const isVideo = file.type?.startsWith("video/");
    const dataUrl = isVideo ? await fileToDataUrl(file) : await imageFileToDataUrl(file);
    return {
      id: createImageId(),
      name: file.name,
      url: dataUrl,
      dataUrl,
      mediaType: isVideo ? "video" : "image",
      mimeType: file.type || "",
      imageNo: imageNo || nextImageNoForUpload(index),
      imageDate: imageDate || ""
    };
  }));
  const entry = addUploadEntry({
    kind: "images",
    fileName: `${files.length}개 이미지`,
    label: uploadLabel("이미지"),
    rows: [],
    images,
    selected: true,
    excluded: 0
  });
  activeUploadId = entry.id;
  rebuildFromSelection();
  renderAll(`${files.length}개 이미지 연결 완료`);
  saveDashboardState();
}

function createImageId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `img_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function nextImageNoForUpload(offset = 0) {
  const used = state.images.map((image) => Number(image.imageNo)).filter(Boolean);
  return (used.length ? Math.max(...used) : 0) + 1 + offset;
}

function imageFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("이미지를 읽지 못했습니다."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => resolve(reader.result);
      img.onload = () => {
        const maxSide = 1200;
        const ratio = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * ratio));
        canvas.height = Math.max(1, Math.round(img.height * ratio));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("파일을 읽지 못했습니다."));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

function toggleFileCards() {
  fileCardsCollapsed = !fileCardsCollapsed;
  renderFileCards();
}

function addUploadEntry(entry) {
  if (entry.groupKey) {
    const dupIndex = state.uploads.findIndex((u) => u.groupKey === entry.groupKey && u.label === entry.label);
    if (dupIndex !== -1) {
      const next = { ...state.uploads[dupIndex], ...entry };
      state.uploads[dupIndex] = next;
      return next;
    }
  }
  const next = {
    id: `u_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    ...entry
  };
  state.uploads.push(next);
  return next;
}

function uploadLabel(fileName) {
  const manual = document.getElementById("labelInput")?.value.trim();
  if (manual) return manual;
  const month = String(fileName).match(/(\d{1,2})\s*월/);
  if (month) return `${Number(month[1])}월`;
  return String(fileName).replace(/\.(csv|tsv|json|txt)$/i, "");
}

function selectedUploads() {
  return state.uploads.filter((entry) => entry.selected);
}

function visibleUploads() {
  const selected = selectedUploads();
  return selected.length ? selected : state.uploads;
}

function selectedByKind(kind) {
  return visibleUploads().filter((entry) => entry.kind === kind);
}

function rebuildFromSelection() {
  const visible = visibleUploads();
  if (!visible.length) {
    state.cost = structuredClone(sampleState.cost);
    state.summary = structuredClone(sampleState.summary);
    state.details = structuredClone(sampleState.details);
    state.images = [];
    state.costMeta = defaultCostMeta();
    detailDateOptions = [];
    selectedDetailDate = "";
    activeUploadId = "sample";
    return;
  }

  const costEntries = selectedByKind("cost");
  const selectedSummaryEntries = selectedByKind("summary");
  const selectedReceiptHistoryEntries = selectedByKind("receiptHistory");
  const summaryEntries = selectedSummaryEntries.length ? selectedSummaryEntries : state.uploads.filter((entry) => entry.kind === "summary");
  const receiptHistoryEntries = selectedReceiptHistoryEntries.length ? selectedReceiptHistoryEntries : state.uploads.filter((entry) => entry.kind === "receiptHistory");
  const detailEntries = selectedByKind("details");
  const imageEntries = selectedByKind("images");

  state.summary = deriveClaimSummaryForView(receiptHistoryEntries, summaryEntries);
  const derivedCost = deriveCostFromSummary(summaryEntries);
  if (derivedCost || costEntries.length) {
    state.cost = derivedCost || mergeCost(costEntries);
  } else if (restoredViewSnapshot?.cost) {
    state.costMeta = structuredClone(restoredViewSnapshot.costMeta || defaultCostMeta());
    state.cost = structuredClone(restoredViewSnapshot.cost);
  } else {
    state.cost = blankCostRows(currentCostKeys());
  }
  const receiptDetails = deriveDetailsFromReceiptEntries(summaryEntries);
  state.details = receiptDetails.length ? receiptDetails : detailEntries.length ? mergeDetails(detailEntries) : [];
  state.images = imageEntries.flatMap((entry) => entry.images || []);
}

function deriveClaimSummaryForView(receiptHistoryEntries, summaryEntries) {
  if (receiptHistoryEntries.length || !restoredViewSnapshot?.summary) {
    const derived = receiptHistoryEntries.length || summaryEntries.length
      ? deriveClaimSummaryFromSources(receiptHistoryEntries, summaryEntries)
      : [];
    return restoredViewSnapshot?.summary ? fillMissingSummaryMonthsFromSnapshot(derived, restoredViewSnapshot.summary) : derived;
  }
  if (!summaryEntries.length) return structuredClone(restoredViewSnapshot.summary);
  return mergeHistoricalSummaryWithCurrent(restoredViewSnapshot.summary, deriveClaimSummaryFromSources([], summaryEntries));
}

function summaryMonthFallbackValue(row, month) {
  const direct = splitSummaryValue(row?.[`m${month}`]);
  if (direct.hasValue && direct.main > 0) return direct.main;
  const total = splitSummaryValue(row?.[`m${month}Total`]);
  if (total.hasValue && total.main > 0) return total.main;
  if (month !== 6) return 0;
  const juneKeys = ["w1", "w2", "w3", "d622", "d623", "d624", "d625", "d626", "d629", "d630"];
  return juneKeys.reduce((sum, key) => sum + splitSummaryValue(row?.[key]).main, 0);
}

function fillMissingSummaryMonthsFromSnapshot(rows, snapshotRows) {
  const meta = currentSummaryMeta();
  const backupByCategory = new Map((snapshotRows || []).map((row) => [row.category, row]));
  return (rows || []).map((row) => {
    if (row.category === "PPM") return row;
    const backup = backupByCategory.get(row.category);
    if (!backup) return row;
    const next = { ...row };
    for (let month = 1; month < meta.currentMonth; month += 1) {
      const key = `m${month}`;
      const current = splitSummaryValue(next[key]);
      if (current.hasValue && current.main > 0) continue;
      const fallback = summaryMonthFallbackValue(backup, month);
      if (fallback > 0) next[key] = fallback;
    }
    const targets = fixedSummaryTargets(next.category);
    const monthKeys = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      return month === meta.currentMonth ? meta.monthTotalKey : `m${month}`;
    });
    const totalMain = monthKeys.reduce((sum, key) => sum + splitSummaryValue(next[key]).main, 0);
    const activeMonths = monthKeys.filter((key) => splitSummaryValue(next[key]).main > 0).length;
    next.total = targets ? targetCell(totalMain, targets.total, true) : totalMain;
    next.avg = targets ? targetCell(activeMonths ? Math.round(totalMain / activeMonths) : 0, targets.avg, true) : (activeMonths ? Math.round(totalMain / activeMonths) : 0);
    return next;
  });
}

function mergeHistoricalSummaryWithCurrent(historySummary, currentSummary) {
  const meta = currentSummaryMeta();
  const currentByCategory = new Map((currentSummary || []).map((row) => [row.category, row]));
  return (historySummary || []).map((historyRow) => {
    if (historyRow.category === "PPM") return { ...historyRow };
    const currentRow = currentByCategory.get(historyRow.category);
    if (!currentRow) return { ...historyRow };
    const merged = { ...historyRow };
    for (let month = 1; month < meta.currentMonth; month += 1) {
      const monthKey = `m${month}`;
      const oldTotalKey = `m${month}Total`;
      const monthValue = splitSummaryValue(merged[monthKey]);
      const oldTotalValue = splitSummaryValue(merged[oldTotalKey]);
      if ((!monthValue.hasValue || monthValue.main === 0) && oldTotalValue.hasValue && oldTotalValue.main > 0) {
        merged[monthKey] = oldTotalValue.main;
      }
    }
    [
      ...meta.preWeeks.map((week) => week.key),
      ...meta.dayColumns.map((day) => day.key),
      meta.monthTotalKey,
      ...meta.postMonths.map((month) => `m${month}`)
    ].forEach((key) => {
      if (currentRow[key] !== undefined) merged[key] = currentRow[key];
    });
    const targets = fixedSummaryTargets(merged.category);
    const monthKeys = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      return month === meta.currentMonth ? meta.monthTotalKey : `m${month}`;
    });
    const totalMain = monthKeys.reduce((sum, key) => sum + splitSummaryValue(merged[key]).main, 0);
    const activeMonths = monthKeys
      .filter((key) => splitSummaryValue(merged[key]).main > 0).length;
    merged.total = targets ? targetCell(totalMain, targets.total, true) : totalMain;
    merged.avg = targets ? targetCell(activeMonths ? Math.round(totalMain / activeMonths) : 0, targets.avg, true) : (activeMonths ? Math.round(totalMain / activeMonths) : 0);
    return merged;
  });
}

function defaultCostMeta() {
  return { keys: [...defaultCostKeys], monthLabel: "6월" };
}

function currentCostKeys() {
  return state.costMeta?.keys?.length ? state.costMeta.keys : defaultCostKeys;
}

function mergeCost(entries) {
  const map = new Map();
  const keys = currentCostKeys();
  entries.forEach((entry) => {
    entry.rows.forEach((row) => {
      const key = row.item || "미분류";
      if (!map.has(key)) {
        map.set(key, { item: key, ...Object.fromEntries(keys.map((dateKey) => [dateKey, 0])), monthTotal: 0, yearTotal: 0, monthAverage: 0 });
      }
      const target = map.get(key);
      [...keys, "monthTotal", "yearTotal", "monthAverage"].forEach((field) => {
        target[field] += numeric(row[field]);
      });
    });
  });
  return [...map.values()];
}

function deriveCostFromSummary(entries) {
  if (!entries.length) {
    state.costMeta = defaultCostMeta();
    return null;
  }

  const dailyStats = extractFailureDailyStats(entries);
  if (!dailyStats.size) {
    state.costMeta = defaultCostMeta();
    return null;
  }

  const latestDate = new Date([...dailyStats.keys()].sort((a, b) => b - a)[0]);
  const weekDates = summaryDisplayWeekDates(latestDate);
  const keys = weekDates.map(formatCostDateKey);
  const monthLabel = `${weekDates[0].getMonth() + 1}월`;
  state.costMeta = { keys, monthLabel };

  const failure = { item: "실패 비용 (클레임+패널티)" };
  keys.forEach((key, index) => {
    failure[key] = dailyStats.get(dateStamp(weekDates[index])) || "";
  });
  failure.monthTotal = sumCostStats([...dailyStats.values()]);
  const currentDeadline = currentYearDeadlineTotals();
  failure.yearTotal = currentDeadline.totalAmount + numeric(failure.monthTotal);
  failure.monthAverage = currentDeadline.monthCount ? Math.round(currentDeadline.totalAmount / currentDeadline.monthCount) : "";

  return [
    blankCostRow("예방 비용 (부적합)", keys),
    failure,
    blankCostRow("조치 비용", keys),
    blankCostRow("기타 (브랜드 검사)", keys)
  ];
}

function currentYearDeadlineTotals() {
  const groups = groupUploads(state.uploads).filter((group) => isDeadlineGroup(group) && groupYear(group) === "26");
  const entries = groups.flatMap((group) => group.items);
  const months = new Set();
  const totalAmount = entries.reduce((sum, entry) => {
    months.add(entry.label);
    return sum + entryAmount(entry);
  }, 0);
  return { totalAmount, monthCount: months.size };
}

function blankCostRow(item, keys) {
  return { item, ...Object.fromEntries(keys.map((key) => [key, ""])), monthTotal: "", yearTotal: "", monthAverage: "" };
}

function blankCostRows(keys) {
  return [
    blankCostRow("예방 비용 (부적합)", keys),
    blankCostRow("실패 비용 (클레임+패널티)", keys),
    blankCostRow("조치 비용", keys),
    blankCostRow("기타 (브랜드 검사)", keys)
  ];
}

function extractFailureDailyStats(entries) {
  const stats = new Map();
  entries.forEach((entry) => {
    const entryDate = parseDateFromText(entry.label) || parseDateFromText(entry.fileName);
    const rawRows = (entry.rows || []).map((row) => row.__raw || row);
    const entryStats = [];
    let usedDateColumnForEntry = false;

    rawRows.forEach((row, index) => {
      if (!isFailureCostRowNear(rawRows, index)) return;
      let usedDateColumn = false;
      Object.entries(row).forEach(([key, value]) => {
        const date = parseDateFromText(key);
        if (!date) return;
        usedDateColumn = true;
        usedDateColumnForEntry = true;
        addDailyStat(stats, date, numeric(value));
      });

      if (!usedDateColumn) {
        const amount = findAmountInRow(row) || findAmountNearRows(rawRows, index);
        if (amount) entryStats.push({ amount });
      }
    });

    if (!usedDateColumnForEntry && entryDate && entryStats.length) {
      const best = entryStats.sort((a, b) => b.amount - a.amount)[0];
      addDailyStat(stats, entryDate, best.amount);
    }
  });
  return stats.size ? stats : extractGenericDailyStats(entries);
}

function extractGenericDailyStats(entries) {
  const stats = new Map();
  entries.forEach((entry) => {
    const entryDate = parseDateFromText(entry.label) || parseDateFromText(entry.fileName);
    const rawRows = (entry.rows || []).map((row) => row.__raw || row);
    let foundDateColumn = false;
    const fallbackAmounts = [];

    rawRows.forEach((row) => {
      Object.entries(row).forEach(([key, value]) => {
        const date = parseDateFromText(key);
        const amount = numeric(value);
        if (!date || amount < 10000) return;
        foundDateColumn = true;
        addDailyStat(stats, date, amount);
      });

      const rowDate = findDateInRow(row) || entryDate;
      const amount = findAmountInRow(row);
      if (rowDate && amount >= 10000) {
        fallbackAmounts.push({ date: rowDate, amount });
      }
    });

    if (!foundDateColumn && fallbackAmounts.length) {
      const best = fallbackAmounts.sort((a, b) => b.amount - a.amount)[0];
      addDailyStat(stats, best.date, best.amount);
    }
  });
  return stats;
}

function isFailureCostRow(row) {
  const text = rowText(row);
  return /(실패|클레임|패널티)/.test(text);
}

function isFailureCostRowNear(rows, index) {
  return [index - 1, index, index + 1]
    .filter((nearIndex) => nearIndex >= 0 && nearIndex < rows.length)
    .some((nearIndex) => isFailureCostRow(rows[nearIndex]));
}

function findDateInRow(row) {
  for (const value of [row.__sheetDate, row.__sheetTitle, row.__documentTitle].concat(rowValues(row), Object.keys(row))) {
    const date = parseDateFromText(value);
    if (date) return date;
  }
  return null;
}

function findAmountInRow(row) {
  const headers = row.__headers || [];
  const cells = row.__cells || [];
  const amountIndex = headers.findIndex((header) => /(일일\s*합계|합계\s*금액|합계|금액|amount)/i.test(String(header)));
  if (amountIndex >= 0) {
    const amount = numeric(cells[amountIndex]);
    if (amount) return amount;
  }
  const preferred = Object.entries(row).find(([key]) => /(일일\s*합계|합계.?금액|합계|금액|amount)/i.test(String(key)));
  if (preferred) return numeric(preferred[1]);
  const numbers = rowValues(row).map(numeric).filter((value) => value > 0);
  const moneyLike = numbers.filter((value) => value >= 10000);
  return Math.max(0, ...(moneyLike.length ? moneyLike : numbers));
}

function findAmountNearRows(rows, index) {
  return [index, index + 1, index - 1]
    .filter((nearIndex) => nearIndex >= 0 && nearIndex < rows.length)
    .map((nearIndex) => findAmountInRow(rows[nearIndex]))
    .find((amount) => amount > 0) || 0;
}

function isFailureCostRow(row) {
  const text = rowText(row);
  return /(\uC2E4\uD328|\uD074\uB808\uC784|\uD328\uB110\uD2F0)/.test(text);
}

function findAmountInRow(row) {
  const headers = row.__headers || [];
  const cells = row.__cells || [];
  const amountIndex = findAmountColumnIndex(headers);
  if (amountIndex >= 0) {
    const amount = numeric(cells[amountIndex]);
    if (amount) return amount;
  }
  const preferred = Object.entries(row).find(([key]) => amountColumnScore(key) > 0);
  if (preferred) return numeric(preferred[1]);
  const numbers = rowValues(row).map(numeric).filter((value) => value > 0);
  const moneyLike = numbers.filter((value) => value >= 10000);
  return Math.max(0, ...(moneyLike.length ? moneyLike : numbers));
}

function findAmountColumnIndex(headers) {
  let bestIndex = -1;
  let bestScore = 0;
  headers.forEach((header, index) => {
    const score = amountColumnScore(header);
    if (score > bestScore) {
      bestIndex = index;
      bestScore = score;
    }
  });
  return bestIndex;
}

function amountColumnScore(value) {
  const text = String(value || "").replace(/\s+/g, "");
  if (/\uC77C\uC77C\uD569\uACC4/i.test(text)) return 100;
  if (/\uD569\uACC4\uAE08\uC561/i.test(text)) return 90;
  if (/\uD569\uACC4/i.test(text)) return 60;
  if (/\uAE08\uC561/i.test(text)) return 40;
  if (/amount/i.test(text)) return 30;
  return 0;
}

function extractFailureDailyStats(entries) {
  const stats = new Map();
  entries.forEach((entry) => {
    const rawRows = (entry.rows || []).map((row) => row.__raw || row);
    const groups = groupRowsBySheetDate(rawRows);
    groups.forEach((rows, stamp) => {
      const date = new Date(Number(stamp));
      const amount = findDailyTotalAmount(rows);
      if (date && amount) addDailyStat(stats, date, amount);
    });
    if (groups.size) return;

    const date = findReceiptDate(rawRows) || parseDateFromText(entry.label) || parseDateFromText(entry.fileName);
    const amount = findDailyTotalAmount(rawRows);
    if (date && amount) addDailyStat(stats, date, amount);
  });
  return stats;
}

function groupRowsBySheetDate(rows) {
  const groups = new Map();
  rows.forEach((row, index) => {
    const date = parseDateFromText(row.__sheetDate) || findReceiptDate([row]);
    if (!date) return;
    const stamp = dateStamp(date);
    if (!groups.has(stamp)) groups.set(stamp, []);
    groups.get(stamp).push(row);
  });
  return groups;
}

function findReceiptDate(rows) {
  for (const row of rows) {
    const headers = row.__headers || [];
    const cells = row.__cells || [];
    const receiptIndex = headers.findIndex((header) => /\uC811\uC218\uC77C\uC790/.test(String(header).replace(/\s+/g, "")));
    if (receiptIndex >= 0) {
      const date = parseDateFromText(cells[receiptIndex]);
      if (date) return date;
    }
    const direct = Object.entries(row).find(([key, value]) => /\uC811\uC218\uC77C\uC790/.test(String(key).replace(/\s+/g, "")) && parseDateFromText(value));
    if (direct) return parseDateFromText(direct[1]);
  }
  return null;
}

function findDailyTotalAmount(rows) {
  const amounts = [];
  rows.forEach((row) => {
    const headers = row.__headers || [];
    const cells = row.__cells || [];
    const index = headers.findIndex((header) => /\uC77C\uC77C\uD569\uACC4/.test(String(header).replace(/\s+/g, "")));
    if (index >= 0) {
      const amount = numeric(cells[index]);
      if (amount) amounts.push(amount);
    }
    Object.entries(row).forEach(([key, value]) => {
      if (!/\uC77C\uC77C\uD569\uACC4/.test(String(key).replace(/\s+/g, ""))) return;
      const amount = numeric(value);
      if (amount) amounts.push(amount);
    });
  });
  return amounts.length ? Math.max(...amounts) : 0;
}

function rowValues(row) {
  return Object.values(row)
    .filter((value) => !Array.isArray(value))
    .concat(row.__cells || []);
}

function rowText(row) {
  return rowValues(row).concat(Object.keys(row), row.__headers || []).map((value) => String(value || "")).join(" ");
}

function addDailyStat(map, date, amount) {
  if (!amount) return;
  const stamp = dateStamp(date);
  const prev = normalizeCostStat(map.get(stamp));
  map.set(stamp, {
    amount: prev.amount + amount,
    count: 0
  });
}

function parseDateFromText(value) {
  const text = String(value || "");
  const googleDate = text.match(/Date\((\d{4}),(\d{1,2}),(\d{1,2})\)/);
  if (googleDate) {
    return new Date(Number(googleDate[1]), Number(googleDate[2]), Number(googleDate[3]));
  }
  const iso = text.match(/(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (iso) {
    const year = Number(iso[1]);
    const month = Number(iso[2]);
    const day = Number(iso[3]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) return new Date(year, month - 1, day);
  }
  const yymmdd = text.match(/(?<!\d)(\d{2})(\d{2})(\d{2})(?!\d)/);
  if (yymmdd) {
    const year = 2000 + Number(yymmdd[1]);
    const month = Number(yymmdd[2]);
    const day = Number(yymmdd[3]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) return new Date(year, month - 1, day);
  }
  const md = text.match(/(\d{1,2})\s*[\/월.-]\s*(\d{1,2})/);
  if (md) {
    const month = Number(md[1]);
    const day = Number(md[2]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) return new Date(2026, month - 1, day);
  }
  return null;
}

function monthFromText(value) {
  const match = String(value || "").match(/(\d{1,2})\s*월/);
  if (!match) return null;
  const month = Number(match[1]);
  return month >= 1 && month <= 12 ? month : null;
}

function yearFromText(value) {
  const text = String(value || "");
  const full = text.match(/20(2[5-9])|20(3\d)/);
  if (full) return Number(full[0]);
  const short = text.match(/(?<!\d)(2[5-9])년?/);
  if (short) return 2000 + Number(short[1]);
  return null;
}

function dayFromSheetTitle(value) {
  const match = String(value || "").match(/(\d{1,2})\s*일/);
  if (!match) return null;
  const day = Number(match[1]);
  return day >= 1 && day <= 31 ? day : null;
}

function weekdaysForDate(date) {
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  return [0, 1, 2, 3, 4].map((offset) => {
    const next = new Date(monday);
    next.setDate(monday.getDate() + offset);
    return next;
  }).filter((next) => next.getMonth() === date.getMonth());
}

function summaryDisplayWeekDates(date) {
  if (date.getFullYear() === 2026 && date.getMonth() + 1 === 6 && date.getDate() >= 22) {
    return [22, 23, 24, 25, 26, 29, 30].map((day) => new Date(2026, 5, day));
  }
  return weekdaysForDate(date);
}

function formatCostDateKey(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function dateStamp(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function deriveClaimSummaryFromSources(historyEntries, currentEntries = []) {
  const categoryOrder = ["시공미결", "고객불만", "감성/취급"];
  const buckets = Object.fromEntries(categoryOrder.map((category) => [category, blankSummaryBucket(category)]));
  const today = new Date();
  const currentDatedRows = collectDatedReceiptRows(currentEntries);
  const latestCurrentDate = currentDatedRows
    .map((item) => item.date)
    .sort((a, b) => b - a)[0] || new Date(2026, 5, 26);
  const currentYear = latestCurrentDate?.getFullYear() || today.getFullYear();
  const currentMonth = latestCurrentDate?.getMonth() + 1 || today.getMonth() + 1;
  const historyRows = collectDatedReceiptRows(historyEntries).filter(({ date }) => {
    if (date.getFullYear() === 2025) return true;
    if (date.getFullYear() !== currentYear) return false;
    return date.getMonth() + 1 < currentMonth;
  });
  const currentRows = currentDatedRows.filter(({ date }) => date.getFullYear() === currentYear && date.getMonth() + 1 === currentMonth);

  [...historyRows, ...currentRows].forEach(({ row, date }) => {
    const category = receiptClaimCategory(row);
    if (!buckets[category]) buckets[category] = blankSummaryBucket(category);
    addClaimCount(buckets[category], date, currentMonth);
  });

  const rawRowsByCategory = categoryOrder.map((category) => buckets[category]);
  const summaryContext = { latestDate: latestCurrentDate, currentMonth };
  const rowsByCategory = rawRowsByCategory.map((bucket) => finalizeSummaryBucket(bucket, summaryContext));
  rowsByCategory.push(finalizeSummaryBucket(sumSummaryBuckets("계", rawRowsByCategory), summaryContext));
  rowsByCategory.push(ppmSummaryRow());
  return rowsByCategory;
}

function deriveClaimSummaryFromReceiptHistory(entries) {
  return deriveClaimSummaryFromSources(entries, []);
}

function collectDatedReceiptRows(entries) {
  return entries.flatMap((entry) => {
    const excluded = clamp(Number(entry.excluded || 0), 0, entry.rows.length);
    return (entry.rows || []).slice(excluded).map((row) => row.__raw || row);
  }).map((row) => ({ row, date: findReceiptDate([row]) || parseDateFromText(row.__sheetDate) || findDateInRow(row) }))
    .filter((item) => item.date && isCountableReceiptRow(item.row));
}

function isCountableReceiptRow(row) {
  const headers = row.__headers || [];
  const cells = row.__cells || [];
  const byHeader = (patterns) => {
    const index = headers.findIndex((header) => patterns.some((pattern) => pattern.test(String(header).replace(/\s+/g, ""))));
    if (index >= 0) return cells[index];
    const direct = Object.entries(row).find(([key, value]) =>
      patterns.some((pattern) => pattern.test(String(key).replace(/\s+/g, ""))) && String(value || "").trim()
    );
    return direct ? direct[1] : "";
  };
  const robustNumber = byHeader([/^번호$/, /^순번$/, /^No$/i, /^NO$/i, /접수번호/, /접수No/i]);
  const robustDetail = receiptDetailRow(row);
  if (String(robustNumber || "").trim() && hasReceiptDetailData(robustDetail)) return true;
  const number = pick(row, ["번호", "순번", "No", "NO"]);
  const receiptNo = pick(row, ["접수번호", "접수 번호"]);
  const detail = receiptDetailRow(row);
  return !!String(number || receiptNo).trim() && hasReceiptDetailData(detail);
}

function blankSummaryBucket(category) {
  return {
    category,
    prevTotal: 0,
    prevAvg: 0,
    m1: 0,
    m2: 0,
    m3: 0,
    m4: 0,
    m5: 0,
    w1: 0,
    w2: 0,
    w3: 0,
    d622: 0,
    d623: 0,
    d624: 0,
    d625: 0,
    d626: 0,
    d629: 0,
    d630: 0,
    m6Total: 0,
    m7: 0,
    m8: 0,
    m9: 0,
    m10: 0,
    m11: 0,
    m12: 0,
    total: 0,
    avg: 0,
    __months: new Set()
  };
}

function addClaimCount(bucket, date, currentMonth) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (year === 2025) {
    bucket.prevTotal += 1;
    return;
  }
  if (year !== 2026) return;

  bucket.total += 1;
  bucket.__months.add(month);
  const monthKey = `m${month}`;
  if (month >= 1 && month <= 12 && month !== 6 && monthKey in bucket) bucket[monthKey] += 1;
  if (month !== currentMonth) return;

  if (month === 6) {
    bucket.m6Total += 1;
    if (day >= 1 && day <= 7) bucket.w1 += 1;
    else if (day >= 8 && day <= 14) bucket.w2 += 1;
    else if (day >= 15 && day <= 21) bucket.w3 += 1;
    if (isMergedDisplayWeekDay(date)) {
      if (day === 22) bucket.d622 += 1;
      else if (day === 23) bucket.d623 += 1;
      else if (day === 24) bucket.d624 += 1;
      else if (day === 25) bucket.d625 += 1;
      else if (day === 26) bucket.d626 += 1;
      else if (day === 29) bucket.d629 += 1;
      else if (day === 30) bucket.d630 += 1;
    }
  }
}

function isMergedDisplayWeekDay(date) {
  const week = weekdaysForDate(date);
  const sameMonthDays = week.filter((day) => day.getMonth() === date.getMonth());
  const boundaryWeek = sameMonthDays.length <= 2;
  if (!boundaryWeek) return sameMonthDays.some((day) => dateStamp(day) === dateStamp(date));

  const day = date.getDate();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  if (day <= 2) return true;
  return lastDay - day < 2;
}

function receiptClaimCategory(row) {
  const pendingFlag = pick(row, ["미결구분", "미결 구분", "시공미결", "시공 미결", "미결"]);
  if (String(pendingFlag).trim() === "0") return "시공미결";
  const type = pick(row, ["유형", "구분", "분류", "type"]);
  if (/취급|감성/.test(String(type))) return "감성/취급";
  return "고객불만";
}

function deriveDetailsFromReceiptEntries(entries) {
  const datedRows = collectDatedReceiptRows(entries).sort((a, b) => dateStamp(a.date) - dateStamp(b.date));
  detailDateOptions = [...new Map(datedRows.map(({ date }) => [String(dateStamp(date)), date])).entries()]
    .map(([value, date]) => ({ value, label: formatDetailDateLabel(date) }))
    .sort((a, b) => Number(a.value) - Number(b.value));
  if (!detailDateOptions.length) {
    selectedDetailDate = "";
    return [];
  }
  if (!selectedDetailDate || !detailDateOptions.some((option) => option.value === selectedDetailDate)) {
    selectedDetailDate = detailDateOptions[detailDateOptions.length - 1].value;
  }
  return datedRows
    .filter(({ date }) => String(dateStamp(date)) === selectedDetailDate)
    .map(({ row }, index) => receiptDetailRow(row, index))
    .filter(hasReceiptDetailData)
    .sort(compareReceiptDetailRows);
}

function receiptDetailRow(row, index = 0) {
  return {
    number: numeric(pick(row, ["번호", "순번", "No", "NO"])) || index + 1,
    category: receiptClaimCategory(row),
    type: pick(row, ["유형", "세부유형", "하자유형", "type"]),
    brand: pick(row, ["구분", "브랜드", "brand"]),
    source: pick(row, ["원인처", "원인", "라인", "부서", "source"]),
    code: pick(row, ["부품코드", "제품코드", "품번", "코드", "code"]),
    color: pick(row, ["색상", "color"]),
    lot: pick(row, ["생산로트", "LOT NO", "LOT", "lot"]),
    supplier: pick(row, ["고객명", "공급", "공급처", "업체", "supplier"]),
    defect: pick(row, ["하자내역", "하자상세", "하자 내용", "내용", "defect"])
  };
}

function hasReceiptDetailData(row) {
  return ["type", "brand", "source", "code", "color", "lot", "supplier", "defect"]
    .some((key) => String(row[key] || "").trim());
}

function compareReceiptDetailRows(a, b) {
  const categoryOrder = { "시공미결": 0, "고객불만": 1, "감성/취급": 2 };
  const categoryDiff = (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99);
  if (categoryDiff) return categoryDiff;
  return naturalSourceCompare(a.source, b.source) || Number(a.number || 0) - Number(b.number || 0);
}

function naturalSourceCompare(a, b) {
  const left = String(a || "").trim();
  const right = String(b || "").trim();
  const leftNum = left.match(/\d+/)?.[0];
  const rightNum = right.match(/\d+/)?.[0];
  if (leftNum && rightNum && Number(leftNum) !== Number(rightNum)) return Number(leftNum) - Number(rightNum);
  if (leftNum && !rightNum) return -1;
  if (!leftNum && rightNum) return 1;
  return left.localeCompare(right, "ko", { numeric: true, sensitivity: "base" });
}

function selectedDetailImageNo() {
  const first = state.details[0];
  return first ? Number(first.number) || 1 : 1;
}

function formatDetailDateLabel(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function finalizeSummaryBucket(bucket, context = {}) {
  const result = { ...bucket };
  delete result.__months;
  result.prevAvg = result.prevTotal ? Math.round(result.prevTotal / 12) : 0;
  const monthCount = bucket.__months?.size || 0;
  result.avg = monthCount ? Math.round(result.total / monthCount) : 0;
  applyFixedTargetValues(result, context);
  summaryKeys.forEach((key) => {
    if (result[key] === 0) result[key] = key.startsWith("d") ? "0(0)" : 0;
  });
  return result;
}

function applyFixedTargetValues(row, context = {}) {
  const targets = fixedSummaryTargets(row.category);
  if (!targets) return row;
  const dailyDates = {
    d622: new Date(2026, 5, 22),
    d623: new Date(2026, 5, 23),
    d624: new Date(2026, 5, 24),
    d625: new Date(2026, 5, 25),
    d626: new Date(2026, 5, 26),
    d629: new Date(2026, 5, 29),
    d630: new Date(2026, 5, 30)
  };
  Object.entries(dailyDates).forEach(([key, date]) => {
    const showMain = shouldShowDailyMain(date, context.latestDate, context.currentMonth) || numeric(row[key]) > 0;
    row[key] = targetCell(row[key], targets.daily, showMain);
  });
  row.m6Total = targetCell(row.m6Total, targets.m6Total, true);
  ["m7", "m8", "m9", "m10", "m11", "m12"].forEach((key) => {
    row[key] = targetCell(row[key], targets.futureMonth, numeric(row[key]) > 0);
  });
  row.total = targetCell(row.total, targets.total, true);
  row.avg = targetCell(row.avg, targets.avg, true);
  return row;
}

function fixedSummaryTargets(category) {
  const targets = {
    "시공미결": { daily: 0, m6Total: 0, futureMonth: 0, total: 0, avg: 0 },
    "고객불만": { daily: 3, m6Total: 50, futureMonth: 50, total: 600, avg: 50 },
    "감성/취급": { daily: 0, m6Total: 0, futureMonth: 0, total: 0, avg: 0 },
    "계": { daily: 3, m6Total: 50, futureMonth: 50, total: 600, avg: 50 }
  };
  return targets[category] || null;
}

function shouldShowDailyMain(date, latestDate, currentMonth) {
  if (!latestDate || currentMonth !== 6) return false;
  return dateStamp(date) <= dateStamp(latestDate);
}

function targetCell(value, target, showMain = false) {
  const main = numeric(value);
  return showMain ? `${main}(${target})` : `(${target})`;
}

function sumSummaryBuckets(category, rows) {
  const bucket = blankSummaryBucket(category);
  rows.forEach((row) => {
    summaryKeys.forEach((key) => {
      bucket[key] += splitSummaryValue(row[key]).main;
    });
    if (row.__months) row.__months.forEach((month) => bucket.__months.add(month));
  });
  return bucket;
}

function ppmSummaryRow() {
  return {
    category: "PPM",
    prevTotal: "-",
    prevAvg: "",
    ...Object.fromEntries(summaryKeys.slice(2).map((key) => [key, "-"]))
  };
}

function mergeSummary(entries) {
  const map = new Map();
  entries.forEach((entry) => {
    entry.rows.forEach((row) => {
      const key = row.category || "미분류";
      if (!map.has(key)) map.set(key, { category: key });
      const target = map.get(key);
      summaryKeys.forEach((field) => {
        target[field] = addSummaryValue(target[field], row[field]);
      });
    });
  });
  return [...map.values()];
}

function mergeDetails(entries) {
  return entries.flatMap((entry) => {
    const excluded = clamp(Number(entry.excluded || 0), 0, entry.rows.length);
    return entry.rows.slice(excluded).map((row) => ({
      ...row,
      __sourceFile: entry.fileName,
      __sourceLabel: entry.label
    }));
  });
}

function parseFile(text, filename) {
  if (filename.toLowerCase().endsWith(".json")) {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : parsed.rows || [];
  }
  const delimiter = filename.toLowerCase().endsWith(".tsv") || text.includes("\t") ? "\t" : ",";
  return parseDelimited(text, delimiter);
}

function parseDelimited(text, delimiter) {
  const rows = [];
  let cell = "";
  let row = [];
  let quoted = false;
  const pushCell = () => {
    row.push(cell.trim());
    cell = "";
  };
  const pushRow = () => {
    if (row.some(Boolean)) rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      pushCell();
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      pushCell();
      pushRow();
    } else {
      cell += char;
    }
  }
  pushCell();
  pushRow();

  const headers = rows.shift() || [];
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header.trim(), values[index] ?? ""])));
}

function normalizeRows(rows, kind) {
  if (kind === "cost") {
    return rows.map((row) => ({
      __raw: row,
      __headers: row.__headers || Object.keys(row),
      __cells: row.__cells || Object.values(row),
      __rowIndex: row.__rowIndex ?? "",
      item: pick(row, aliases.item),
      "6/22": numOrText(pick(row, ["6/22", "622", "일자1"])),
      "6/23": numOrText(pick(row, ["6/23", "623", "일자2"])),
      "6/24": numOrText(pick(row, ["6/24", "624", "일자3"])),
      "6/25": numOrText(pick(row, ["6/25", "625", "일자4"])),
      "6/26": numOrText(pick(row, ["6/26", "626", "일자5"])),
      monthTotal: numOrText(pick(row, ["6월 누적", "월누적", "monthTotal"])),
      yearTotal: numOrText(pick(row, ["26년 누적", "연누적", "yearTotal"])),
      monthAverage: numOrText(pick(row, ["월 평균", "월평균", "monthAverage"]))
    }));
  }
  if (kind === "details") {
    return rows.map((row) => ({
      category: pick(row, aliases.category),
      type: pick(row, aliases.type),
      brand: pick(row, aliases.brand),
      source: pick(row, aliases.source),
      code: pick(row, aliases.code),
      color: pick(row, aliases.color),
      lot: pick(row, aliases.lot),
      supplier: pick(row, aliases.supplier),
      defect: pick(row, aliases.defect)
    }));
  }
  if (kind === "receiptHistory" || kind === "monthlyStatus") {
    return rows.map((row) => ({
      __raw: row,
      __headers: row.__headers || Object.keys(row),
      __cells: row.__cells || Object.values(row),
      __sheetTitle: row.__sheetTitle || "",
      __documentTitle: row.__documentTitle || ""
    }));
  }
  return rows.map((row) => ({
    __raw: row,
    category: pick(row, aliases.category),
    prevTotal: numOrText(pick(row, ["25년 합계", "25년", "전년합계", "prevTotal"])),
    prevAvg: numOrText(pick(row, ["25년 월평균", "전년월평균", "prevAvg"])),
    m1: numOrText(pick(row, ["1월", "m1"])),
    m2: numOrText(pick(row, ["2월", "m2"])),
    m3: numOrText(pick(row, ["3월", "m3"])),
    m4: numOrText(pick(row, ["4월", "m4"])),
    m5: numOrText(pick(row, ["5월", "m5"])),
    w1: numOrText(pick(row, ["6월 1주", "1주", "w1"])),
    w2: numOrText(pick(row, ["6월 2주", "2주", "w2"])),
    w3: numOrText(pick(row, ["6월 3주", "3주", "w3"])),
    d622: numOrText(pick(row, ["6/22", "d622"])),
    d623: numOrText(pick(row, ["6/23", "d623"])),
    d624: numOrText(pick(row, ["6/24", "d624"])),
    d625: numOrText(pick(row, ["6/25", "d625"])),
    d626: numOrText(pick(row, ["6/26", "d626"])),
    d629: numOrText(pick(row, ["6/29", "d629"])),
    d630: numOrText(pick(row, ["6/30", "d630"])),
    m6Total: numOrText(pick(row, ["6월 합계", "6월누계", "m6Total"])),
    m7: numOrText(pick(row, ["7월", "m7"])),
    m8: numOrText(pick(row, ["8월", "m8"])),
    m9: numOrText(pick(row, ["9월", "m9"])),
    m10: numOrText(pick(row, ["10월", "m10"])),
    m11: numOrText(pick(row, ["11월", "m11"])),
    m12: numOrText(pick(row, ["12월", "m12"])),
    total: numOrText(pick(row, ["합계", "total"])),
    avg: numOrText(pick(row, ["월평균", "월 평균", "avg"]))
  }));
}

function pick(row, names) {
  const keys = Object.keys(row);
  const normalized = keys.reduce((map, key) => {
    map[cleanKey(key)] = key;
    return map;
  }, {});
  for (const name of names) {
    const found = normalized[cleanKey(name)];
    if (found) return row[found];
  }
  return "";
}

function cleanKey(value) {
  return String(value).replace(/\s+/g, "").toLowerCase();
}

function numOrText(value) {
  if (value === undefined || value === null || value === "") return "";
  const stripped = String(value).replace(/[,\s원]/g, "");
  if (/^-?\d+(\.\d+)?$/.test(stripped)) return Number(stripped);
  return String(value).trim();
}

function renderAll(message) {
  rebuildFromSelection();
  renderFileCards();
  renderCost();
  renderSummary();
  renderDetails();
  renderWeeklyDefect();
  renderMonthDefect();
  const selected = selectedUploads();
  const visible = visibleUploads();
  const excluded = visible.reduce((sum, entry) => sum + Number(entry.excluded || 0), 0);
  const scope = state.uploads.length && !selected.length ? "전체 표시" : `선택 ${selected.length}개`;
  document.getElementById("dataStatus").textContent = message || `업로드 ${state.uploads.length}개 · ${scope} · 제외 ${excluded}건`;
}

function renderWeeklyDefect() {
  const holder = document.getElementById("weeklyDefectContent");
  if (!holder) return;
  const rows = monthlyStatusRows();
  if (!rows.length) {
    const reloading = queueMonthlyStatusReload();
    holder.innerHTML = `<div class="weekly-empty-message">${reloading ? "자료를 다시 불러오는 중입니다." : "표시할 주하자현황 자료가 없습니다."}</div>`;
    return;
  }
  const stats = weeklyDashboardStats(rows);
  const periodPrefix = weeklySelectedWeek ? `${stats.monthLabel}${weeklySelectedWeek}` : stats.monthLabel;
  holder.innerHTML = `
    <div class="weekly-tool">
      <div class="weekly-kpi-grid">
        <div class="weekly-kpi">
          <span>${escapeHtml(periodPrefix)} 클레임건수</span>
          <strong>${formatNumber(stats.totalCount)}</strong><em>건</em>
          <small>접수번호 기준 카운트</small>
        </div>
        <div class="weekly-kpi">
          <span>${escapeHtml(periodPrefix)} 총 손실 금액</span>
          <strong>${formatNumber(stats.totalAmount)}</strong><em>원</em>
          <small>L열 금액 + 건수당 60,000원</small>
        </div>
        <div class="weekly-kpi">
          <span>${escapeHtml(periodPrefix)} 주요 클레임 품목</span>
          <button class="weekly-main-item-button" type="button" onclick="openWeeklyTopItemsPopup()">${escapeHtml(stats.topItem.displayLabel || stats.topItem.label)}</button><em>${formatNumber(stats.topItem.count)}건</em>
          <small>I열 품목명 + J열 색상 / 건수 TOP 5</small>
          ${weeklyTopItemsInlineMarkup(stats.topItems)}
        </div>
      </div>
      <div class="weekly-visual-grid">
        <div class="weekly-visual-card">
          <h3>${escapeHtml(stats.monthLabel)} 주별 발생 수량</h3>
          ${weeklyBarChartMarkup(stats.weeks)}
        </div>
        <div class="weekly-visual-card">
          <h3>${escapeHtml(stats.monthLabel)} 주별 손실금액</h3>
          ${weeklyLineChartMarkup(stats.weeks)}
        </div>
        <div class="weekly-visual-card">
          <h3>${escapeHtml(stats.monthLabel)} 원인처별 현황</h3>
          ${weeklySourcePieMarkup(stats.sourcePie)}
        </div>
      </div>
      ${weeklyDetailDashboardMarkup(stats.details)}
    </div>`;
}

function renderMonthDefect() {
  const holder = document.getElementById("monthDefectContent");
  if (!holder) return;
  const reloading = queueExistingDeadlineReload();
  const rows = monthlyDeadlineMetas();
  const months = currentYearDeadlineMonthStats(rows);
  if (!months.length) {
    holder.innerHTML = `<div class="weekly-empty-message">${reloading ? "기존데이터 마감자료를 다시 불러오는 중입니다." : "1. 기존데이터에 금년도 마감자료를 넣으면 월하자현황이 표시됩니다."}</div>`;
    return;
  }
  if (monthlyDefectSelectedMonth && !months.some((item) => item.week === monthlyDefectSelectedMonth)) {
    monthlyDefectSelectedMonth = "";
  }
  const selectedMonthStat = monthlyDefectSelectedMonth ? months.find((item) => item.week === monthlyDefectSelectedMonth) : null;
  const totalCount = selectedMonthStat ? selectedMonthStat.count : months.reduce((sum, item) => sum + item.count, 0);
  const totalAmount = selectedMonthStat ? selectedMonthStat.amount : months.reduce((sum, item) => sum + item.amount, 0);
  const scopedRows = monthlyDefectScopedRows(rows);
  const topItems = monthlyTopClaimItems(scopedRows, 10, { hideMaterial: true });
  const periodPrefix = monthlyDefectSelectedMonth || currentYearLabel();
  holder.innerHTML = `
    <div class="weekly-tool">
      <div class="weekly-kpi-grid">
        <div class="weekly-kpi">
          <span>${escapeHtml(periodPrefix)} 클레임건수</span>
          <strong>${formatNumber(totalCount)}</strong><em>건</em>
          <small>금년도 마감자료 월별 합계</small>
        </div>
        <div class="weekly-kpi">
          <span>${escapeHtml(periodPrefix)} 총 손실 금액</span>
          <strong>${formatNumber(totalAmount)}</strong><em>원</em>
          <small>마감 금액 + 건수당 60,000원</small>
        </div>
        <div class="weekly-kpi">
          <span>${escapeHtml(periodPrefix)} 주요 클레임 품목</span>
          <button class="weekly-main-item-button" type="button" onclick="openMonthlyTopItemsPopup()">${escapeHtml(topItems[0]?.displayLabel || "-")}</button><em>${formatNumber(topItems[0]?.count || 0)}건</em>
          <small>제품코드 + 색상 / 건수 TOP 10</small>
          ${monthlyTopItemsInlineMarkup(topItems)}
        </div>
      </div>
      <div class="weekly-visual-grid">
        <div class="weekly-visual-card">
          <h3>${currentYearLabel()} 월별 발생 수량</h3>
          ${monthlyDefectBarChartMarkup(months)}
        </div>
        <div class="weekly-visual-card">
          <h3>${currentYearLabel()} 월별 손실금액</h3>
          ${monthlyDefectLineChartMarkup(months, "amount", weeklyAmountShort, "월별 손실금액 그래프", (tick) => `${Number((tick / 1000000).toFixed(1))}백만원`)}
        </div>
        <div class="weekly-visual-card">
          <h3>${currentYearLabel()} 원인처별 현황</h3>
          ${weeklySourcePieMarkup(monthlyDefectSourcePieItems(scopedRows))}
        </div>
      </div>
      ${monthlyDefectDetailMarkup(monthlyLineDetails(scopedRows))}
    </div>`;
}

function queueExistingDeadlineReload() {
  if (existingDeadlineAutoChecked || existingDeadlineAutoLoading) return existingDeadlineAutoLoading;
  const groups = savedLinkGroupsCache.filter((group) => group.kind === "cost" && group.sourceUrl);
  if (!groups.length) return false;
  existingDeadlineAutoChecked = true;
  existingDeadlineAutoLoading = true;
  const keys = new Set(groups.map((group) => group.groupKey || group.sourceUrl));
  state.uploads = state.uploads.filter((entry) => !keys.has(entry.groupKey));
  Promise.all(groups.map((group) => restoreSavedGroup(group)))
    .then(() => {
      existingDeadlineAutoLoading = false;
      rebuildFromSelection();
      renderAll("기존데이터 마감자료를 다시 불러왔습니다.");
      saveDashboardState();
    })
    .catch(() => {
      existingDeadlineAutoLoading = false;
      renderMonthDefect();
    });
  return true;
}

function monthlyDeadlineEntries() {
  const targetYear = String(new Date().getFullYear()).slice(2);
  return state.uploads
    .filter((entry) => entry.kind === "cost" && entry.sourceType === "spreadsheet-link" && entryYear(entry) === targetYear);
}

function monthlyEntryLabel(entry) {
  const month = monthNumber(entry.label || entry.sourceSheet || entry.fileName);
  return month >= 1 && month <= 12 ? `${month}월` : "";
}

function monthlyDeadlineRowMeta(entry, row, index) {
  const raw = row.__raw || row;
  const excluded = clamp(Number(entry.excluded || 0), 0, entry.rows.length);
  const item = String(row.deadlineCode || pick(raw, ["제품코드", "code"]) || "").trim();
  const color = String(row.deadlineColor || pick(raw, ["색상", "color"]) || "").trim();
  const quantity = numeric(row.deadlineQuantity || pick(raw, ["수량", "quantity"])) || 1;
  const amount = numeric(row.deadlineAmount || pick(raw, ["금액", "amount"]));
  return {
    row: raw,
    entry,
    sourceIndex: index,
    penaltyEligible: index >= excluded,
    month: monthlyEntryLabel(entry),
    receiptNo: `${entry.id}_${index}`,
    type: String(row.deadlineType || pick(raw, ["유형", "type"]) || "미분류").trim() || "미분류",
    detailType: String(row.deadlineDetailType || pick(raw, ["세부유형", "상세유형", "detailType"]) || "").trim(),
    packageType: String(row.deadlinePackage || pick(raw, ["포장", "포장처", "package"]) || "").trim(),
    brand: String(row.deadlineBrand || pick(raw, ["브랜드", "brand"]) || "").trim(),
    item: item || "미분류",
    cause: String(row.deadlineCause || raw["원인"] || pick(raw, ["cause"]) || "").trim(),
    color,
    quantity,
    amount,
    defect: String(row.deadlineDefect || pick(raw, ["하자상세", "하자상세내용", "하자내역", "defect"]) || "").trim()
  };
}

function monthlyDeadlineMetas() {
  return monthlyDeadlineEntries().flatMap((entry) => {
    const rows = entry.rows || [];
    return rows
      .map((row, index) => monthlyDeadlineRowMeta(entry, row, index))
      .filter(isMonthlyDeadlineDataRow);
  });
}

function isMonthlyDeadlineDataRow(row) {
  const item = String(row.item || "").trim();
  const type = String(row.type || "").trim();
  if (!item || item === "미분류") return false;
  if (/^(제품코드|품목|품목명|부품명|item|code)$/i.test(item)) return false;
  if (/^(유형|구분|형태|type)$/i.test(type)) return false;
  return true;
}

function currentYearDeadlineMonthStats(rows = monthlyDeadlineMetas()) {
  const map = new Map();
  rows.forEach((row) => {
    if (!map.has(row.month)) map.set(row.month, { week: row.month, count: 0, amount: 0, rows: [] });
    const target = map.get(row.month);
    target.count += 1;
    target.amount += row.amount + (row.penaltyEligible ? penaltyPerClaim : 0);
    target.rows.push(row);
  });
  if (!map.size) {
    monthlyDeadlineEntries().forEach((entry) => {
      const month = monthlyEntryLabel(entry);
      if (!month) return;
      if (!map.has(month)) map.set(month, { week: month, count: 0, amount: 0, rows: [] });
      const target = map.get(month);
      target.count += entryCount(entry);
      target.amount += entryAmount(entry);
    });
  }
  return [...map.values()].sort((a, b) => monthNumber(a.week) - monthNumber(b.week));
}

function currentYearLabel() {
  return `${String(new Date().getFullYear()).slice(2)}년`;
}

function niceAxisTicks(maxValue, tickCount = 5) {
  const safeMax = Math.max(Number(maxValue) || 0, 1);
  const rawStep = safeMax / tickCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / magnitude;
  let niceNorm = 10;
  if (norm <= 1) niceNorm = 1;
  else if (norm <= 2) niceNorm = 2;
  else if (norm <= 5) niceNorm = 5;
  const step = niceNorm * magnitude;
  const niceMax = Math.ceil(safeMax / step) * step;
  const ticks = [];
  for (let value = 0; value <= niceMax + step / 2; value += step) ticks.push(Math.round(value));
  return { ticks, niceMax: niceMax || step };
}

function monthlyDefectBarChartMarkup(months) {
  const width = 640, height = 220, padLeft = 56, padRight = 14, padTop = 26, padBottom = 30;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const { ticks, niceMax } = niceAxisTicks(Math.max(1, ...months.map((month) => month.count)));
  const slot = months.length ? innerW / months.length : innerW;
  const barWidth = Math.max(8, slot * 0.6);
  const axis = ticks.map((tick) => {
    const y = padTop + innerH - (tick / niceMax) * innerH;
    return `<line x1="${padLeft}" y1="${y}" x2="${padLeft + innerW}" y2="${y}" class="weekly-axis-grid"></line>` +
      `<text x="${padLeft - 8}" y="${y}" text-anchor="end" dominant-baseline="middle" class="weekly-axis-label">${formatNumber(tick)}</text>`;
  }).join("");
  const bars = months.map((month, index) => {
    const value = Number(month.count || 0);
    const barH = niceMax ? (value / niceMax) * innerH : 0;
    const x = padLeft + index * slot + (slot - barWidth) / 2;
    const y = padTop + innerH - barH;
    const active = month.week === monthlyDefectSelectedMonth;
    return `<g class="weekly-svg-bar-group" onclick="selectMonthlyDefectMonth('${escapeJs(month.week)}')" onmouseenter="window.showBarHoverPie&&window.showBarHoverPie(this,'monthly','${escapeJs(month.week)}',event)" onmouseleave="window.hideBarHoverPie&&window.hideBarHoverPie()">
      <rect x="${x}" y="${y}" width="${barWidth}" height="${Math.max(1, barH)}" rx="3" class="weekly-svg-bar${active ? " active" : ""}"></rect>
      <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" class="weekly-svg-bar-value">${formatNumber(value)}</text>
      <text x="${x + barWidth / 2}" y="${height - 8}" text-anchor="middle" class="weekly-axis-label">${escapeHtml(month.week)}</text>
    </g>`;
  }).join("");
  return `<div class="weekly-svg-chart">
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="월별 발생 수량 그래프">
      ${axis}
      ${bars}
    </svg>
  </div>`;
}

function monthlyDefectLineChartMarkup(months, field, labelFormatter, ariaLabel, axisFormatter) {
  const width = 640, height = 220, padLeft = 56, padRight = 14, padTop = 26, padBottom = 30;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const { ticks, niceMax } = niceAxisTicks(Math.max(1, ...months.map((month) => Number(month[field] || 0))));
  const step = months.length > 1 ? innerW / (months.length - 1) : 0;
  const points = months.map((month, index) => {
    const x = padLeft + index * step;
    const value = Number(month[field] || 0);
    const y = padTop + innerH - (niceMax ? (value / niceMax) * innerH : 0);
    return { ...month, value, x, y };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${padLeft},${padTop + innerH} ${line} ${padLeft + innerW},${padTop + innerH}`;
  const axis = ticks.map((tick) => {
    const y = padTop + innerH - (tick / niceMax) * innerH;
    const label = axisFormatter ? axisFormatter(tick) : formatNumber(tick);
    return `<line x1="${padLeft}" y1="${y}" x2="${padLeft + innerW}" y2="${y}" class="weekly-axis-grid"></line>` +
      `<text x="${padLeft - 8}" y="${y}" text-anchor="end" dominant-baseline="middle" class="weekly-axis-label">${label}</text>`;
  }).join("");
  return `<div class="weekly-line-chart">
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${escapeHtml(ariaLabel)}">
      ${axis}
      <polygon class="weekly-line-area" points="${area}"></polygon>
      <polyline class="weekly-line" points="${line}"></polyline>
      ${points.map((point) => `
        <g>
          <circle class="${point.week === monthlyDefectSelectedMonth ? "active" : ""}" cx="${point.x}" cy="${point.y}" r="4.5" onclick="selectMonthlyDefectMonth('${escapeJs(point.week)}')"></circle>
          <text x="${point.x}" y="${point.y - 10}" text-anchor="middle">${labelFormatter(point.value)}</text>
          <text class="weekly-line-label" x="${point.x}" y="${height - 8}" text-anchor="middle" onclick="selectMonthlyDefectMonth('${escapeJs(point.week)}')">${escapeHtml(point.week)}</text>
        </g>
      `).join("")}
    </svg>
  </div>`;
}

function monthlyDefectDetailMarkup(details) {
  if (!details.length) return `<div class="weekly-empty-message">표시할 상세 데이터가 없습니다.</div>`;
  return `<div class="weekly-detail-panel">
    <h3>월별 마감 상세 현황${monthlyDefectSelectedMonth ? `<span>${escapeHtml(monthlyDefectSelectedMonth)} 기준</span>` : ""}</h3>
    <div class="weekly-detail-list">
      ${details.map((type, index) => `
        <div class="weekly-detail-block">
          <button class="weekly-detail-row" type="button" onclick="toggleMonthlyDefectType('${escapeJs(type.label)}')">
            <span class="weekly-rank">${index + 1}</span>
            <strong>${escapeHtml(type.label)}</strong>
            <em>${formatNumber(type.count)}건</em>
            <b>${formatNumber(type.amount)}원</b>
            <i class="weekly-chevron">${type.label === weeklyExpandedType ? "▲" : "▼"}</i>
          </button>
          ${type.label === weeklyExpandedType ? `<div class="weekly-drill-list">
            ${type.items.map((item, itemIndex) => `<div class="weekly-type-row">
              <span>${itemIndex + 1}</span>
              <strong>${escapeHtml(item.displayLabel)}</strong>
              <em>${formatNumber(item.quantity)}건</em>
              <b>${formatNumber(item.amount)}원</b>
            </div>`).join("")}
          </div>` : ""}
        </div>
      `).join("")}
    </div>
  </div>`;
}

function selectMonthlyDefectMonth(month) {
  monthlyDefectSelectedMonth = monthlyDefectSelectedMonth === month ? "" : month;
  weeklyExpandedType = "";
  renderMonthDefect();
}

function openMonthlyDefectTypePopup(month) {
  if (monthlyDefectSelectedMonth === month) {
    selectMonthlyDefectMonth(month);
    return;
  }
  monthlyDefectSelectedMonth = month;
  weeklyExpandedType = "";
  renderMonthDefect();
  const items = monthlyTypeDetails(monthlyDefectScopedRows(monthlyDeadlineMetas())).map((item) => ({ label: item.label, value: item.count }));
  openTypePiePopup(`${month} 유형별 현황`, items);
}

function toggleMonthlyDefectType(label) {
  weeklyExpandedType = weeklyExpandedType === label ? "" : label;
  renderMonthDefect();
}

function monthlyDefectScopedRows(rows) {
  return monthlyDefectSelectedMonth ? rows.filter((row) => row.month === monthlyDefectSelectedMonth) : rows;
}

function monthlyTypeDetails(rows) {
  const map = new Map();
  rows.forEach((row) => {
    if (!map.has(row.type)) map.set(row.type, { label: row.type, rows: [] });
    map.get(row.type).rows.push(row);
  });
  return [...map.values()]
    .map((item) => {
      const count = item.rows.length;
      const amountBase = item.rows.reduce((sum, row) => sum + row.amount, 0);
      return {
        ...item,
        count,
        amount: amountBase + monthlyPenaltyCount(item.rows) * penaltyPerClaim,
        items: monthlyTopClaimItems(item.rows, 0)
      };
    })
    .sort((a, b) => b.count - a.count || b.amount - a.amount || a.label.localeCompare(b.label, "ko", { numeric: true }));
}

function monthlyTopClaimItems(rows, limit = 10, options = {}) {
  const map = new Map();
  rows.forEach((row) => {
    if (options.hideMaterial && isMaterialType(row.type)) return;
    const key = weeklyItemKey(row.item, row.color);
    if (!map.has(key)) {
      map.set(key, {
        key,
        label: row.item,
        color: row.color,
        displayLabel: weeklyItemDisplayLabel(row.item, row.color),
        quantity: 0,
        amountBase: 0,
        rows: []
      });
    }
    const target = map.get(key);
    target.quantity += row.quantity;
    target.amountBase += row.amount;
    target.rows.push(row);
  });
  return [...map.values()]
    .map((item) => ({ ...item, count: item.rows.length, amount: item.amountBase + monthlyPenaltyCount(item.rows) * penaltyPerClaim }))
    .sort((a, b) => b.count - a.count || b.amount - a.amount || a.displayLabel.localeCompare(b.displayLabel, "ko", { numeric: true }))
    .slice(0, limit || undefined);
}

function isMaterialType(value) {
  return String(value || "").replace(/\s+/g, "").includes("자재");
}

function monthlyPenaltyCount(rows) {
  return (rows || []).filter((row) => row.penaltyEligible !== false).length;
}

function isMaterialType(value) {
  const text = String(value || "").replace(/\s+/g, "");
  return text.includes("자재") || text.includes("?먯옱");
}

function monthlyTopItemsInlineMarkup(items) {
  if (!items.length) return "";
  return `<div class="weekly-kpi-tags">
    ${items.map((item) => `<button type="button" onclick="openMonthlyItemPopup('${escapeJs(item.key)}')">${escapeHtml(item.displayLabel)} <b>${formatNumber(item.count)}건</b></button>`).join("")}
  </div>`;
}

function openMonthlyItemPopup(itemKey) {
  const item = monthlyTopClaimItems(monthlyDefectScopedRows(monthlyDeadlineMetas()), 0, { hideMaterial: true }).find((entry) => entry.key === itemKey);
  openMonthlyItemsPopup([itemKey], `월하자현황 / 주요 클레임 품목: ${item?.displayLabel || itemKey}`, itemKey);
}

function openMonthlyTopItemsPopup() {
  const keys = monthlyTopClaimItems(monthlyDefectScopedRows(monthlyDeadlineMetas()), 10, { hideMaterial: true }).map((item) => item.key);
  openMonthlyItemsPopup(keys, "월하자현황 / 주요 클레임 품목 TOP 10", "");
}

function openMonthlyItemsPopup(itemKeys, titlePrefix, downloadLabel = "") {
  const rows = monthlyItemAggregateRows(itemKeys);
  const title = `${titlePrefix} (${rows.length}건)`;
  const labelJson = JSON.stringify(downloadLabel || itemKeys).replace(/</g, "\\u003c");
  const popup = window.open("", `monthlyItem_${Date.now()}`, "popup=yes,width=900,height=700,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
  if (!popup) return;
  popup.document.write(`<!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          body{font-family:"Malgun Gothic","Segoe UI",Arial,sans-serif;margin:18px;color:#0f172a;font-size:13px}
          h1{font-size:20px;margin:0 0 8px}
          .toolbar{display:flex;gap:8px;margin:12px 0 14px}
          button{height:34px;padding:0 12px;border:1px solid #b9c7d8;border-radius:6px;background:#fff;font-weight:800;cursor:pointer}
          table{width:100%;border-collapse:collapse;font-size:13px}
          th,td{border:1px solid #d9e2ec;padding:8px;text-align:center;vertical-align:middle}
          th{background:#eef1f4;font-weight:900}
          td.left{text-align:left}
          .meta{color:#475569;font-size:13px;margin-bottom:4px}
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <div class="meta">표시 열: 순번, 제품코드, 색상, 건수합계, 금액합계</div>
        <div class="toolbar">
          <button onclick='window.opener && window.opener.downloadMonthlyItemExcel(${labelJson})'>이력 엑셀 다운로드</button>
          <button onclick='window.opener && window.opener.downloadMonthlyItemOriginalExcel(${labelJson})'>엑셀 다운로드(원본형식)</button>
          <button onclick='window.opener && window.opener.downloadMonthlyItemDefectDetailExcel(${labelJson})'>엑셀 다운로드(하자상세)</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>순번</th>
              <th>제품코드</th>
              <th>색상</th>
              <th>건수합계</th>
              <th>금액합계</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `<tr>
              <td>${row.순번}</td>
              <td class="left">${escapeHtml(row.제품코드)}</td>
              <td class="left">${escapeHtml(row.색상)}</td>
              <td>${formatNumber(row.건수합계)}건</td>
              <td>₩ ${formatNumber(row.금액합계)}</td>
            </tr>`).join("") || `<tr><td colspan="5">표시할 데이터가 없습니다.</td></tr>`}
          </tbody>
        </table>
      </body>
    </html>`);
  popup.document.close();
  attachEscToClose(popup);
}

function monthlyItemPopupRows(itemKeyOrKeys) {
  return monthlyItemPopupMetas(itemKeyOrKeys).map((meta) => ({
    브랜드: meta.brand,
    제품코드: meta.item,
    색상: meta.color,
    수량: meta.quantity,
    유형: meta.type,
    하자상세: meta.defect,
    원인처: meta.packageType || meta.detailType || ""
  }));
}

function monthlyItemPopupMetas(itemKeyOrKeys) {
  const orderedKeys = (Array.isArray(itemKeyOrKeys) ? itemKeyOrKeys : [itemKeyOrKeys]).filter(Boolean);
  const keys = new Set(orderedKeys);
  const orderMap = new Map(orderedKeys.map((key, index) => [key, index]));
  return monthlyDefectScopedRows(monthlyDeadlineMetas())
    .filter((row) => !keys.size || keys.has(weeklyItemKey(row.item, row.color)))
    .sort((a, b) =>
      (orderMap.get(weeklyItemKey(a.item, a.color)) ?? 999) - (orderMap.get(weeklyItemKey(b.item, b.color)) ?? 999) ||
      b.quantity - a.quantity ||
      weeklyItemDisplayLabel(a.item, a.color).localeCompare(weeklyItemDisplayLabel(b.item, b.color), "ko", { numeric: true })
    );
}

function monthlyItemAggregateRows(itemKeyOrKeys) {
  const metas = monthlyItemPopupMetas(itemKeyOrKeys);
  const map = new Map();
  metas.forEach((meta) => {
    const key = [meta.item, meta.color].join("||");
    if (!map.has(key)) map.set(key, { 제품코드: meta.item, 색상: meta.color, 건수합계: 0, amountBase: 0, penaltyCount: 0 });
    const target = map.get(key);
    target.건수합계 += 1;
    target.amountBase += meta.amount;
    if (meta.penaltyEligible !== false) target.penaltyCount += 1;
  });
  return [...map.values()]
    .map((item) => ({ 제품코드: item.제품코드, 색상: item.색상, 건수합계: item.건수합계, 금액합계: item.amountBase + item.penaltyCount * penaltyPerClaim }))
    .sort((a, b) => b.건수합계 - a.건수합계 || String(a.제품코드).localeCompare(String(b.제품코드), "ko", { numeric: true }))
    .map((row, index) => ({ 순번: index + 1, ...row }));
}

function downloadMonthlyItemExcel(itemKeyOrKeys) {
  const rows = monthlyItemAggregateRows(itemKeyOrKeys);
  if (!rows.length) {
    alert("다운로드할 품목 데이터가 없습니다.");
    return;
  }
  const headers = ["순번", "제품코드", "색상", "건수합계", "금액합계"];
  const name = Array.isArray(itemKeyOrKeys) ? "TOP10" : itemKeyOrKeys;
  if (window.XLSX) {
    const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "월하자현황");
    XLSX.writeFile(workbook, `월하자현황_${safeFileName(name)}.xlsx`);
    return;
  }
  downloadText(`월하자현황_${safeFileName(name)}.csv`, toCsv(rows), "text/csv;charset=utf-8");
}

function downloadMonthlyItemDefectDetailExcel(itemKeyOrKeys) {
  const rows = monthlyItemPopupRows(itemKeyOrKeys);
  if (!rows.length) {
    alert("다운로드할 품목 데이터가 없습니다.");
    return;
  }
  const headers = ["브랜드", "제품코드", "색상", "수량", "유형", "하자상세", "원인처"];
  const name = Array.isArray(itemKeyOrKeys) ? "TOP10_하자상세" : `${itemKeyOrKeys}_하자상세`;
  if (window.XLSX) {
    const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "하자상세");
    XLSX.writeFile(workbook, `월하자현황_${safeFileName(name)}.xlsx`);
    return;
  }
  downloadText(`월하자현황_${safeFileName(name)}.csv`, toCsv(rows), "text/csv;charset=utf-8");
}

function downloadMonthlyItemOriginalExcel(itemKeyOrKeys) {
  const metas = monthlyItemPopupMetas(itemKeyOrKeys);
  if (!metas.length) {
    alert("다운로드할 원본 데이터가 없습니다.");
    return;
  }
  const rows = metas.map((meta) => originalWeeklyRow(meta.row));
  const name = Array.isArray(itemKeyOrKeys) ? "TOP10_원본" : `${itemKeyOrKeys}_원본`;
  if (window.XLSX) {
    const headers = originalWeeklyHeaders(metas.map((meta) => meta.row));
    const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "원본");
    XLSX.writeFile(workbook, `월하자현황_${safeFileName(name)}.xlsx`);
    return;
  }
  downloadText(`월하자현황_${safeFileName(name)}.csv`, toCsv(rows), "text/csv;charset=utf-8");
}

function monthlyLineDetails(rows) {
  const map = new Map();
  rows.forEach((row) => {
    const label = monthlyLineLabel(row);
    if (!map.has(label)) map.set(label, { label, rows: [] });
    map.get(label).rows.push(row);
  });
  const preferred = ["1라인", "4라인", "7라인", "외주", "구매", "VN", "미분류"];
  return [...map.values()]
    .map((item) => {
      const count = item.rows.length;
      const amountBase = item.rows.reduce((sum, row) => sum + row.amount, 0);
      return {
        ...item,
        count,
        amount: amountBase + monthlyPenaltyCount(item.rows) * penaltyPerClaim,
        types: monthlyTypeDetails(item.rows)
      };
    })
    .sort((a, b) => {
      const ai = preferred.indexOf(a.label);
      const bi = preferred.indexOf(b.label);
      if (ai !== bi) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      return b.count - a.count || b.amount - a.amount || a.label.localeCompare(b.label, "ko", { numeric: true });
    });
}

function monthlyLineLabel(row) {
  const text = `${row.packageType || ""} ${row.detailType || ""}`.replace(/\s+/g, "");
  if (text.includes("구매")) return "구매";
  if (text.includes("외주")) return "외주";
  if (text.includes("7라인")) return "7라인";
  if (text.includes("3라인") || text.includes("4라인")) return "4라인";
  if (text.includes("1라인")) return "1라인";
  return row.packageType || row.detailType || "미분류";
}

function monthlyDefectDetailMarkup(details) {
  if (!details.length) return `<div class="weekly-empty-message">표시할 상세 데이터가 없습니다.</div>`;
  return `<div class="weekly-detail-panel">
    <h3>월별 마감 상세 현황${monthlyDefectSelectedMonth ? `<span>${escapeHtml(monthlyDefectSelectedMonth)} 기준</span>` : ""}</h3>
    <div class="weekly-detail-list">
      ${details.map((line, index) => `
        <div class="weekly-detail-block">
          <button class="weekly-detail-row" type="button" onclick="toggleMonthlyLine('${escapeJs(line.label)}')">
            <span class="weekly-rank">${index + 1}</span>
            <strong>${escapeHtml(line.label)}</strong>
            <em>${formatNumber(line.count)}건</em>
            <b>${formatNumber(line.amount)}원</b>
            <i class="weekly-chevron">${line.label === monthlyExpandedLine ? "접기" : "펼치기"}</i>
          </button>
          ${line.label === monthlyExpandedLine ? monthlyTypeRowsMarkup(line.types, line.label) : ""}
        </div>
      `).join("")}
    </div>
  </div>`;
}

function selectMonthlyDefectMonth(month) {
  monthlyDefectSelectedMonth = monthlyDefectSelectedMonth === month ? "" : month;
  monthlyExpandedLine = "";
  monthlyExpandedType = "";
  renderMonthDefect();
}

function openMonthlyDefectTypePopup(month) {
  if (monthlyDefectSelectedMonth === month) {
    selectMonthlyDefectMonth(month);
    return;
  }
  monthlyDefectSelectedMonth = month;
  monthlyExpandedLine = "";
  monthlyExpandedType = "";
  renderMonthDefect();
  const items = monthlyTypeDetails(monthlyDefectScopedRows(monthlyDeadlineMetas())).map((item) => ({ label: item.label, value: item.count }));
  openTypePiePopup(`${month} 유형별 현황`, items);
}

function toggleMonthlyLine(label) {
  monthlyExpandedLine = monthlyExpandedLine === label ? "" : label;
  monthlyExpandedType = "";
  renderMonthDefect();
}

function toggleMonthlyType(lineLabel, typeLabel) {
  const key = `${lineLabel}||${typeLabel}`;
  monthlyExpandedType = monthlyExpandedType === key ? "" : key;
  renderMonthDefect();
}

function monthlyTypeRowsMarkup(types, lineLabel) {
  if (!types.length) return "";
  return `<div class="weekly-drill-list">
    ${types.map((type) => {
      const key = `${lineLabel}||${type.label}`;
      return `<div class="weekly-type-block">
        <button class="weekly-type-row" type="button" onclick="toggleMonthlyType('${escapeJs(lineLabel)}', '${escapeJs(type.label)}')">
          <span>유형</span>
          <strong>${escapeHtml(type.label)}</strong>
          <em>${formatNumber(type.count)}건</em>
          <b>${formatNumber(type.amount)}원</b>
          <i>${monthlyExpandedType === key ? "접기" : "펼치기"}</i>
        </button>
        ${monthlyExpandedType === key ? monthlyItemRowsMarkup(type.items) : ""}
      </div>`;
    }).join("")}
  </div>`;
}

// Final override: display prior-month totals even when older saved data kept the
// month in legacy total/week/day keys such as m6Total.
function summaryDisplayValue(row, key) {
  const meta = currentSummaryMeta();
  const monthMatch = String(key).match(/^m(\d{1,2})$/);
  if (!monthMatch || Number(monthMatch[1]) >= meta.currentMonth) return row[key];
  const value = splitSummaryValue(row[key]);
  if (value.hasValue && value.main > 0) return row[key];
  const fallback = summaryMonthFallbackValue(row, Number(monthMatch[1]));
  return fallback > 0 ? fallback : row[key];
}

function summaryRowCells(row) {
  const keys = summaryDynamicKeys();
  const todayKey = currentSummaryDayKey();
  return keys.map((key) => basicCell(summaryDisplayValue(row, key), row.category !== "PPM" && key === todayKey)).join("");
}

function claimSummaryWeekGroups(year, month) {
  const lastDay = new Date(year, month, 0).getDate();
  const weeks = [];
  let current = [];
  for (let day = 1; day <= lastDay; day += 1) {
    const date = new Date(year, month - 1, day);
    const weekday = date.getDay();
    if (weekday === 0 || weekday === 6) continue;
    if (current.length && weekday === 1) {
      weeks.push(current);
      current = [];
    }
    current.push(date);
  }
  if (current.length) weeks.push(current);
  if (weeks.length > 1 && weeks[0].length <= 2) {
    weeks[1] = [...weeks[0], ...weeks[1]];
    weeks.shift();
  }
  if (weeks.length > 1 && weeks[weeks.length - 1].length <= 2) {
    weeks[weeks.length - 2] = [...weeks[weeks.length - 2], ...weeks[weeks.length - 1]];
    weeks.pop();
  }
  return weeks;
}

function buildClaimSummaryMeta(latestDate) {
  const base = latestDate || new Date();
  const currentYear = base.getFullYear();
  const currentMonth = base.getMonth() + 1;
  const groups = claimSummaryWeekGroups(currentYear, currentMonth);
  let currentGroupIndex = groups.findIndex((group) => group.some((date) => dateStamp(date) === dateStamp(base)));
  if (currentGroupIndex < 0) currentGroupIndex = Math.max(0, groups.length - 1);
  const currentGroup = groups[currentGroupIndex] || weekdaysForDate(base);
  return {
    currentYear,
    currentMonth,
    monthLabel: `${currentMonth}월`,
    preMonths: Array.from({ length: Math.max(0, currentMonth - 1) }, (_, index) => index + 1),
    postMonths: Array.from({ length: Math.max(0, 12 - currentMonth) }, (_, index) => currentMonth + 1 + index),
    preWeeks: groups.slice(0, currentGroupIndex).map((group, index) => ({
      key: `w${index + 1}`,
      label: `${index + 1}주`,
      dates: group
    })),
    currentWeekLabel: `${currentGroupIndex + 1}주`,
    dayColumns: currentGroup.map((date) => ({
      key: summaryDateKey(date),
      label: `${date.getMonth() + 1}/${date.getDate()}`,
      date
    })),
    monthTotalKey: `m${currentMonth}Total`
  };
}

function currentSummaryMeta() {
  return state.summaryMeta || buildClaimSummaryMeta(new Date());
}

function currentSummaryDayKey() {
  const today = new Date();
  const meta = currentSummaryMeta();
  const key = summaryDateKey(today);
  return meta.dayColumns.some((column) => column.key === key) ? key : "";
}

function renderSummary() {
  const table = document.getElementById("summaryTable");
  if (!table) return;
  const meta = currentSummaryMeta();
  const keys = summaryDynamicKeys(meta);
  const beforeMonthHeaders = meta.preMonths.map((month) => `<th rowspan="3">${month}월</th>`).join("");
  const afterMonthHeaders = meta.postMonths.map((month) => `<th rowspan="3">${month}월</th>`).join("");
  const preWeekHeaders = meta.preWeeks.map((week) => `<th rowspan="2">${escapeHtml(week.label)}</th>`).join("");
  const dayHeaders = meta.dayColumns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const currentColspan = meta.preWeeks.length + meta.dayColumns.length + 1;

  table.innerHTML = `
    <colgroup>
      <col class="summary-col-category" />
      ${keys.map((key) => `<col class="${key === "prevTotal" || key === "prevAvg" ? "summary-col-prev" : key === "total" || key === "avg" ? "summary-col-total" : "summary-col-month"}" />`).join("")}
    </colgroup>
    <thead>
      <tr>
        <th class="category" rowspan="3">구분</th>
        <th colspan="2">25년</th>
        ${beforeMonthHeaders}
        <th colspan="${currentColspan}">${escapeHtml(meta.monthLabel)}</th>
        ${afterMonthHeaders}
        <th rowspan="3">합계</th>
        <th rowspan="3">월<br />평균</th>
      </tr>
      <tr>
        <th rowspan="2">합계</th>
        <th rowspan="2">월<br />평균</th>
        ${preWeekHeaders}
        <th colspan="${Math.max(1, meta.dayColumns.length)}">${escapeHtml(meta.currentWeekLabel)}</th>
        <th rowspan="2">합계</th>
      </tr>
      <tr>
        ${dayHeaders || "<th>-</th>"}
      </tr>
    </thead>
    <tbody>
      ${state.summary.length ? state.summary.map((row) => {
        const categoryText = String(row.category || "");
        const rowClass = categoryText === "계" || categoryText.includes("계") ? "sum-row" : categoryText === "PPM" ? "ppm-row" : "";
        return `
          <tr class="${rowClass}">
            <th class="side-head">${escapeHtml(row.category)}</th>
            ${summaryRowCells(row)}
          </tr>`;
      }).join("") : document.getElementById("emptyState").innerHTML}
    </tbody>`;
}

function summaryRowCells(row) {
  const keys = summaryDynamicKeys();
  if (String(row.category || "") === "PPM") {
    return keys.map((key) => basicCell(row[key])).join("");
  }
  const todayKey = currentSummaryDayKey();
  return keys.map((key) => basicCell(row[key], key === todayKey)).join("");
}

// Final dynamic claim-summary renderer. Keep this after the legacy 6월 renderer so
// the current month from "접수내역 (금월데이터)" controls the header and columns.
function currentSummaryDayKey() {
  const today = new Date();
  const meta = currentSummaryMeta();
  const key = summaryDateKey(today);
  return meta.dayColumns.some((column) => column.key === key) ? key : "";
}

function renderSummary() {
  const table = document.getElementById("summaryTable");
  if (!table) return;
  const meta = currentSummaryMeta();
  const keys = summaryDynamicKeys(meta);
  const beforeMonthHeaders = meta.preMonths.map((month) => `<th rowspan="3">${month}월</th>`).join("");
  const afterMonthHeaders = meta.postMonths.map((month) => `<th rowspan="3">${month}월</th>`).join("");
  const preWeekHeaders = meta.preWeeks.map((week) => `<th rowspan="2">${escapeHtml(week.label)}</th>`).join("");
  const dayHeaders = meta.dayColumns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const currentColspan = meta.preWeeks.length + meta.dayColumns.length + 1;

  table.innerHTML = `
    <colgroup>
      <col class="summary-col-category" />
      ${keys.map((key) => `<col class="${key === "prevTotal" || key === "prevAvg" ? "summary-col-prev" : key === "total" || key === "avg" ? "summary-col-total" : "summary-col-month"}" />`).join("")}
    </colgroup>
    <thead>
      <tr>
        <th class="category" rowspan="3">구분</th>
        <th colspan="2">25년</th>
        ${beforeMonthHeaders}
        <th colspan="${currentColspan}">${escapeHtml(meta.monthLabel)}</th>
        ${afterMonthHeaders}
        <th rowspan="3">합계</th>
        <th rowspan="3">월<br />평균</th>
      </tr>
      <tr>
        <th rowspan="2">합계</th>
        <th rowspan="2">월<br />평균</th>
        ${preWeekHeaders}
        <th colspan="${Math.max(1, meta.dayColumns.length)}">${escapeHtml(meta.currentWeekLabel)}</th>
        <th rowspan="2">합계</th>
      </tr>
      <tr>
        ${dayHeaders || "<th>-</th>"}
      </tr>
    </thead>
    <tbody>
      ${state.summary.length ? state.summary.map((row) => `
        <tr class="${row.category === "계" ? "sum-row" : row.category === "PPM" ? "ppm-row" : ""}">
          <th class="side-head">${escapeHtml(row.category)}</th>
          ${summaryRowCells(row)}
        </tr>
      `).join("") : document.getElementById("emptyState").innerHTML}
    </tbody>`;
}

function summaryRowCells(row) {
  const keys = summaryDynamicKeys();
  if (row.category === "PPM") {
    return keys.map((key) => basicCell(row[key])).join("");
  }
  const todayKey = currentSummaryDayKey();
  return keys.map((key) => basicCell(row[key], key === todayKey)).join("");
}

function summaryDateKey(date) {
  return `d${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
}

function claimSummaryWeekGroups(year, month) {
  const lastDay = new Date(year, month, 0).getDate();
  const weeks = [];
  let current = [];
  for (let day = 1; day <= lastDay; day += 1) {
    const date = new Date(year, month - 1, day);
    const weekday = date.getDay();
    if (weekday === 0 || weekday === 6) continue;
    if (current.length && weekday === 1) {
      weeks.push(current);
      current = [];
    }
    current.push(date);
  }
  if (current.length) weeks.push(current);
  if (weeks.length > 1 && weeks[0].length <= 2) {
    weeks[1] = [...weeks[0], ...weeks[1]];
    weeks.shift();
  }
  if (weeks.length > 1 && weeks[weeks.length - 1].length <= 2) {
    weeks[weeks.length - 2] = [...weeks[weeks.length - 2], ...weeks[weeks.length - 1]];
    weeks.pop();
  }
  return weeks;
}

function buildClaimSummaryMeta(latestDate) {
  const base = latestDate || new Date();
  const currentYear = base.getFullYear();
  const currentMonth = base.getMonth() + 1;
  const groups = claimSummaryWeekGroups(currentYear, currentMonth);
  let currentGroupIndex = groups.findIndex((group) => group.some((date) => dateStamp(date) === dateStamp(base)));
  if (currentGroupIndex < 0) currentGroupIndex = Math.max(0, groups.length - 1);
  const preWeeks = groups.slice(0, currentGroupIndex).map((group, index) => ({
    key: `w${index + 1}`,
    label: `${index + 1}주`,
    dates: group
  }));
  const currentGroup = groups[currentGroupIndex] || weekdaysForDate(base);
  return {
    currentYear,
    currentMonth,
    monthLabel: `${currentMonth}월`,
    preMonths: Array.from({ length: Math.max(0, currentMonth - 1) }, (_, index) => index + 1),
    postMonths: Array.from({ length: Math.max(0, 12 - currentMonth) }, (_, index) => currentMonth + 1 + index),
    preWeeks,
    currentWeekLabel: `${currentGroupIndex + 1}주`,
    dayColumns: currentGroup.map((date) => ({
      key: summaryDateKey(date),
      label: `${date.getMonth() + 1}/${date.getDate()}`,
      date
    })),
    monthTotalKey: `m${currentMonth}Total`
  };
}

function currentSummaryMeta() {
  return state.summaryMeta || buildClaimSummaryMeta(new Date());
}

function receiptClaimCategory(row) {
  const pendingFlag = pick(row, ["미결구분", "미결 구분", "시공미결", "시공 미결", "미결"]);
  if (String(pendingFlag).trim() === "0") return "시공미결";
  const type = pick(row, ["유형", "구분", "분류", "type"]);
  if (/취급|감성/.test(String(type))) return "감성/취급";
  return "고객불만";
}

function blankSummaryBucket(category) {
  return {
    category,
    prevTotal: 0,
    prevAvg: 0,
    total: 0,
    avg: 0,
    __months: new Set()
  };
}

function addClaimCount(bucket, date, currentMonth, meta = currentSummaryMeta()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (year === 2025) {
    bucket.prevTotal += 1;
    return;
  }
  if (year !== meta.currentYear) return;

  bucket.total += 1;
  bucket.__months.add(month);
  const monthKey = `m${month}`;
  if (month !== currentMonth) {
    bucket[monthKey] = numeric(bucket[monthKey]) + 1;
    return;
  }

  bucket[meta.monthTotalKey] = numeric(bucket[meta.monthTotalKey]) + 1;
  const stamp = dateStamp(date);
  const preWeek = meta.preWeeks.find((week) => week.dates.some((day) => dateStamp(day) === stamp));
  if (preWeek) {
    bucket[preWeek.key] = numeric(bucket[preWeek.key]) + 1;
    return;
  }
  const dayColumn = meta.dayColumns.find((column) => dateStamp(column.date) === stamp);
  if (dayColumn) bucket[dayColumn.key] = numeric(bucket[dayColumn.key]) + 1;
}

function deriveClaimSummaryFromSources(historyEntries, currentEntries = []) {
  const categoryOrder = ["시공미결", "고객불만", "감성/취급"];
  const today = new Date();
  const currentDatedRows = collectDatedReceiptRows(currentEntries);
  const latestCurrentDate = currentDatedRows
    .map((item) => item.date)
    .sort((a, b) => b - a)[0] || today;
  const currentYear = latestCurrentDate.getFullYear();
  const currentMonth = latestCurrentDate.getMonth() + 1;
  state.summaryMeta = buildClaimSummaryMeta(latestCurrentDate);

  const buckets = Object.fromEntries(categoryOrder.map((category) => [category, blankSummaryBucket(category)]));
  const historyRows = collectDatedReceiptRows(historyEntries).filter(({ date }) => {
    if (date.getFullYear() === 2025) return true;
    if (date.getFullYear() !== currentYear) return false;
    return date.getMonth() + 1 < currentMonth;
  });
  const currentRows = currentDatedRows.filter(({ date }) => date.getFullYear() === currentYear && date.getMonth() + 1 === currentMonth);

  [...historyRows, ...currentRows].forEach(({ row, date }) => {
    const category = receiptClaimCategory(row);
    if (!buckets[category]) buckets[category] = blankSummaryBucket(category);
    addClaimCount(buckets[category], date, currentMonth, state.summaryMeta);
  });

  const rawRowsByCategory = categoryOrder.map((category) => buckets[category]);
  const rowsByCategory = rawRowsByCategory.map((bucket) => finalizeSummaryBucket(bucket, { latestDate: latestCurrentDate, currentMonth }));
  rowsByCategory.push(finalizeSummaryBucket(sumSummaryBuckets("계", rawRowsByCategory), { latestDate: latestCurrentDate, currentMonth }));
  rowsByCategory.push(ppmSummaryRow());
  return rowsByCategory;
}

function fixedSummaryTargets(category) {
  const text = String(category || "");
  if (text.includes("고객불만")) return { daily: 3, monthTotal: 50, futureMonth: 50, total: 600, avg: 50 };
  if (text === "계" || text.includes("계")) return { daily: 3, monthTotal: 50, futureMonth: 50, total: 600, avg: 50 };
  return { daily: 0, monthTotal: 0, futureMonth: 0, total: 0, avg: 0 };
}

function summaryDynamicKeys(meta = currentSummaryMeta()) {
  return [
    "prevTotal",
    "prevAvg",
    ...meta.preMonths.map((month) => `m${month}`),
    ...meta.preWeeks.map((week) => week.key),
    ...meta.dayColumns.map((day) => day.key),
    meta.monthTotalKey,
    ...meta.postMonths.map((month) => `m${month}`),
    "total",
    "avg"
  ];
}

function finalizeSummaryBucket(bucket, context = {}) {
  const meta = currentSummaryMeta();
  const result = { ...bucket };
  delete result.__months;
  result.prevAvg = result.prevTotal ? Math.round(result.prevTotal / 12) : 0;
  const monthCount = bucket.__months?.size || 0;
  result.avg = monthCount ? Math.round(result.total / monthCount) : 0;
  applyFixedTargetValues(result, context);
  summaryDynamicKeys(meta).forEach((key) => {
    if (result[key] === undefined || result[key] === 0) {
      result[key] = key.startsWith("d") ? targetCell(0, fixedSummaryTargets(result.category).daily, false) : 0;
    }
  });
  return result;
}

function applyFixedTargetValues(row, context = {}) {
  const meta = currentSummaryMeta();
  const targets = fixedSummaryTargets(row.category);
  meta.dayColumns.forEach((column) => {
    const showMain = shouldShowDailyMain(column.date, context.latestDate, meta.currentMonth) || numeric(row[column.key]) > 0;
    row[column.key] = targetCell(row[column.key], targets.daily, showMain);
  });
  row[meta.monthTotalKey] = targetCell(row[meta.monthTotalKey], targets.monthTotal, true);
  meta.postMonths.forEach((month) => {
    const key = `m${month}`;
    row[key] = targetCell(row[key], targets.futureMonth, numeric(row[key]) > 0);
  });
  row.total = targetCell(row.total, targets.total, true);
  row.avg = targetCell(row.avg, targets.avg, true);
  return row;
}

function shouldShowDailyMain(date, latestDate, currentMonth) {
  if (!latestDate || date.getMonth() + 1 !== currentMonth) return false;
  return dateStamp(date) <= dateStamp(latestDate);
}

function sumSummaryBuckets(category, rows) {
  const bucket = blankSummaryBucket(category);
  summaryDynamicKeys().forEach((key) => {
    if (!(key in bucket)) bucket[key] = 0;
  });
  rows.forEach((row) => {
    summaryDynamicKeys().forEach((key) => {
      bucket[key] += splitSummaryValue(row[key]).main;
    });
    if (row.__months) row.__months.forEach((month) => bucket.__months.add(month));
  });
  return bucket;
}

function ppmSummaryRow() {
  const fixed = {
    category: "PPM",
    prevTotal: 1011,
    prevAvg: "",
    m1: 865,
    m2: 955,
    m3: 1139,
    m4: 1325,
    m5: 964,
    m6: 903,
    m6Total: 903,
    avg: 1037
  };
  return {
    category: "PPM",
    ...Object.fromEntries(summaryDynamicKeys().map((key) => [key, fixed[key] ?? "-"]))
  };
}

function currentSummaryDayKey() {
  const today = new Date();
  const meta = currentSummaryMeta();
  const key = summaryDateKey(today);
  return meta.dayColumns.some((column) => column.key === key) ? key : "";
}

function renderSummary() {
  const table = document.getElementById("summaryTable");
  const meta = currentSummaryMeta();
  const beforeMonthHeaders = meta.preMonths.map((month) => `<th rowspan="3">${month}월</th>`).join("");
  const afterMonthHeaders = meta.postMonths.map((month) => `<th rowspan="3">${month}월</th>`).join("");
  const preWeekHeaders = meta.preWeeks.map((week) => `<th rowspan="2">${escapeHtml(week.label)}</th>`).join("");
  const dayHeaders = meta.dayColumns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const currentColspan = meta.preWeeks.length + meta.dayColumns.length + 1;
  const keys = summaryDynamicKeys(meta);
  table.innerHTML = `
    <colgroup>
      <col class="summary-col-category" />
      ${keys.map((key) => `<col class="${key === "prevTotal" || key === "prevAvg" ? "summary-col-prev" : key === "total" || key === "avg" ? "summary-col-total" : "summary-col-month"}" />`).join("")}
    </colgroup>
    <thead>
      <tr>
        <th class="category" rowspan="3">구분</th>
        <th colspan="2">25년</th>
        ${beforeMonthHeaders}
        <th colspan="${currentColspan}">${escapeHtml(meta.monthLabel)}</th>
        ${afterMonthHeaders}
        <th rowspan="3">합계</th>
        <th rowspan="3">월<br />평균</th>
      </tr>
      <tr>
        <th rowspan="2">합계</th>
        <th rowspan="2">월<br />평균</th>
        ${preWeekHeaders}
        <th colspan="${Math.max(1, meta.dayColumns.length)}">${escapeHtml(meta.currentWeekLabel)}</th>
        <th rowspan="2">합계</th>
      </tr>
      <tr>
        ${dayHeaders || "<th>-</th>"}
      </tr>
    </thead>
    <tbody>
      ${state.summary.length ? state.summary.map((row) => `
        <tr class="${row.category === "계" ? "sum-row" : row.category === "PPM" ? "ppm-row" : ""}">
          <th class="side-head">${escapeHtml(row.category)}</th>
          ${summaryRowCells(row)}
        </tr>
      `).join("") : document.getElementById("emptyState").innerHTML}
    </tbody>`;
}

function summaryRowCells(row) {
  const keys = summaryDynamicKeys();
  if (row.category === "PPM") {
    return keys.map((key) => basicCell(row[key])).join("");
  }
  const todayKey = currentSummaryDayKey();
  return keys.map((key) => basicCell(row[key], key === todayKey)).join("");
}

function monthlyItemRowsMarkup(items) {
  if (!items.length) return "";
  return `<div class="weekly-item-list">
    ${items.map((item, index) => `
      <div class="weekly-item-row">
        <span>${index + 1}</span>
        <strong>${escapeHtml(item.displayLabel)}</strong>
        <em>${formatNumber(item.quantity)}건</em>
        <b>${formatNumber(item.amount)}원</b>
      </div>
    `).join("")}
  </div>`;
}

function monthlyLineDetails(rows) {
  const map = new Map();
  rows.forEach((row) => {
    const label = monthlyLineLabel(row);
    if (!map.has(label)) map.set(label, { label, rows: [] });
    map.get(label).rows.push(row);
  });
  const preferred = ["1라인", "4라인", "7라인", "외주", "구매", "VN", "미분류"];
  return [...map.values()]
    .map((item) => {
      const count = item.rows.length;
      const amountBase = item.rows.reduce((sum, row) => sum + row.amount, 0);
      return {
        ...item,
        count,
        amount: amountBase + monthlyPenaltyCount(item.rows) * penaltyPerClaim,
        types: monthlyTypeDetails(item.rows)
      };
    })
    .sort((a, b) => {
      const ai = preferred.indexOf(a.label);
      const bi = preferred.indexOf(b.label);
      if (ai !== bi) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      return b.count - a.count || b.amount - a.amount || a.label.localeCompare(b.label, "ko", { numeric: true });
    });
}

function monthlyLineLabel(row) {
  const text = `${row.cause || ""} ${row.packageType || ""} ${row.detailType || ""}`.replace(/\s+/g, "");
  if (text.includes("구매")) return "구매";
  if (text.includes("외주")) return "외주";
  if (text.includes("VN")) return "VN";
  if (text.includes("7라인")) return "7라인";
  if (text.includes("3라인") || text.includes("4라인")) return "4라인";
  if (text.includes("1라인")) return "1라인";
  return row.packageType || row.cause || row.detailType || "미분류";
}

function monthlyDefectDetailMarkup(details) {
  if (!details.length) {
    return `<section class="weekly-detail-panel"><h3>월별 마감 상세 현황</h3><div class="weekly-empty-message">표시할 데이터가 없습니다.</div></section>`;
  }
  const colors = ["#ef4444", "#f59f00", "#9c36b5", "#1c7ed6", "#0ca678", "#7950f2", "#f06595", "#495057", "#15aabf", "#e67700"];
  return `<section class="weekly-detail-panel">
    <h3>월별 마감 상세 현황${monthlyDefectSelectedMonth ? ` <span>${escapeHtml(monthlyDefectSelectedMonth)} 기준</span>` : ""}</h3>
    <div class="weekly-detail-list">
      ${details.map((line, index) => `
        <div class="weekly-detail-block" style="--accent:${colors[index % colors.length]}">
          <button class="weekly-detail-row" type="button" onclick="toggleMonthlyLine('${escapeJs(line.label)}')">
            <span class="weekly-rank">${index + 1}</span>
            <strong>${escapeHtml(line.label)}</strong>
            <em>${formatNumber(line.count)}건</em>
            <b>${formatNumber(line.amount)}원</b>
            <span class="weekly-chevron">${monthlyExpandedLine === line.label ? "▴" : "▾"}</span>
          </button>
          ${monthlyExpandedLine === line.label ? monthlyTypeRowsMarkup(line.types, line.label) : ""}
        </div>
      `).join("")}
    </div>
  </section>`;
}

function monthlyTypeRowsMarkup(types, lineLabel) {
  if (!types.length) return "";
  return `<div class="weekly-drill-list">
    ${types.map((type) => {
      const key = `${lineLabel}||${type.label}`;
      return `<div class="weekly-type-block">
        <button class="weekly-type-row" type="button" onclick="toggleMonthlyType('${escapeJs(lineLabel)}', '${escapeJs(type.label)}')">
          <span>유형</span>
          <strong>${escapeHtml(type.label)}</strong>
          <em>${formatNumber(type.count)}건</em>
          <b>${formatNumber(type.amount)}원</b>
          <i>${monthlyExpandedType === key ? "▴" : "▾"}</i>
        </button>
        ${monthlyExpandedType === key ? monthlyItemRowsMarkup(type.items) : ""}
      </div>`;
    }).join("")}
  </div>`;
}

function monthlyItemRowsMarkup(items) {
  if (!items.length) return "";
  return `<div class="weekly-item-list">
    ${items.map((item, index) => `
      <div class="weekly-item-row">
        <span>${index + 1}</span>
        <strong>${escapeHtml(item.displayLabel)}</strong>
        <em>${formatNumber(item.quantity)}건</em>
        <b>${formatNumber(item.amount)}원</b>
      </div>
    `).join("")}
  </div>`;
}

function openTypePiePopup(title, items) {
  const popup = window.open("", `typePie_${Date.now()}`, "popup=yes,width=760,height=620,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
  if (!popup) return;
  popup.document.write(`<!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          body{margin:0;color:#111827;background:#f7f7f7;font-family:"Malgun Gothic","Segoe UI",Arial,sans-serif}
          header{position:sticky;top:0;padding:18px 22px;border-bottom:1px solid #dde3ea;background:#fff}
          h1{margin:0;font-size:24px}
          .close{position:absolute;right:16px;top:10px;border:0;background:#fff;font-size:24px;font-weight:900;cursor:pointer}
          .body{display:flex;gap:30px;align-items:center;justify-content:center;padding:28px}
          .donut{position:relative;width:280px;height:280px;flex:0 0 280px;border-radius:50%;background:${weeklyPieGradient(items)}}
          .donut:after{position:absolute;inset:78px;border-radius:50%;background:#fff;content:""}
          .donut b{position:absolute;z-index:1;inset:0;display:flex;align-items:center;justify-content:center;font-size:32px}
          .legend{display:grid;gap:10px;min-width:280px;max-width:360px}
          .legend div{display:grid;grid-template-columns:12px minmax(160px,1fr) auto;gap:8px;align-items:center}
          .legend i{width:12px;height:12px;border-radius:50%}
          .legend span{font-weight:900;line-height:1.25;white-space:normal}
          .legend em{font-style:normal;color:#4b5563;font-weight:800}
          .empty{padding:40px;text-align:center;font-weight:900;color:#687482}
        </style>
      </head>
      <body>
        <header><button class="close" onclick="window.close()">×</button><h1>${escapeHtml(title)}</h1></header>
        ${items.length ? `<div class="body">
          <div class="donut"><b>${formatNumber(items.reduce((sum, item) => sum + item.value, 0))}건</b></div>
          <div class="legend">${weeklyPieLegendMarkup(items)}</div>
        </div>` : `<div class="empty">표시할 유형 데이터가 없습니다.</div>`}
      </body>
    </html>`);
  popup.document.close();
  attachEscToClose(popup);
}

function queueMonthlyStatusReload() {
  if (restoreMonthlyStatusSnapshot()) {
    setTimeout(() => renderAll("저장된 월간현황 자료를 표시합니다."), 0);
    return true;
  }
  if (monthlyStatusAutoLoading) return true;
  if (monthlyStatusAutoFailed) return false;
  const group = savedLinkGroupsCache.find((item) => (item.groupKey || item.sourceUrl) === "monthly-status");
  if (!group?.sourceUrl) return false;
  monthlyStatusAutoLoading = true;
  state.uploads = state.uploads.filter((entry) => entry.groupKey !== "monthly-status");
  restoreSavedGroup(group)
    .then(() => {
      monthlyStatusAutoLoading = false;
      renderAll("월간현황 자료를 다시 불러왔습니다.");
      saveDashboardState();
    })
    .catch(() => {
      monthlyStatusAutoLoading = false;
      monthlyStatusAutoFailed = true;
      if (restoreMonthlyStatusSnapshot()) renderAll("저장된 월간현황 자료를 표시합니다.");
      else renderWeeklyDefect();
    });
  return true;
}

function monthlyStatusRows() {
  const rows = state.uploads
    .filter((entry) => entry.kind === "monthlyStatus")
    .flatMap((entry) => entry.rows || [])
    .map((row) => row.__raw || row)
    .filter((row) => Object.values(row || {}).some((value) => String(value ?? "").trim()));
  const firstSummarySheet = rows.find((row) => /종합/.test(String(row.__sheetTitle || "")))?.__sheetTitle || "";
  return firstSummarySheet ? rows.filter((row) => row.__sheetTitle === firstSummarySheet) : rows;
}

function weeklySummaryTableMarkup(rows) {
  const weeks = ["1주", "2주", "3주", "4주", "5주"];
  const data = Object.fromEntries(weeks.map((week) => [week, { week, receiptNos: new Set(), amountBase: 0, items: new Map() }]));
  rows.forEach((row, index) => {
    const week = weeklyPeriod(row);
    if (!week || !data[week]) return;
    const receiptNo = weeklyReceiptNo(row);
    data[week].receiptNos.add(receiptNo || `row_${index}`);
    data[week].amountBase += weeklyAmount(row);
    const item = weeklyMainItem(row);
    data[week].items.set(item, (data[week].items.get(item) || 0) + 1);
  });
  return `
    <div class="table-wrap">
      <table class="dashboard-table weekly-summary-table">
        <thead>
          <tr>
            <th>주차</th>
            <th>클레임건수</th>
            <th>총 손실 금액</th>
            <th>주요 클레임 품목 TOP 5</th>
          </tr>
        </thead>
        <tbody>
          ${weeks.map((week) => {
            const stat = data[week];
            const count = stat.receiptNos.size;
            const amount = stat.amountBase + count * penaltyPerClaim;
            return `<tr>
              <th class="side-head">${week}</th>
              <td class="number">${formatNumber(count)}건</td>
              <td class="number">${formatNumber(amount)}원</td>
              <td class="weekly-top-items">${weeklyTopItemsMarkup(stat.items)}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>`;
}

function weeklyTopItemsMarkup(items) {
  const top = [...items.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }))
    .slice(0, 5);
  if (!top.length) return "-";
  return top.map((item) => `<span>${escapeHtml(item.label)} <b>${formatNumber(item.count)}건</b></span>`).join("");
}

function weeklyDashboardStats(rows) {
  const metas = weeklyDashboardMetas(rows);
  const weeks = ["1주", "2주", "3주", "4주", "5주"].map((week) => weeklyAggregate(week, metas.filter((row) => row.week === week)));
  const month = monthlyStatusMonth(rows);
  if (weeklySelectedWeek && !weeks.some((week) => week.week === weeklySelectedWeek && week.count)) weeklySelectedWeek = "";
  const scopedRows = weeklySelectedWeek ? metas.filter((row) => row.week === weeklySelectedWeek) : metas;
  const topItems = weeklyTopClaimItems(scopedRows);
  const total = weeklyAggregate("전체", scopedRows);
  return {
    monthLabel: month ? `${month}월` : "월간",
    weeks,
    details: weeklyLineDetails(scopedRows),
    totalCount: total.count,
    totalAmount: total.amount,
    topItem: topItems[0] || { key: "-", label: "-", displayLabel: "-", quantity: 0, amount: 0 },
    topItems,
    sourcePie: weeklySourcePieItems(metas)
  };
}

const WEEKLY_SOURCE_PIE_ORDER = ["1라인", "4라인", "7라인", "외주", "구매", "기타"];
const WEEKLY_SOURCE_PIE_COLOR_MAP = { "1라인": "#1f73e8", "4라인": "#e53935", "7라인": "#23a455", "외주": "#f59f00", "구매": "#7950f2", "기타": "#495057" };

function weeklySourcePieItems(rows) {
  const counts = new Map();
  rows.forEach((row) => {
    const label = WEEKLY_SOURCE_PIE_ORDER.includes(row.line) ? row.line : "기타";
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return WEEKLY_SOURCE_PIE_ORDER.map((label) => ({ label, value: counts.get(label) || 0 })).filter((item) => item.value > 0);
}

function weeklySourcePieMarkup(items) {
  if (!items.length) return `<div class="weekly-empty-message">표시할 데이터가 없습니다.</div>`;
  const total = items.reduce((sum, item) => sum + item.value, 0);
  let start = 0;
  const gradient = items.map((item) => {
    const percent = total ? (item.value / total) * 100 : 0;
    const end = start + percent;
    const color = WEEKLY_SOURCE_PIE_COLOR_MAP[item.label] || "#495057";
    const segment = `${color} ${start.toFixed(3)}% ${end.toFixed(3)}%`;
    start = end;
    return segment;
  }).join(", ");
  return `
    <div class="daily-pie-row">
      <div class="daily-donut" style="background: conic-gradient(${gradient});"><b>${formatNumber(total)}</b><span>건</span></div>
      <div class="daily-pie-legend">
        ${items.map((item) => {
          const pct = total ? Math.round((item.value / total) * 1000) / 10 : 0;
          return `<div><i style="background:${WEEKLY_SOURCE_PIE_COLOR_MAP[item.label] || "#495057"}"></i><span>${escapeHtml(item.label)}</span><em>${formatNumber(item.value)}건 (${pct}%)</em></div>`;
        }).join("")}
      </div>
    </div>`;
}

function weeklyDashboardMetas(rows) {
  return rows
    .map(weeklyRowMeta)
    .filter((row) => row.week && !row.excludedCause && isWeeklyDataRow(row));
}

function weeklyRowMeta(row, index) {
  const receiptNo = weeklyReceiptNo(row) || `row_${index}`;
  const cause = weeklyCause(row);
  return {
    row,
    week: weeklyPeriod(row),
    receiptNo,
    amount: weeklyAmount(row),
    line: weeklyLineGroup(row) || "미분류",
    type: weeklyRType(row),
    item: weeklyItemName(row),
    color: weeklyItemColor(row),
    quantity: weeklyItemQuantity(row),
    cause,
    excludedCause: isExcludedWeeklyCause(cause)
  };
}

function isExcludedWeeklyCause(cause) {
  const normalized = String(cause || "").replace(/\s+/g, "").toUpperCase();
  return normalized === "미회수" || normalized === "VN" || normalized === ".";
}

function isWeeklyDataRow(meta) {
  const rowIndex = Number(meta.row?.__rowIndex);
  if (Number.isFinite(rowIndex) && rowIndex < 2) return false;
  const receipt = String(meta.receiptNo || "").replace(/\s+/g, "");
  const item = String(meta.item || "").replace(/\s+/g, "");
  if (!receipt || !item || item === "미분류") return false;
  if (/^(접수번호|번호|NO|No)$/i.test(receipt)) return false;
  if (/^(제품코드|품목|품명|부품명)$/i.test(item)) return false;
  return true;
}

function weeklyAggregate(label, rows) {
  const receipts = new Set();
  let amountBase = 0;
  rows.forEach((row) => {
    receipts.add(row.receiptNo);
    amountBase += row.amount;
  });
  return {
    week: label,
    count: receipts.size,
    amount: amountBase + receipts.size * penaltyPerClaim,
    rows
  };
}

function weeklyTopClaimItems(rows, limit = 5) {
  const map = new Map();
  rows.forEach((row) => {
    const key = weeklyItemKey(row.item, row.color);
    if (!map.has(key)) map.set(key, { key, label: row.item, color: row.color, displayLabel: weeklyItemDisplayLabel(row.item, row.color), quantity: 0, amount: 0, receipts: new Set() });
    const target = map.get(key);
    target.quantity += row.quantity;
    target.amount += row.amount;
    target.receipts.add(row.receiptNo);
  });
  return [...map.values()]
    .map((item) => ({ ...item, count: item.receipts.size, amount: item.amount + item.receipts.size * penaltyPerClaim }))
    .sort((a, b) => b.count - a.count || b.amount - a.amount || a.displayLabel.localeCompare(b.displayLabel, "ko", { numeric: true }))
    .slice(0, limit || undefined);
}

function weeklyItemKey(item, color) {
  return `${String(item || "").trim()}||${String(color || "").trim()}`;
}

function weeklyItemDisplayLabel(item, color) {
  const product = String(item || "미분류").trim() || "미분류";
  const shade = String(color || "").trim();
  return shade ? `${product} / ${shade}` : product;
}

function weeklyTopItemsInlineMarkup(items) {
  if (!items.length) return "";
  return `<div class="weekly-kpi-tags">
    ${items.map((item) => `<button type="button" onclick="openWeeklyItemPopup('${escapeJs(item.key)}')">${escapeHtml(item.displayLabel)} <b>${formatNumber(item.count)}건</b></button>`).join("")}
  </div>`;
}

function weeklyLineDetails(rows) {
  const order = ["1라인", "4라인", "7라인", "외주", "구매", "VN", "미분류"];
  const map = new Map();
  rows.forEach((row) => {
    if (!map.has(row.line)) map.set(row.line, { label: row.line, rows: [] });
    map.get(row.line).rows.push(row);
  });
  return [...map.values()]
    .map((item) => ({ ...item, ...weeklyAggregate(item.label, item.rows), types: weeklyTypeDetails(item.rows) }))
    .sort((a, b) => {
      const ai = order.indexOf(a.label);
      const bi = order.indexOf(b.label);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi) || b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true });
    });
}

function weeklyTypeDetails(rows) {
  const map = new Map();
  rows.forEach((row) => {
    if (!map.has(row.type)) map.set(row.type, { label: row.type, rows: [] });
    map.get(row.type).rows.push(row);
  });
  return [...map.values()]
    .map((item) => ({ ...item, ...weeklyAggregate(item.label, item.rows), causes: weeklyCauseSummary(item.rows), items: weeklyItemDetails(item.rows) }))
    .sort((a, b) => b.count - a.count || b.amount - a.amount || a.label.localeCompare(b.label, "ko", { numeric: true }));
}

function weeklyItemDetails(rows) {
  return weeklyTopClaimItems(rows, 0);
}

function weeklyCauseSummary(rows) {
  const map = new Map();
  rows.forEach((row) => {
    const label = row.cause || row.line || "미분류";
    map.set(label, (map.get(label) || 0) + 1);
  });
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }))
    .slice(0, 3);
}

function monthlyStatusMonth(rows) {
  const title = rows.map((row) => row.__documentTitle || row.__sheetTitle || "").find(Boolean) || "";
  const titleMatch = String(title).match(/(\d{1,2})\s*월/);
  if (titleMatch) return Number(titleMatch[1]);
  for (const row of rows) {
    const date = parseDateFromText(String(pick(row, ["등록일", "접수일자", "Q"]) || cellAt(row, 16) || "")) || findDateInRow(row);
    if (date) return date.getMonth() + 1;
  }
  return "";
}

function weeklyBarChartMarkup(weeks) {
  const width = 640, height = 220, padLeft = 56, padRight = 14, padTop = 26, padBottom = 30;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const { ticks, niceMax } = niceAxisTicks(Math.max(1, ...weeks.map((week) => week.count)));
  const slot = weeks.length ? innerW / weeks.length : innerW;
  const barWidth = Math.max(8, slot * 0.6);
  const axis = ticks.map((tick) => {
    const y = padTop + innerH - (tick / niceMax) * innerH;
    return `<line x1="${padLeft}" y1="${y}" x2="${padLeft + innerW}" y2="${y}" class="weekly-axis-grid"></line>` +
      `<text x="${padLeft - 8}" y="${y}" text-anchor="end" dominant-baseline="middle" class="weekly-axis-label">${formatNumber(tick)}</text>`;
  }).join("");
  const bars = weeks.map((week, index) => {
    const value = Number(week.count || 0);
    const barH = niceMax ? (value / niceMax) * innerH : 0;
    const x = padLeft + index * slot + (slot - barWidth) / 2;
    const y = padTop + innerH - barH;
    const active = week.week === weeklySelectedWeek;
    return `<g class="weekly-svg-bar-group" onclick="selectWeeklyWeek('${escapeJs(week.week)}')" onmouseenter="window.showBarHoverPie&&window.showBarHoverPie(this,'weekly','${escapeJs(week.week)}',event)" onmouseleave="window.hideBarHoverPie&&window.hideBarHoverPie()">
      <rect x="${x}" y="${y}" width="${barWidth}" height="${Math.max(1, barH)}" rx="3" class="weekly-svg-bar${active ? " active" : ""}"></rect>
      <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" class="weekly-svg-bar-value">${formatNumber(value)}</text>
      <text x="${x + barWidth / 2}" y="${height - 8}" text-anchor="middle" class="weekly-axis-label">${escapeHtml(week.week)}</text>
    </g>`;
  }).join("");
  return `<div class="weekly-svg-chart">
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="주별 발생 수량 그래프">
      ${axis}
      ${bars}
    </svg>
  </div>`;
}

function weeklyLineChartMarkup(weeks) {
  return weeklyMetricLineChartMarkup(weeks, "amount", weeklyAmountShort, "주별 손실금액 그래프", (tick) => `${Number((tick / 1000000).toFixed(1))}백만원`);
}

function weeklyMetricLineChartMarkup(weeks, field, labelFormatter, ariaLabel, axisFormatter) {
  const width = 640, height = 220, padLeft = 56, padRight = 14, padTop = 26, padBottom = 30;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const { ticks, niceMax } = niceAxisTicks(Math.max(1, ...weeks.map((week) => Number(week[field] || 0))));
  const step = weeks.length > 1 ? innerW / (weeks.length - 1) : 0;
  const points = weeks.map((week, index) => {
    const x = padLeft + index * step;
    const value = Number(week[field] || 0);
    const y = padTop + innerH - (niceMax ? (value / niceMax) * innerH : 0);
    return { ...week, value, x, y };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${padLeft},${padTop + innerH} ${line} ${padLeft + innerW},${padTop + innerH}`;
  const axis = ticks.map((tick) => {
    const y = padTop + innerH - (tick / niceMax) * innerH;
    const label = axisFormatter ? axisFormatter(tick) : formatNumber(tick);
    return `<line x1="${padLeft}" y1="${y}" x2="${padLeft + innerW}" y2="${y}" class="weekly-axis-grid"></line>` +
      `<text x="${padLeft - 8}" y="${y}" text-anchor="end" dominant-baseline="middle" class="weekly-axis-label">${label}</text>`;
  }).join("");
  return `<div class="weekly-line-chart">
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${escapeHtml(ariaLabel)}">
      ${axis}
      <polygon class="weekly-line-area" points="${area}"></polygon>
      <polyline class="weekly-line" points="${line}"></polyline>
      ${points.map((point) => `
        <g>
          <circle class="${point.week === weeklySelectedWeek ? "active" : ""}" cx="${point.x}" cy="${point.y}" r="4.5" onclick="selectWeeklyWeek('${escapeJs(point.week)}')"></circle>
          <text x="${point.x}" y="${point.y - 10}" text-anchor="middle">${labelFormatter(point.value)}</text>
          <text class="weekly-line-label" x="${point.x}" y="${height - 8}" text-anchor="middle" onclick="selectWeeklyWeek('${escapeJs(point.week)}')">${escapeHtml(point.week)}</text>
        </g>
      `).join("")}
    </svg>
  </div>`;
}

function weeklyAmountShort(amount) {
  if (!amount) return "0";
  return `${(amount / 1000000).toFixed(1)}`;
}

function openWeeklyWeekTypePopup(week) {
  if (weeklySelectedWeek === week) {
    selectWeeklyWeek(week);
    return;
  }
  weeklySelectedWeek = week;
  weeklyExpandedLine = "";
  weeklyExpandedType = "";
  renderWeeklyDefect();
  const items = weeklyTypePieItems(week);
  const title = `${week} 유형별 현황`;
  const popup = window.open("", `weeklyType_${Date.now()}`, "popup=yes,width=760,height=620,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
  if (!popup) return;
  popup.document.write(`<!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          body{margin:0;color:#111827;background:#f7f7f7;font-family:"Malgun Gothic","Segoe UI",Arial,sans-serif}
          header{position:sticky;top:0;padding:18px 22px;border-bottom:1px solid #dde3ea;background:#fff}
          h1{margin:0;font-size:24px}
          .close{position:absolute;right:16px;top:10px;border:0;background:#fff;font-size:24px;font-weight:900;cursor:pointer}
          .body{display:flex;gap:30px;align-items:center;justify-content:center;padding:28px}
          .donut{position:relative;width:280px;height:280px;flex:0 0 280px;border-radius:50%;background:${weeklyPieGradient(items)}}
          .donut:after{position:absolute;inset:78px;border-radius:50%;background:#fff;content:""}
          .donut b{position:absolute;z-index:1;inset:0;display:flex;align-items:center;justify-content:center;font-size:32px}
          .legend{display:grid;gap:10px;min-width:280px;max-width:360px}
          .legend div{display:grid;grid-template-columns:12px minmax(160px,1fr) auto;gap:8px;align-items:center}
          .legend i{width:12px;height:12px;border-radius:50%}
          .legend span{font-weight:900;line-height:1.25;white-space:normal}
          .legend em{font-style:normal;color:#4b5563;font-weight:800}
          .empty{padding:40px;text-align:center;font-weight:900;color:#687482}
        </style>
      </head>
      <body>
        <header><button class="close" onclick="window.close()">×</button><h1>${escapeHtml(title)}</h1></header>
        ${items.length ? `<div class="body">
          <div class="donut"><b>${formatNumber(items.reduce((sum, item) => sum + item.value, 0))}건</b></div>
          <div class="legend">${weeklyPieLegendMarkup(items)}</div>
        </div>` : `<div class="empty">표시할 유형 데이터가 없습니다.</div>`}
      </body>
    </html>`);
  popup.document.close();
  attachEscToClose(popup);
}

function weeklyTypePieItems(week) {
  const map = new Map();
  weeklyDashboardMetas(monthlyStatusRows())
    .filter((row) => row.week === week)
    .forEach((row) => {
      const key = row.type || "미분류";
      if (!map.has(key)) map.set(key, new Set());
      map.get(key).add(row.receiptNo);
    });
  return [...map.entries()]
    .map(([label, receipts]) => ({ label, value: receipts.size }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, "ko", { numeric: true }));
}

function weeklyPieGradient(items) {
  if (!items.length) return "#e5e7eb";
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const colors = weeklyPieColors();
  let start = 0;
  return `conic-gradient(${items.map((item, index) => {
    const end = start + (item.value / total) * 100;
    const segment = `${colors[index % colors.length]} ${start.toFixed(3)}% ${end.toFixed(3)}%`;
    start = end;
    return segment;
  }).join(", ")})`;
}

function weeklyPieLegendMarkup(items) {
  const colors = weeklyPieColors();
  return items.map((item, index) => `
    <div><i style="background:${colors[index % colors.length]}"></i><span>${escapeHtml(item.label)}</span><em>${formatNumber(item.value)}건</em></div>
  `).join("");
}

function weeklyPieColors() {
  return ["#1f73e8", "#f59f00", "#23a455", "#e55353", "#7950f2", "#12b886", "#f06595", "#495057", "#15aabf", "#e67700"];
}

function weeklyDetailDashboardMarkup(details) {
  if (!details.length) {
    return `<section class="weekly-detail-panel"><h3>주별 클레임 상세 현황</h3><div class="weekly-empty-message">표시할 데이터가 없습니다.</div></section>`;
  }
  const colors = ["#ef4444", "#f59f00", "#9c36b5", "#1c7ed6", "#0ca678", "#7950f2", "#f06595", "#495057", "#15aabf", "#e67700"];
  return `<section class="weekly-detail-panel">
    <h3>주별 클레임 상세 현황${weeklySelectedWeek ? ` <span>${escapeHtml(weeklySelectedWeek)} 기준</span>` : ""}</h3>
    <div class="weekly-detail-list">
      ${details.map((item, index) => `
        <div class="weekly-detail-block" style="--accent:${colors[index % colors.length]}">
          <button class="weekly-detail-row" type="button" onclick="toggleWeeklyLine('${escapeJs(item.label)}')">
            <span class="weekly-rank">${index + 1}</span>
            <strong>${escapeHtml(item.label)}</strong>
            <em>${formatNumber(item.count)}건</em>
            <b>${formatNumber(item.amount)}원</b>
            <span class="weekly-chevron">${weeklyExpandedLine === item.label ? "▴" : "▾"}</span>
          </button>
          ${weeklyExpandedLine === item.label ? weeklyTypeRowsMarkup(item.types, item.label) : ""}
        </div>
      `).join("")}
    </div>
  </section>`;
}

function weeklyTypeRowsMarkup(types, lineLabel) {
  if (!types.length) return "";
  return `<div class="weekly-drill-list">
    ${types.map((type) => {
      const key = `${lineLabel}||${type.label}`;
      return `<div class="weekly-type-block">
        <button class="weekly-type-row" type="button" onclick="toggleWeeklyType('${escapeJs(key)}')">
          <span>R열 유형</span>
          <strong>${escapeHtml(type.label)}${weeklyCauseTagsMarkup(type.causes)}</strong>
          <em>${formatNumber(type.count)}건</em>
          <b>${formatNumber(type.amount)}원</b>
          <i>${weeklyExpandedType === key ? "▴" : "▾"}</i>
        </button>
        ${weeklyExpandedType === key ? weeklyItemRowsMarkup(type.items) : ""}
      </div>`;
    }).join("")}
  </div>`;
}

function weeklyCauseTagsMarkup(causes) {
  if (!causes?.length) return "";
  return `<small class="weekly-cause-tags">${causes.map((cause) => `<span>${escapeHtml(cause.label)} ${formatNumber(cause.count)}건</span>`).join("")}</small>`;
}

function weeklyItemRowsMarkup(items) {
  if (!items.length) return "";
  return `<div class="weekly-item-list">
    ${items.map((item, index) => `
      <div class="weekly-item-row">
        <span>${index + 1}</span>
        <strong>${escapeHtml(item.label)}</strong>
        <em>${formatNumber(item.quantity)}건</em>
        <b>${formatNumber(item.amount)}원</b>
      </div>
    `).join("")}
  </div>`;
}

function openWeeklyItemPopup(itemKey) {
  const item = weeklyTopClaimItems(weeklyScopedMetas(), 0).find((entry) => entry.key === itemKey);
  openWeeklyItemsPopup([itemKey], `주하자현황 / 주요 클레임 품목: ${item?.displayLabel || itemKey}`, itemKey);
}

function openWeeklyTopItemsPopup() {
  const keys = weeklyTopClaimItems(weeklyScopedMetas()).map((item) => item.key);
  openWeeklyItemsPopup(keys, "주하자현황 / 주요 클레임 품목 TOP 5", "");
}

function weeklyScopedMetas() {
  const rows = weeklyDashboardMetas(monthlyStatusRows());
  return weeklySelectedWeek ? rows.filter((row) => row.week === weeklySelectedWeek) : rows;
}

function openWeeklyItemsPopup(itemKeys, titlePrefix, downloadLabel = "") {
  const rows = weeklyItemAggregateRows(itemKeys);
  const title = `${titlePrefix} (${rows.length}건)`;
  const labelJson = JSON.stringify(downloadLabel || itemKeys).replace(/</g, "\\u003c");
  const popup = window.open("", `weeklyItem_${Date.now()}`, "popup=yes,width=900,height=700,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
  if (!popup) return;
  popup.document.write(`<!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          body{font-family:"Malgun Gothic","Segoe UI",Arial,sans-serif;margin:18px;color:#0f172a;font-size:13px}
          h1{font-size:20px;margin:0 0 8px}
          .toolbar{display:flex;gap:8px;margin:12px 0 14px}
          button{height:34px;padding:0 12px;border:1px solid #b9c7d8;border-radius:6px;background:#fff;font-weight:800;cursor:pointer}
          table{width:100%;border-collapse:collapse;font-size:13px}
          th,td{border:1px solid #d9e2ec;padding:8px;text-align:center;vertical-align:middle}
          th{background:#eef1f4;font-weight:900}
          td.left{text-align:left}
          .meta{color:#475569;font-size:13px;margin-bottom:4px}
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <div class="meta">표시 열: 순번, 제품코드, 색상, 건수합계, 금액합계</div>
        <div class="toolbar">
          <button onclick='window.opener && window.opener.downloadWeeklyItemExcel(${labelJson})'>이력 엑셀 다운로드</button>
          <button onclick='window.opener && window.opener.downloadWeeklyItemOriginalExcel(${labelJson})'>엑셀 다운로드(원본형식)</button>
          <button onclick='window.opener && window.opener.downloadWeeklyItemDefectDetailExcel(${labelJson})'>엑셀 다운로드(하자상세)</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>순번</th>
              <th>제품코드</th>
              <th>색상</th>
              <th>건수합계</th>
              <th>금액합계</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `<tr>
              <td>${row.순번}</td>
              <td class="left">${escapeHtml(row.제품코드)}</td>
              <td class="left">${escapeHtml(row.색상)}</td>
              <td>${formatNumber(row.건수합계)}건</td>
              <td>₩ ${formatNumber(row.금액합계)}</td>
            </tr>`).join("") || `<tr><td colspan="5">표시할 데이터가 없습니다.</td></tr>`}
          </tbody>
        </table>
      </body>
    </html>`);
  popup.document.close();
  attachEscToClose(popup);
}

function weeklyItemPopupRows(itemKeyOrKeys) {
  return weeklyItemPopupMetas(itemKeyOrKeys)
    .map((meta) => {
      const row = meta.row;
      return {
        브랜드: String(pick(row, ["브랜드"]) || cellAt(row, 1) || "").trim(),
        제품코드: meta.item,
        색상: meta.color,
        수량: meta.quantity,
        유형: meta.type,
        하자상세: weeklyDefectDetail(row),
        원인처: meta.cause || meta.line
      };
    });
}

function weeklyDefectDetail(row) {
  return String(pick(row, ["하자상세", "하자상세내용", "하자내역", "서비스요구내역", "Q"]) || cellAt(row, 16) || "").trim();
}

function weeklyItemAggregateRows(itemKeyOrKeys) {
  const metas = weeklyItemPopupMetas(itemKeyOrKeys);
  const map = new Map();
  metas.forEach((meta) => {
    const key = [meta.item, meta.color].join("||");
    if (!map.has(key)) map.set(key, { 제품코드: meta.item, 색상: meta.color, amountBase: 0, receipts: new Set() });
    const target = map.get(key);
    target.amountBase += meta.amount;
    target.receipts.add(meta.receiptNo);
  });
  return [...map.values()]
    .map((item) => ({ 제품코드: item.제품코드, 색상: item.색상, 건수합계: item.receipts.size, 금액합계: item.amountBase + item.receipts.size * penaltyPerClaim }))
    .sort((a, b) => b.건수합계 - a.건수합계 || String(a.제품코드).localeCompare(String(b.제품코드), "ko", { numeric: true }))
    .map((row, index) => ({ 순번: index + 1, ...row }));
}

function downloadWeeklyItemExcel(itemKeyOrKeys) {
  const rows = weeklyItemAggregateRows(itemKeyOrKeys);
  if (!rows.length) {
    alert("다운로드할 품목 데이터가 없습니다.");
    return;
  }
  const headers = ["순번", "제품코드", "색상", "건수합계", "금액합계"];
  const name = Array.isArray(itemKeyOrKeys) ? "TOP5" : itemKeyOrKeys;
  if (window.XLSX) {
    const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "주하자현황");
    XLSX.writeFile(workbook, `주하자현황_${safeFileName(name)}.xlsx`);
    return;
  }
  downloadText(`주하자현황_${safeFileName(name)}.csv`, toCsv(rows), "text/csv;charset=utf-8");
}

function downloadWeeklyItemDefectDetailExcel(itemKeyOrKeys) {
  const rows = weeklyItemPopupRows(itemKeyOrKeys);
  if (!rows.length) {
    alert("다운로드할 품목 데이터가 없습니다.");
    return;
  }
  const headers = ["브랜드", "제품코드", "색상", "수량", "유형", "하자상세", "원인처"];
  const name = Array.isArray(itemKeyOrKeys) ? "TOP5_하자상세" : `${itemKeyOrKeys}_하자상세`;
  if (window.XLSX) {
    const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "하자상세");
    XLSX.writeFile(workbook, `주하자현황_${safeFileName(name)}.xlsx`);
    return;
  }
  downloadText(`주하자현황_${safeFileName(name)}.csv`, toCsv(rows), "text/csv;charset=utf-8");
}

function downloadWeeklyItemOriginalExcel(itemKeyOrKeys) {
  const metas = weeklyItemPopupMetas(itemKeyOrKeys);
  if (!metas.length) {
    alert("다운로드할 원본 데이터가 없습니다.");
    return;
  }
  const rows = metas.map((meta) => originalWeeklyRow(meta.row));
  const name = Array.isArray(itemKeyOrKeys) ? "TOP5_원본" : `${itemKeyOrKeys}_원본`;
  if (window.XLSX) {
    const headers = originalWeeklyHeaders(metas.map((meta) => meta.row));
    const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "원본");
    XLSX.writeFile(workbook, `주하자현황_${safeFileName(name)}.xlsx`);
    return;
  }
  downloadText(`주하자현황_${safeFileName(name)}.csv`, toCsv(rows), "text/csv;charset=utf-8");
}

function weeklyItemPopupMetas(itemKeyOrKeys) {
  const orderedKeys = (Array.isArray(itemKeyOrKeys) ? itemKeyOrKeys : [itemKeyOrKeys]).filter(Boolean);
  const keys = new Set(orderedKeys);
  const orderMap = new Map(orderedKeys.map((key, index) => [key, index]));
  return weeklyScopedMetas()
    .filter((row) => !keys.size || keys.has(weeklyItemKey(row.item, row.color)))
    .sort((a, b) =>
      (orderMap.get(weeklyItemKey(a.item, a.color)) ?? 999) - (orderMap.get(weeklyItemKey(b.item, b.color)) ?? 999) ||
      b.quantity - a.quantity ||
      weeklyItemDisplayLabel(a.item, a.color).localeCompare(weeklyItemDisplayLabel(b.item, b.color), "ko", { numeric: true }) ||
      String(a.row?.__rowIndex || 0).localeCompare(String(b.row?.__rowIndex || 0), "ko", { numeric: true })
    );
}

function originalWeeklyHeaders(rows) {
  const headers = [];
  const seen = new Set();
  rows.forEach((row) => {
    const rowHeaders = row.__headers?.length ? row.__headers : Object.keys(row).filter((key) => !key.startsWith("__"));
    rowHeaders.forEach((header) => {
      if (String(header).startsWith("__") || seen.has(header)) return;
      seen.add(header);
      headers.push(header);
    });
  });
  return headers;
}

function originalWeeklyRow(row) {
  const output = {};
  const headers = row.__headers?.length ? row.__headers : Object.keys(row).filter((key) => !key.startsWith("__"));
  headers.forEach((header, index) => {
    if (String(header).startsWith("__")) return;
    output[header] = row[header] ?? row.__cells?.[index] ?? "";
  });
  return output;
}

function safeFileName(value) {
  return String(value || "품목").replace(/[\\/:*?"<>|]/g, "_").slice(0, 60);
}

function selectWeeklyWeek(week) {
  weeklySelectedWeek = weeklySelectedWeek === week ? "" : week;
  weeklyExpandedLine = "";
  weeklyExpandedType = "";
  renderWeeklyDefect();
}

function toggleWeeklyLine(label) {
  weeklyExpandedLine = weeklyExpandedLine === label ? "" : label;
  weeklyExpandedType = "";
  renderWeeklyDefect();
}

function toggleWeeklyType(key) {
  weeklyExpandedType = weeklyExpandedType === key ? "" : key;
  renderWeeklyDefect();
}

function weeklyPeriod(row) {
  const weekText = String(pick(row, ["등록일", "주차", "주", "Q"]) || cellAt(row, 16) || "").trim();
  const weekMatch = weekText.match(/([1-5])\s*주/);
  if (weekMatch) return `${weekMatch[1]}주`;
  const date = parseDateFromText(weekText) || findDateInRow(row);
  if (!date) return "";
  const day = date.getDate();
  if (day <= 7) return "1주";
  if (day <= 14) return "2주";
  if (day <= 21) return "3주";
  if (day <= 28) return "4주";
  return "5주";
}

function buildWeeklyDefectRows(rows) {
  const order = ["1라인", "4라인", "7라인", "외주", "구매"];
  const map = new Map();
  rows.forEach((row) => {
    const group = weeklyLineGroup(row);
    if (!group) return;
    const type = weeklyType(row);
    const key = `${group}||${type}`;
    if (!map.has(key)) map.set(key, { group, type, count: 0, amount: 0 });
    const target = map.get(key);
    target.count += weeklyCount(row);
    target.amount += weeklyAmount(row) + penaltyPerClaim;
  });
  return [...map.values()].sort((a, b) =>
    order.indexOf(a.group) - order.indexOf(b.group) ||
    b.count - a.count ||
    a.type.localeCompare(b.type, "ko", { numeric: true })
  );
}

function weeklyDefectRowsMarkup(rows) {
  if (!rows.length) {
    return `<tr><td class="empty-cell" colspan="4">표시할 데이터가 없습니다.</td></tr>`;
  }
  const groups = new Map();
  rows.forEach((row) => {
    if (!groups.has(row.group)) groups.set(row.group, []);
    groups.get(row.group).push(row);
  });
  return [...groups.entries()].map(([group, items]) =>
    items.map((row, index) => `
      <tr>
        ${index === 0 ? `<th class="side-head weekly-group-cell" rowspan="${items.length}">${escapeHtml(group)}</th>` : ""}
        <td>${escapeHtml(row.type)}</td>
        <td class="number">${formatNumber(row.count)}</td>
        <td class="number">${formatNumber(row.amount)}원</td>
      </tr>
    `).join("")
  ).join("");
}

function weeklyLineGroup(row) {
  const text = `${pick(row, ["라인", "원인처", "원인", "구분", "부서", "공정", "발생처"])} ${Object.values(row || {}).join(" ")}`;
  if (/구매/.test(text)) return "구매";
  if (/외주/.test(text)) return "외주";
  if (/7\s*라인|7라인/.test(text)) return "7라인";
  if (/3\s*라인|3라인|4\s*라인|4라인/.test(text)) return "4라인";
  if (/1\s*라인|1라인/.test(text)) return "1라인";
  return "";
}

function weeklyReceiptNo(row) {
  return String(pick(row, ["접수번호", "접수 번호", "접수NO", "접수 No", "번호"]) || cellAt(row, 3) || cellAt(row, 0) || "").trim();
}

function weeklyMainItem(row) {
  return weeklyItemName(row);
}

function weeklyItemName(row) {
  return String(pick(row, ["품목", "품명", "제품명", "클레임품목", "I"]) || cellAt(row, 8) || "미분류").trim() || "미분류";
}

function weeklyItemColor(row) {
  return String(pick(row, ["색상", "컬러", "J"]) || cellAt(row, 9) || "").trim();
}

function weeklyItemQuantity(row) {
  const value = numeric(pick(row, ["수량", "K"]) || cellAt(row, 10));
  return value > 0 ? value : 1;
}

function weeklyRType(row) {
  return String(pick(row, ["유형", "클레임유형", "R"]) || cellAt(row, 17) || "미분류").trim() || "미분류";
}

function weeklyCause(row) {
  return String(pick(row, ["원인", "원인처", "V", "원인구분", "귀책", "발생원인"]) || cellAt(row, 21) || "미분류").trim() || "미분류";
}

function weeklyType(row) {
  return String(pick(row, ["유형", "하자유형", "세부유형", "분류", "구분"]) || "미분류").trim() || "미분류";
}

function weeklyPackage(row) {
  return String(pick(row, ["포장", "포장처", "공정", "라인"]) || "미분류").trim() || "미분류";
}

function weeklyDetailType(row) {
  return String(pick(row, ["세부유형", "상세유형", "하자상세", "하자내역"]) || "미분류").trim() || "미분류";
}

function weeklyCount(row) {
  return 1;
}

function weeklyAmount(row) {
  return numeric(pick(row, ["금액", "비용", "합계", "금액합계", "amount"]) || cellAt(row, 11));
}

function cellAt(row, index) {
  return (row.__cells || [])[index] ?? "";
}

function summarizeBy(rows, keyGetter) {
  const map = new Map();
  rows.forEach((row) => {
    if (!weeklyLineGroup(row)) return;
    const key = keyGetter(row);
    map.set(key, (map.get(key) || 0) + weeklyCount(row));
  });
  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

function weeklyProductColorItems(rows) {
  const map = new Map();
  rows.forEach((row) => {
    if (!weeklyLineGroup(row)) return;
    const code = String(pick(row, ["제품코드", "부품코드", "품번", "코드"]) || "").trim();
    if (!code) return;
    const color = String(pick(row, ["색상", "컬러"]) || "미기재").trim() || "미기재";
    const key = `${code} / ${color}`;
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .filter((item) => item.value >= 2)
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, "ko", { numeric: true }))
    .slice(0, 12);
}

function downloadWeeklyProductColorData() {
  const rows = weeklyProductColorItems(monthlyStatusRows()).map((item, index) => {
    const [code, color] = item.label.split(" / ");
    return { 순번: index + 1, 제품코드: code || "", 색상: color || "", 건수: item.value };
  });
  if (!rows.length) {
    alert("다운로드할 제품코드+색상 자료가 없습니다.");
    return;
  }
  downloadText("weekly_product_color_2plus.csv", toCsv(rows), "text/csv;charset=utf-8");
}

function pieChartMarkup(title, items, idPrefix) {
  return `<div class="weekly-chart"><h3>${escapeHtml(title)}</h3>${pieChartBodyMarkup(title, items)}</div>`;
}

function pieChartBodyMarkup(title, items) {
  if (!items.length) {
    return `<div class="weekly-empty-message">표시할 데이터가 없습니다.</div>`;
  }
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const colors = ["#1f73e8", "#23a455", "#f59f00", "#e55353", "#7950f2", "#12b886", "#f06595", "#495057"];
  let start = 0;
  const gradient = items.map((item, index) => {
    const percent = total ? (item.value / total) * 100 : 0;
    const end = start + percent;
    const segment = `${colors[index % colors.length]} ${start.toFixed(3)}% ${end.toFixed(3)}%`;
    start = end;
    return segment;
  }).join(", ");
  return `
    <div class="weekly-pie-row">
      <div class="weekly-donut" style="background: conic-gradient(${gradient});" role="img" aria-label="${escapeHtml(title)} 원형 그래프">
        <b>${formatNumber(total)}</b><span>건</span>
      </div>
      <div class="weekly-legend">
        ${items.map((item, index) => `
          <div><span style="background:${colors[index % colors.length]}"></span><b>${escapeHtml(item.label)}</b><em>${formatNumber(item.value)}건</em></div>
        `).join("")}
      </div>
    </div>`;
}

function renderFileCards() {
  const holder = document.getElementById("fileCards");
  const toggle = document.getElementById("toggleFileCards");
  const panel = document.querySelector(".file-panel");
  if (toggle) toggle.textContent = "데이터 관리";
  panel?.classList.toggle("is-collapsed", fileCardsCollapsed);
  if (!holder) return;

  if (!state.uploads.length) {
    holder.innerHTML = `<div class="file-empty">업로드된 자료가 없습니다. 샘플 데이터가 표시됩니다.</div>`;
    return;
  }

  if (fileCardsCollapsed) {
    const selected = selectedUploads().length || state.uploads.length;
    holder.innerHTML = `<div class="file-empty">업로드 자료 ${state.uploads.length}개가 숨겨져 있습니다. 현재 ${selected}개 자료 기준으로 표가 표시됩니다.</div>`;
    return;
  }

  holder.innerHTML = uploadGroupsHtml(groupUploads(state.uploads));
}

function groupUploads(entries) {
  const groups = new Map();
  entries.forEach((entry) => {
    const group = groupInfo(entry);
    if (!groups.has(group.key)) groups.set(group.key, { ...group, items: [] });
    groups.get(group.key).items.push(entry);
  });
  return [...groups.values()]
    .map((group) => ({
      ...group,
      items: group.items.sort((a, b) => monthNumber(a.label) - monthNumber(b.label) || a.label.localeCompare(b.label, "ko"))
    }))
    .sort((a, b) => groupSortOrder(a) - groupSortOrder(b) || a.title.localeCompare(b.title, "ko"));
}

function groupSortOrder(group) {
  if (isDeadlineGroup(group)) return Number(groupYear(group) || group.order || 50);
  return Number(group.order ?? 500);
}

function groupInfo(entry) {
  if (entry.groupKey && entry.groupTitle) return { key: entry.groupKey, title: entry.groupTitle, order: entry.order ?? 50 };
  if (entry.kind === "images") return { key: "images", title: "이미지", order: 90 };
  const base = baseFileName(entry.fileName);
  const year = detectYearFromName(base) || defaultYearForKind(entry.kind);
  if (entry.kind === "cost" && year === "25") return { key: "25-deadline", title: "25년 마감자료", order: 25 };
  if (entry.kind === "cost" && year === "26") return { key: "26-deadline", title: "26년 마감자료", order: 26 };
  if (entry.kind === "summary" && year) return { key: `${year}-summary`, title: `${year}년 접수현황`, order: Number(`${year}1`) };
  if (entry.kind === "receiptHistory") return { key: "receipt-history", title: "접수내역(기존데이터)", order: 300 };
  if (entry.kind === "monthlyStatus") return { key: "monthly-status", title: "월간현황 자료", order: 400 };
  if (entry.kind === "details" && year) return { key: `${year}-details`, title: `${year}년 세부내역`, order: Number(`${year}2`) };
  const clean = base.replace(/\.(xls|xlsx|csv|tsv|json|txt)$/i, "") || "업로드 자료";
  return { key: `file-${hashString(base)}`, title: clean, order: 80 };
}

function defaultYearForKind(kind) {
  return kind === "summary" || kind === "details" || kind === "receiptHistory" || kind === "monthlyStatus" ? "26" : null;
}

function baseFileName(fileName) {
  return String(fileName || "").split(" / ")[0];
}

function detectYearFromName(fileName) {
  const clean = String(fileName || "");
  if (/2025|25년|(?<!\d)25\d{4}(?!\d)/.test(clean)) return "25";
  if (/2026|26년|(?<!\d)26\d{4}(?!\d)/.test(clean)) return "26";
  return null;
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < String(value).length; i += 1) {
    hash = ((hash << 5) - hash + String(value).charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function uploadGroupsHtml(groups) {
  return groups.map((group) => `
    <div class="file-group">
      <button class="file-group-title" type="button" onclick="toggleUploadGroup('${group.key}')">
        <span class="group-arrow ${collapsedGroups[group.key] ? "" : "open"}">&gt;</span>
        <span>${escapeHtml(groupDisplayTitle(group))}</span>
        <small>${group.items.length}개</small>
      </button>
      <div class="file-group-cards ${collapsedGroups[group.key] ? "is-collapsed" : ""}">
        ${groupSummaryCardHtml(group)}
        ${group.items.map(uploadCardHtml).join("")}
      </div>
    </div>
  `).join("");
}

function toggleUploadGroup(key) {
  collapsedGroups[key] = !collapsedGroups[key];
  renderFileCards();
}

function groupSummaryCardHtml(group) {
  if (!isDeadlineGroup(group)) return "";
  const year = groupYear(group);
  const selectedItems = group.items.filter((entry) => entry.selected);
  const targets = selectedItems.length ? selectedItems : group.items;
  const count = targets.reduce((sum, entry) => sum + entryCount(entry), 0);
  const amount = targets.reduce((sum, entry) => sum + entryAmount(entry), 0);
  const excluded = targets.reduce((sum, entry) => sum + Number(entry.excluded || 0), 0);
  return `
    <div class="file-card aggregate-card active" onclick="selectUploadGroup('${group.key}')">
      <div class="topline">
        <span class="name">${escapeHtml(year ? `${year}년 종합` : "종합")}</span>
      </div>
      <div class="meta">${escapeHtml(groupDisplayTitle(group))}</div>
      <div class="big-count">${count.toLocaleString()}건</div>
      <div class="amount-line">₩ ${amount.toLocaleString()}</div>
      <div class="exclude-row">
        <span>제외건수</span>
        <b>${excluded.toLocaleString()}건</b>
      </div>
    </div>`;
}

function selectUploadGroup(key) {
  state.uploads.forEach((entry) => {
    if (entry.groupKey === key) entry.selected = true;
  });
  activeUploadId = `group-${key}`;
  renderAll("종합 자료 표시 중");
}

function uploadCardHtml(entry) {
    const count = entryCount(entry);
    const checked = entry.selected ? "checked" : "";
    const active = entry.id === activeUploadId ? "active" : "";
    const max = Math.max(0, count);
    const amount = entryAmount(entry);
    const sourceName = uploadSourceLabel(entry);
    const displayLabel = entryDisplayLabel(entry);
    return `
      <div class="file-card ${active}" onclick="setActiveUpload('${entry.id}')">
        <div class="topline">
          <span class="name" title="${escapeHtml(sourceName || displayLabel)}">${escapeHtml(displayLabel)}</span>
          <div class="card-actions">
            <input type="checkbox" ${checked} onclick="event.stopPropagation();toggleUpload('${entry.id}', this.checked)" />
            <button class="delete-btn" type="button" onclick="event.stopPropagation();deleteUpload('${entry.id}')">삭제</button>
          </div>
        </div>
        <div class="meta">${kindNames[entry.kind]}<span class="count">${count.toLocaleString()}건</span>${escapeHtml(sourceName)}</div>
        ${amount ? `<div class="amount-line">₩ ${amount.toLocaleString()}</div>` : ""}
        <div class="exclude-row" onclick="event.stopPropagation();">
          <span>제외건수</span>
          <input type="number" min="0" max="${max}" value="${Number(entry.excluded || 0)}" onchange="setExcluded('${entry.id}', this.value)" />
          <span>건</span>
        </div>
      </div>`;
}

function entryDisplayLabel(entry) {
  const year = entryYear(entry);
  return year && entry.kind === "cost" && entry.sourceType === "spreadsheet-link"
    ? `${year}년 ${entry.label}`
    : entry.label;
}

function groupDisplayTitle(group) {
  const year = groupYear(group);
  if (year && isDeadlineGroup(group)) {
    return `${year}년 마감자료`;
  }
  return group.title;
}

function entryYear(entry) {
  return detectYearFromName(`${entry.groupTitle || ""} ${entry.sourceSheet || ""} ${entry.fileName || ""} ${entry.sourceUrl || ""}`) ||
    yearFromExistingGroupKey(entry.groupKey);
}

function groupYear(group) {
  if (!isDeadlineGroup(group)) return detectYearFromName(`${group.title || ""} ${group.key || ""}`);
  const fromText = detectYearFromName(`${group.title || ""} ${group.key || ""} ${group.items.map((entry) => `${entry.sourceSheet || ""} ${entry.fileName || ""} ${entry.sourceUrl || ""}`).join(" ")}`);
  if (fromText) return fromText;
  if (group.items.length >= 10) return "25";
  if (group.items.length > 0 && group.items.length < 10) return "26";
  return null;
}

function isDeadlineGroup(group) {
  return group.items?.some((entry) => entry.kind === "cost" && entry.sourceType === "spreadsheet-link");
}

function yearFromExistingGroupKey(key) {
  const match = String(key || "").match(/existing-(25|26)\b/);
  return match ? match[1] : null;
}

function uploadSourceLabel(entry) {
  if (entry.sourceType === "spreadsheet-link") {
    return entry.sourceSheet || sheetNameFromFileName(entry.fileName) || "";
  }
  return entry.fileName || "";
}

function sheetNameFromFileName(fileName) {
  const parts = String(fileName || "").split(" / ");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

function entryCount(entry) {
  if (entry.kind === "images") return (entry.images || []).length;
  return Number(entry.countHint || 0) || (entry.rows || []).length;
}

function entryAmount(entry) {
  if (entry.kind === "images") return 0;
  if (entry.kind === "cost" && entry.sourceType === "spreadsheet-link") {
    const penaltyCount = Math.max(0, entryCount(entry) - Number(entry.excluded || 0));
    return Number(entry.defectAmount || 0) + penaltyCount * penaltyPerClaim;
  }
  return (entry.rows || []).reduce((sum, row) => sum + (numeric(row.monthTotal) || numeric(row.total) || numeric(row.yearTotal)), 0);
}

function setActiveUpload(id) {
  const entry = state.uploads.find((item) => item.id === id);
  if (entry?.kind === "cost" && entry?.sourceType === "spreadsheet-link") {
    state.uploads.forEach((item) => {
      if (item.groupKey === entry.groupKey) item.selected = item.id === id;
    });
  }
  activeUploadId = id;
  renderAll();
  saveDashboardState();
}

function toggleUpload(id, checked) {
  const entry = state.uploads.find((item) => item.id === id);
  if (!entry) return;
  entry.selected = checked;
  if (checked) activeUploadId = id;
  renderAll();
  saveDashboardState();
}

function deleteUpload(id) {
  const entry = state.uploads.find((item) => item.id === id);
  if (!entry) return;
  if (!confirm(`${entry.label} 자료를 삭제할까요?`)) return;
  revokeEntryImages(entry);
  state.uploads = state.uploads.filter((item) => item.id !== id);
  activeUploadId = state.uploads[0]?.id || "sample";
  renderAll("자료 삭제 완료");
  saveDashboardState();
}

function setExcluded(id, value) {
  const entry = state.uploads.find((item) => item.id === id);
  if (!entry) return;
  const count = entryCount(entry);
  entry.excluded = clamp(Number(value || 0), 0, count);
  activeUploadId = id;
  renderAll("제외건수 반영 완료");
  if (typeof renderMonthDefect === "function") renderMonthDefect();
  if (typeof renderWeeklyDefect === "function") renderWeeklyDefect();
  saveDashboardState();
}

function clearSelection() {
  state.uploads.forEach((entry) => {
    entry.selected = false;
  });
  activeUploadId = "sample";
  renderAll("선택 해제됨 · 업로드 전체 자료 표시 중");
  saveDashboardState();
}

function deleteSelectedUploads() {
  const selected = selectedUploads();
  if (!selected.length) {
    alert("삭제할 자료를 체크해 주세요.");
    return;
  }
  if (!confirm(`선택한 ${selected.length}개 자료를 삭제할까요?`)) return;
  const ids = new Set(selected.map((entry) => entry.id));
  selected.forEach(revokeEntryImages);
  state.uploads = state.uploads.filter((entry) => !ids.has(entry.id));
  activeUploadId = state.uploads[0]?.id || "sample";
  renderAll("선택 자료 삭제 완료");
  saveDashboardState();
}

function restoreSample() {
  revokeImages();
  state = {
    cost: structuredClone(sampleState.cost),
    summary: structuredClone(sampleState.summary),
    details: structuredClone(sampleState.details),
    images: [],
    uploads: [],
    costMeta: defaultCostMeta()
  };
  activeUploadId = "sample";
  renderAll("샘플 데이터 표시 중");
  clearSavedDashboardState();
}

function clearAllData() {
  if (!confirm("전체 업로드 자료를 초기화할까요?")) return;
  revokeImages();
  state = { cost: [], summary: [], details: [], images: [], uploads: [], costMeta: defaultCostMeta() };
  activeUploadId = "sample";
  renderFileCards();
  renderCost();
  renderSummary();
  renderDetails();
  document.getElementById("dataStatus").textContent = "데이터 초기화됨";
  clearSavedDashboardState();
  const adminToken = typeof window.__qcdGetAdminToken === "function" ? window.__qcdGetAdminToken() : "";
  fetch("/api/claim-dashboard-state", {
    method: "DELETE",
    headers: adminToken ? { "X-Admin-Token": adminToken } : {}
  }).catch(() => {});
  if (typeof window.__dailyStableReloadV23 === "function") window.__dailyStableReloadV23();
}

function renderCost() {
  const table = document.getElementById("costTable");
  if (!table) return;
  const keys = currentCostKeys();
  const totals = calcCostTotals(state.cost);
  table.innerHTML = `
    <thead>
      <tr>
        <th class="row-head" rowspan="2">구분</th>
        <th colspan="${keys.length + 1}">${escapeHtml(state.costMeta?.monthLabel || "6월")}</th>
        <th rowspan="2">26년 누적</th>
        <th rowspan="2">월 평균</th>
      </tr>
      <tr>
        ${keys.map((key) => `<th>${key}</th>`).join("")}
        <th>${escapeHtml(state.costMeta?.monthLabel || "6월")} 누적</th>
      </tr>
    </thead>
    <tbody>
      ${state.cost.length ? state.cost.map((row) => `
        <tr>
          <th class="row-head">${escapeHtml(row.item)}</th>
          ${keys.map((key) => moneyCell(row[key])).join("")}
          ${moneyCell(row.monthTotal)}
          ${moneyCell(row.yearTotal)}
          ${moneyCell(row.monthAverage)}
        </tr>
      `).join("") : document.getElementById("emptyState").innerHTML}
      <tr class="sum-row">
        <th class="row-head">합계</th>
        ${keys.map((key) => moneyCell(totals[key])).join("")}
        ${moneyCell(totals.monthTotal)}
        ${moneyCell(totals.yearTotal)}
        ${moneyCell(totals.monthAverage)}
      </tr>
    </tbody>`;
}

function calcCostTotals(rows) {
  return [...currentCostKeys(), "monthTotal", "yearTotal", "monthAverage"].reduce((acc, key) => {
    acc[key] = sumCostStats(rows.map((row) => row[key]));
    return acc;
  }, {});
}

function renderSummaryDynamicFinal() {
  const table = document.getElementById("summaryTable");
  if (!table) return;
  const meta = currentSummaryMeta();
  const keys = summaryDynamicKeys(meta);
  const todayKey = (() => {
    const today = new Date();
    const key = summaryDateKey(today);
    return meta.dayColumns.some((column) => column.key === key) ? key : "";
  })();
  const beforeMonthHeaders = meta.preMonths.map((month) => `<th rowspan="3">${month}월</th>`).join("");
  const afterMonthHeaders = meta.postMonths.map((month) => `<th rowspan="3">${month}월</th>`).join("");
  const preWeekHeaders = meta.preWeeks.map((week) => `<th rowspan="2">${escapeHtml(week.label)}</th>`).join("");
  const dayHeaders = meta.dayColumns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const currentColspan = meta.preWeeks.length + meta.dayColumns.length + 1;
  const rowCells = (row) => {
    if (String(row.category || "") === "PPM") return keys.map((key) => basicCell(row[key])).join("");
    return keys.map((key) => basicCell(row[key], key === todayKey)).join("");
  };

  table.innerHTML = `
    <colgroup>
      <col class="summary-col-category" />
      ${keys.map((key) => `<col class="${key === "prevTotal" || key === "prevAvg" ? "summary-col-prev" : key === "total" || key === "avg" ? "summary-col-total" : "summary-col-month"}" />`).join("")}
    </colgroup>
    <thead>
      <tr>
        <th class="category" rowspan="3">구분</th>
        <th colspan="2">25년</th>
        ${beforeMonthHeaders}
        <th colspan="${currentColspan}">${escapeHtml(meta.monthLabel)}</th>
        ${afterMonthHeaders}
        <th rowspan="3">합계</th>
        <th rowspan="3">월<br />평균</th>
      </tr>
      <tr>
        <th rowspan="2">합계</th>
        <th rowspan="2">월<br />평균</th>
        ${preWeekHeaders}
        <th colspan="${Math.max(1, meta.dayColumns.length)}">${escapeHtml(meta.currentWeekLabel)}</th>
        <th rowspan="2">합계</th>
      </tr>
      <tr>
        ${dayHeaders || "<th>-</th>"}
      </tr>
    </thead>
    <tbody>
      ${state.summary.length ? state.summary.map((row) => {
        const categoryText = String(row.category || "");
        const rowClass = categoryText.includes("계") ? "sum-row" : categoryText === "PPM" ? "ppm-row" : "";
        return `
          <tr class="${rowClass}">
            <th class="side-head">${escapeHtml(row.category)}</th>
            ${rowCells(row)}
          </tr>`;
      }).join("") : document.getElementById("emptyState").innerHTML}
    </tbody>`;
}

function renderSummary() {
  renderSummaryDynamicFinal();
  return;
  const table = document.getElementById("summaryTable");
  table.innerHTML = `
    <colgroup>
      <col class="summary-col-category" />
      <col class="summary-col-prev" />
      <col class="summary-col-prev" />
      ${Array.from({ length: 16 }, () => `<col class="summary-col-month" />`).join("")}
      ${Array.from({ length: 6 }, () => `<col class="summary-col-future" />`).join("")}
      <col class="summary-col-total" />
      <col class="summary-col-avg" />
    </colgroup>
    <thead>
      <tr>
        <th class="category" rowspan="3">구분</th>
        <th colspan="2">25년</th>
        <th rowspan="3">1월</th>
        <th rowspan="3">2월</th>
        <th rowspan="3">3월</th>
        <th rowspan="3">4월</th>
        <th rowspan="3">5월</th>
        <th colspan="11">6월</th>
        <th rowspan="3">7월</th>
        <th rowspan="3">8월</th>
        <th rowspan="3">9월</th>
        <th rowspan="3">10월</th>
        <th rowspan="3">11월</th>
        <th rowspan="3">12월</th>
        <th rowspan="3">합계</th>
        <th rowspan="3">월<br />평균</th>
      </tr>
      <tr>
        <th rowspan="2">합계</th>
        <th rowspan="2">월<br />평균</th>
        <th>1주</th>
        <th>2주</th>
        <th>3주</th>
        <th colspan="7">4주</th>
        <th rowspan="2">합계</th>
      </tr>
      <tr>
        <th></th><th></th><th></th>
        <th>6/22</th><th>6/23</th><th>6/24</th><th>6/25</th><th>6/26</th><th>6/29</th><th>6/30</th>
      </tr>
    </thead>
    <tbody>
      ${state.summary.length ? state.summary.map((row) => `
        <tr class="${row.category === "계" ? "sum-row" : row.category === "PPM" ? "ppm-row" : ""}">
          <th class="side-head">${escapeHtml(row.category)}</th>
          ${summaryRowCells(row)}
        </tr>
      `).join("") : document.getElementById("emptyState").innerHTML}
    </tbody>`;
}

function summaryRowCells(row) {
  if (row.category === "PPM") {
    return [
      basicCell(row.prevTotal, false, 2),
      ...summaryKeys.slice(2).map((key) => basicCell(row[key]))
    ].join("");
  }
  const todayKey = currentSummaryDayKey();
  return summaryKeys.map((key) => basicCell(row[key], key === todayKey)).join("");
}

function renderDetails() {
  const table = document.getElementById("detailTable");
  renderDetailDateSelect();
  table.innerHTML = `
    <colgroup>
      <col class="detail-col-idx" />
      <col class="detail-col-category" />
      <col class="detail-col-type" />
      <col class="detail-col-brand" />
      <col class="detail-col-source" />
      <col class="detail-col-code" />
      <col class="detail-col-color" />
      <col class="detail-col-lot" />
      <col class="detail-col-supplier" />
      <col class="detail-col-defect" />
      <col class="detail-col-image" />
    </colgroup>
    <thead>
      <tr>
        <th colspan="2">구분</th>
        <th>유형</th>
        <th>브랜드</th>
        <th>원인처</th>
        <th>제품코드</th>
        <th>색상</th>
        <th>LOT NO</th>
        <th>공급</th>
        <th>하자내역</th>
        <th class="image-cell">이미지</th>
      </tr>
    </thead>
    <tbody>
      ${state.details.length ? state.details.map((row, index) => `
        <tr>
          <td class="idx">${index + 1}</td>
          <td>${escapeHtml(row.category)}</td>
          <td>${escapeHtml(row.type)}</td>
          <td>${escapeHtml(row.brand)}</td>
          <td>${escapeHtml(row.source)}</td>
          <td>${escapeHtml(row.code)}</td>
          <td>${escapeHtml(row.color)}</td>
          <td>${escapeHtml(row.lot)}</td>
          <td>${escapeHtml(row.supplier)}</td>
          <td class="claim-text">${formatDefect(row.defect)}</td>
          <td>${imageMarkup(row, index)}</td>
        </tr>
      `).join("") : document.getElementById("emptyState").innerHTML}
    </tbody>`;
}

function moneyCell(value) {
  const stat = normalizeCostStat(value);
  if (!stat.amount) {
    return `<td class="number muted">-</td>`;
  }
  return `<td class="number">${formatNumber(stat.amount)}원</td>`;
}

function normalizeCostStat(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return { amount: numeric(value.amount), count: numeric(value.count) };
  }
  return { amount: numeric(value), count: 0 };
}

function sumCostStats(values) {
  const total = values.reduce((acc, value) => {
    const stat = normalizeCostStat(value);
    acc.amount += stat.amount;
    acc.count += stat.count;
    return acc;
  }, { amount: 0, count: 0 });
  return total.count ? total : total.amount;
}

function basicCell(value, danger = false, colspan = 1) {
  const text = value === "" || value === null || value === undefined ? "-" : escapeHtml(formatNumber(value));
  const span = colspan > 1 ? ` colspan="${colspan}"` : "";
  return `<td${span}>${formatSummaryCellText(text, danger)}</td>`;
}

function currentSummaryDayKey() {
  const today = new Date();
  if (today.getMonth() + 1 !== 6) return "";
  return `d6${String(today.getDate()).padStart(2, "0")}`;
}

function formatSummaryCellText(text, danger = false) {
  if (!danger) return colorParen(text);
  const highlighted = String(text).replace(/^(-?\d[\d,]*)/, '<span class="danger-main">$1</span>');
  return colorParen(highlighted);
}

function colorParen(text) {
  return String(text).replace(/(\([^)]*\))/g, '<span class="paren">$1</span>');
}

function formatNumber(value) {
  if (typeof value === "number") return value.toLocaleString("ko-KR");
  return escapeHtml(value);
}

function formatDefect(value) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function imageMarkup(row, index) {
  const imageNo = Number(row?.number) || index + 1;
  const images = detailImages(imageNo, selectedDetailDate);
  const buttons = `<div class="image-actions">
    <button class="image-register" type="button" onclick="registerDetailImage(${imageNo})">등록/추가</button>
  </div>`;
  if (!images.length) return buttons;
  return `
    <div class="claim-image-tools">
      <div class="claim-image-list">
        ${images.map(({ image, flatIndex }) => `
          <div class="claim-image-item">
            <button class="claim-image-open" type="button" onclick="openDetailImage(${flatIndex})" title="미디어 열기">
              ${mediaPreviewMarkup(image)}
            </button>
            <button class="image-delete" type="button" onclick="deleteDetailImage(${flatIndex})">삭제</button>
          </div>
        `).join("")}
      </div>
      ${buttons}
    </div>`;
}

function mediaPreviewMarkup(image) {
  if (image.mediaType === "video" || String(image.mimeType || "").startsWith("video/")) {
    return `<span class="claim-video-thumb">동영상</span>`;
  }
  return `<img class="claim-image" src="${image.url}" alt="${escapeHtml(image.name)}" />`;
}

function detailImages(imageNo, imageDate = "") {
  return state.images
    .map((image, flatIndex) => ({ image, flatIndex }))
    .filter(({ image, flatIndex }) => {
      const sameNo = (Number(image.imageNo) || flatIndex + 1) === Number(imageNo);
      const storedDate = String(image.imageDate || "");
      const sameDate = imageDate ? storedDate === String(imageDate) : !storedDate;
      return sameNo && sameDate;
    });
}

function registerDetailImage(imageNo) {
  pendingDetailImageNo = Number(imageNo) || null;
  pendingDetailImageDate = selectedDetailDate || "";
  document.getElementById("imageFiles")?.click();
}

function openDetailImage(index) {
  const image = state.images[index];
  if (!image?.url) return;
  const viewer = window.open("", `claimImage_${Date.now()}`, "popup=yes,width=1100,height=820,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
  if (!viewer) return;
  const isVideo = image.mediaType === "video" || String(image.mimeType || "").startsWith("video/");
  const media = isVideo
    ? `<video src="${image.url}" controls autoplay style="max-width:100%;max-height:100vh;object-fit:contain"></video>`
    : `<img src="${image.url}" alt="" style="max-width:100%;max-height:100vh;object-fit:contain" />`;
  viewer.document.write(`<!doctype html><html lang="ko"><head><title>${escapeHtml(image.name || "미디어")}</title><style>body{margin:0;background:#111;display:flex;align-items:center;justify-content:center;min-height:100vh}</style></head><body>${media}</body></html>`);
  viewer.document.close();
  attachEscToClose(viewer);
}

function deleteDetailImage(index) {
  const target = findImageEntryByFlatIndex(index);
  if (!target) return;
  if (!confirm("등록한 이미지를 삭제할까요?")) return;
  target.entry.images.splice(target.localIndex, 1);
  if (!target.entry.images.length) {
    state.uploads = state.uploads.filter((entry) => entry !== target.entry);
  }
  rebuildFromSelection();
  renderFileCards();
  renderDetails();
  saveDashboardState();
}

function findImageEntryByFlatIndex(index) {
  let offset = 0;
  for (const entry of selectedByKind("images")) {
    const length = (entry.images || []).length;
    if (index < offset + length) return { entry, localIndex: index - offset };
    offset += length;
  }
  return null;
}

function renderDetailDateSelect() {
  const select = document.getElementById("detailDateSelect");
  if (!select) return;
  if (!detailDateOptions.length) {
    select.innerHTML = `<option value="">날짜 없음</option>`;
    select.disabled = true;
    return;
  }
  select.disabled = false;
  select.innerHTML = detailDateOptions.map((option) =>
    `<option value="${escapeHtml(option.value)}" ${option.value === selectedDetailDate ? "selected" : ""}>${escapeHtml(option.label)}</option>`
  ).join("");
}

function saveDashboardState(force = false) {
  if (restoringSavedState && !force) return;
  const linkedGroups = new Map();
  savedLinkGroupsCache.forEach((group) => {
    if (!group?.sourceUrl) return;
    linkedGroups.set(group.groupKey || group.sourceUrl, {
      sourceUrl: group.sourceUrl,
      kind: group.kind,
      label: group.label,
      groupKey: group.groupKey,
      groupTitle: group.groupTitle,
      order: group.order,
      entries: group.entries || []
    });
  });
  const touchedFromUploads = new Set();
  state.uploads
    .filter((entry) => entry.sourceType === "spreadsheet-link" && entry.sourceUrl)
    .forEach((entry) => {
      const key = entry.groupKey || entry.sourceUrl;
      if (!linkedGroups.has(key)) {
        linkedGroups.set(key, {
          sourceUrl: entry.sourceUrl,
          kind: entry.kind,
          label: entry.groupTitle || entry.label,
          groupKey: entry.groupKey,
          groupTitle: entry.groupTitle,
          order: entry.order,
          entries: []
        });
      }
      if (!touchedFromUploads.has(key)) {
        touchedFromUploads.add(key);
        linkedGroups.get(key).entries = [];
      }
      linkedGroups.get(key).entries.push({
        label: entry.label,
        sourceSheet: entry.sourceSheet || "",
        sourceUrl: entry.sourceUrl,
        selected: !!entry.selected,
        excluded: Number(entry.excluded || 0)
      });
    });

  const payload = {
    version: 1,
    savedAt: new Date().toISOString(),
    activeUploadLabel: state.uploads.find((entry) => entry.id === activeUploadId)?.label || "",
    groups: [...linkedGroups.values()],
    viewSnapshot: createViewSnapshot(),
    images: state.images.filter((image) => !image.driveSourced).map((image) => ({
      id: image.id,
      name: image.name,
      mediaType: image.mediaType || "image",
      mimeType: image.mimeType || "",
      imageNo: image.imageNo,
      imageDate: image.imageDate || ""
    }))
  };
  savedLinkGroupsCache = payload.groups;
  saveImagesToDb(state.images.filter((image) => !image.driveSourced)).catch(() => {});
  saveMonthlyStatusSnapshot();
  try {
    localStorage.setItem(dashboardStorageKey, JSON.stringify(payload));
  } catch (err) {
    try {
      localStorage.removeItem(dashboardStorageKey);
    } catch (removeErr) {}
    const lightPayload = { ...payload, images: [], viewSnapshot: slimViewSnapshot(payload.viewSnapshot) };
    try {
      localStorage.setItem(dashboardStorageKey, JSON.stringify(lightPayload));
    } catch (retryErr) {
      try {
        localStorage.setItem(dashboardStorageKey, JSON.stringify({
          version: payload.version,
          savedAt: payload.savedAt,
          activeUploadLabel: payload.activeUploadLabel,
          groups: payload.groups,
          viewSnapshot: null,
          images: []
        }));
      } catch (finalErr) {}
    }
  }
}

function saveMonthlyStatusSnapshot() {
  const entries = state.uploads
    .filter((entry) => entry.kind === "monthlyStatus")
    .map((entry) => ({
      kind: entry.kind,
      fileName: entry.fileName || "",
      label: entry.label || "",
      rows: entry.rows || [],
      countHint: entry.countHint || 0,
      sourceUrl: entry.sourceUrl || "",
      sourceSheet: entry.sourceSheet || "",
      sourceType: entry.sourceType || "",
      groupKey: entry.groupKey || "monthly-status",
      groupTitle: entry.groupTitle || "",
      order: entry.order || 400,
      selected: entry.selected !== false,
      excluded: Number(entry.excluded || 0)
    }));
  if (!entries.length) return;
  try {
    localStorage.setItem(monthlyStatusSnapshotKey, JSON.stringify({
      savedAt: new Date().toISOString(),
      entries
    }));
  } catch (err) {}
}

function restoreMonthlyStatusSnapshot() {
  if (state.uploads.some((entry) => entry.kind === "monthlyStatus" && (entry.rows || []).length)) return false;
  let payload;
  try {
    payload = JSON.parse(localStorage.getItem(monthlyStatusSnapshotKey) || "null");
  } catch (err) {
    return false;
  }
  if (!payload?.entries?.length) return false;
  state.uploads = state.uploads.filter((entry) => entry.kind !== "monthlyStatus");
  payload.entries.forEach((entry) => addUploadEntry({
    ...entry,
    selected: entry.selected !== false,
    rows: entry.rows || [],
    groupKey: entry.groupKey || "monthly-status",
    sourceType: entry.sourceType || "spreadsheet-link"
  }));
  monthlyStatusAutoFailed = false;
  return true;
}

function createViewSnapshot() {
  return {
    summary: state.summary || [],
    cost: state.cost || [],
    costMeta: state.costMeta || defaultCostMeta()
  };
}

function slimViewSnapshot(snapshot) {
  if (!snapshot) return null;
  return {
    summary: snapshot.summary || [],
    cost: snapshot.cost || [],
    costMeta: snapshot.costMeta || defaultCostMeta()
  };
}

function openImageDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB를 사용할 수 없습니다."));
      return;
    }
    const request = indexedDB.open(imageDbName, 1);
    request.onerror = () => reject(request.error || new Error("이미지 저장소를 열지 못했습니다."));
    request.onupgradeneeded = () => {
      request.result.createObjectStore(imageStoreName, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
  });
}

async function saveImagesToDb(images) {
  const db = await openImageDatabase();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(imageStoreName, "readwrite");
    const store = tx.objectStore(imageStoreName);
    store.clear();
    (images || []).forEach((image) => {
      const dataUrl = image.dataUrl || image.url;
      if (!dataUrl) return;
      store.put({
        id: image.id || createImageId(),
        name: image.name || "저장 이미지",
        dataUrl,
        mediaType: image.mediaType || (String(image.mimeType || "").startsWith("video/") ? "video" : "image"),
        mimeType: image.mimeType || "",
        imageNo: image.imageNo,
        imageDate: image.imageDate || ""
      });
    });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error("이미지를 저장하지 못했습니다."));
  });
  db.close();
}

async function loadImagesFromDb() {
  try {
    const db = await openImageDatabase();
    const images = await new Promise((resolve, reject) => {
      const tx = db.transaction(imageStoreName, "readonly");
      const request = tx.objectStore(imageStoreName).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error || new Error("이미지를 불러오지 못했습니다."));
    });
    db.close();
    return images;
  } catch (err) {
    return [];
  }
}

async function clearImagesFromDb() {
  try {
    const db = await openImageDatabase();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(imageStoreName, "readwrite");
      tx.objectStore(imageStoreName).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error("이미지 저장소를 비우지 못했습니다."));
    });
    db.close();
  } catch (err) {}
}

function clearSavedDashboardState() {
  savedLinkGroupsCache = [];
  localStorage.removeItem(dashboardStorageKey);
  localStorage.removeItem(monthlyStatusSnapshotKey);
  clearImagesFromDb();
}

async function restoreSavedDashboardState() {
  const raw = localStorage.getItem(dashboardStorageKey);
  let payload = null;
  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch (err) {
      clearSavedDashboardState();
      payload = null;
    }
  }
  if (!payload?.groups?.length && !payload?.images?.length && !payload?.viewSnapshot) {
    if (!SEED_SAVED_LINK_GROUPS.length) return false;
    payload = { groups: SEED_SAVED_LINK_GROUPS };
  }
  savedLinkGroupsCache = payload.groups || [];
  restoredViewSnapshot = payload.viewSnapshot || null;

  restoringSavedState = true;
  const failedGroups = [];
  try {
    revokeImages();
    state.uploads = [];
    const restoreResults = await Promise.allSettled((payload.groups || []).map((group) => restoreSavedGroup(group)));
    restoreResults.forEach((result, index) => {
      if (result.status === "rejected") failedGroups.push(payload.groups[index]);
    });
    restoreMonthlyStatusSnapshot();
    const dbImages = await loadImagesFromDb();
    restoreSavedImages(dbImages.length ? dbImages : payload.images || []);
    activeUploadId = state.uploads.find((entry) => entry.label === payload.activeUploadLabel)?.id || state.uploads[0]?.id || "sample";
    window.__lastRestoreHadFailures = failedGroups.length > 0;
    renderAll(failedGroups.length
      ? "일부 저장 링크를 불러오지 못했습니다. 저장값은 유지됩니다."
      : "저장된 링크 자료를 불러왔습니다.");
    saveDashboardState(true);
    return true;
  } catch (err) {
    window.__lastRestoreHadFailures = true;
    alert(`저장된 링크 불러오기 실패: ${err.message}`);
    return false;
  } finally {
    restoringSavedState = false;
  }
}
function exportSeedSavedLinkGroups() {
  const raw = localStorage.getItem(dashboardStorageKey);
  let groups = [];
  try {
    groups = (JSON.parse(raw || "null")?.groups) || [];
  } catch (_) {
    groups = [];
  }
  if (!groups.length) {
    alert("내보낼 저장된 링크가 없습니다. 먼저 데이터 삽입으로 링크를 넣어주세요.");
    return;
  }
  const text = `const SEED_SAVED_LINK_GROUPS = ${JSON.stringify(groups, null, 2)};`;
  const done = () => alert("복사되었습니다. app.js의 SEED_SAVED_LINK_GROUPS 부분에 붙여넣고 저장/배포하세요.");
  const fail = () => window.prompt("자동 복사에 실패했습니다. 아래 내용을 직접 복사하세요:", text);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(fail);
  } else {
    fail();
  }
}

function restoreSavedImages(images) {
  const restored = (images || [])
    .filter((image) => image?.dataUrl && !image.driveSourced && !/googleusercontent\.com/.test(image.dataUrl))
    .map((image, index) => ({
      id: image.id || createImageId(),
      name: image.name || "저장 이미지",
      url: image.dataUrl,
      dataUrl: image.dataUrl,
      mediaType: image.mediaType || (String(image.mimeType || "").startsWith("video/") ? "video" : "image"),
      mimeType: image.mimeType || "",
      imageNo: image.imageNo || index + 1,
      imageDate: image.imageDate || ""
    }));
  if (!restored.length) return;
  addUploadEntry({
    kind: "images",
    fileName: `${restored.length}개 저장 이미지`,
    label: "저장 이미지",
    rows: [],
    images: restored,
    selected: true,
    excluded: 0
  });
}

async function restoreSavedGroup(group) {
  const savedEntries = group.entries || [];
  const restoreLabel = group.kind === "summary" ? (savedEntries[0]?.label || group.label) : group.label;
  const hasDistinctUrls = group.kind === "cost" && savedEntries.length > 1 && savedEntries.every((entry) => entry.sourceUrl);
  const fetchUrl = hasDistinctUrls
    ? savedEntries.slice().sort((a, b) => monthNumber(a.label) - monthNumber(b.label)).map((entry) => entry.sourceUrl).join("\n")
    : group.sourceUrl;
  const dataSets = await fetchSpreadsheetDataSets(fetchUrl, group.kind, restoreLabel);
  const groupMeta = linkedGroupMeta(group, group.sourceUrl, dataSets);
  const savedByLabel = new Map(savedEntries.map((entry) => [entry.label, entry]));
  dataSets
    .filter((dataSet) => group.kind === "summary" || group.kind === "cost" || !savedByLabel.size || savedByLabel.has(dataSet.label))
    .forEach((dataSet) => {
      const saved = savedByLabel.get(dataSet.label) || (!savedByLabel.size ? savedEntries[0] : {}) || {};
      addUploadEntry({
        kind: group.kind,
        fileName: dataSet.fileName || group.sourceUrl,
        label: dataSet.label || saved.label || group.label,
        rows: normalizeRows(dataSet.rows, group.kind),
        countHint: dataSet.countHint,
        defectAmount: dataSet.defectAmount,
        sourceUrl: dataSet.fileName || saved.sourceUrl || group.sourceUrl,
        sourceSheet: dataSet.sheetName || saved.sourceSheet || "",
        selected: saved.selected ?? true,
        excluded: Number(saved.excluded || 0),
        sourceType: "spreadsheet-link",
        groupKey: groupMeta.groupKey,
        groupTitle: groupMeta.groupTitle,
        order: groupMeta.order
      });
    });
}

function addSummaryValue(current, next) {
  const a = splitSummaryValue(current);
  const b = splitSummaryValue(next);
  if (!a.hasValue && !b.hasValue) return "";
  if (!a.hasParen && !b.hasParen) return a.main + b.main;
  return `${a.main + b.main}(${a.paren + b.paren})`;
}

function splitSummaryValue(value) {
  if (value === "" || value === null || value === undefined || value === "-") {
    return { main: 0, paren: 0, hasValue: false, hasParen: false };
  }
  if (typeof value === "number") {
    return { main: value, paren: 0, hasValue: true, hasParen: false };
  }
  const text = String(value).replace(/,/g, "");
  const mainMatch = text.match(/^-?\d+(\.\d+)?/);
  const parenMatch = text.match(/\((-?\d+(\.\d+)?)\)/);
  return {
    main: mainMatch ? Number(mainMatch[0]) : 0,
    paren: parenMatch ? Number(parenMatch[1]) : 0,
    hasValue: !!mainMatch || !!parenMatch,
    hasParen: !!parenMatch
  };
}

function numeric(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return numeric(value.amount);
  if (typeof value === "number") return value;
  const stripped = String(value ?? "").replace(/[,\s원]/g, "");
  return /^-?\d+(\.\d+)?$/.test(stripped) ? Number(stripped) : 0;
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function downloadLocalDb() {
  const rows = [];
  state.uploads.forEach((entry) => {
    if (entry.kind === "images") return;
    (entry.rows || []).forEach((row, index) => {
      rows.push({
        자료명: entry.label,
        파일명: entry.fileName,
        자료유형: kindNames[entry.kind],
        제외여부: index < Number(entry.excluded || 0) ? "제외" : "",
        ...row
      });
    });
  });
  if (!rows.length) {
    alert("다운로드할 DB 데이터가 없습니다.");
    return;
  }
  downloadText("quality_claim_dashboard_db.csv", toCsv(rows), "text/csv;charset=utf-8");
}

function exportDashboardData() {
  const payload = {
    version: "quality-claim-dashboard-v1",
    exportedAt: new Date().toISOString(),
    uploads: state.uploads.map((entry) => ({
      ...entry,
      images: (entry.images || []).map((image) => ({
        name: image.name,
        dataUrl: image.dataUrl || image.url,
        url: image.dataUrl || image.url,
        mediaType: image.mediaType || "image",
        mimeType: image.mimeType || "",
        imageNo: image.imageNo,
        imageDate: image.imageDate || ""
      }))
    }))
  };
  downloadText("quality_claim_dashboard_export.json", JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
}

function importDashboardData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      if (json.version !== "quality-claim-dashboard-v1" || !Array.isArray(json.uploads)) {
        alert("올바른 대시보드 저장 파일이 아닙니다.");
        return;
      }
      revokeImages();
      state.uploads = json.uploads.map((entry) => ({
        ...entry,
        images: (entry.images || []).map((image) => ({
          ...image,
          url: image.dataUrl || image.url || "",
          dataUrl: image.dataUrl || image.url || "",
          mediaType: image.mediaType || (String(image.mimeType || "").startsWith("video/") ? "video" : "image"),
          mimeType: image.mimeType || "",
          imageNo: image.imageNo,
          imageDate: image.imageDate || ""
        }))
      }));
      activeUploadId = state.uploads[0]?.id || "sample";
      renderAll("대시보드 파일을 불러왔습니다.");
      saveDashboardState();
    } catch (err) {
      alert(`불러오기 실패: ${err.message}`);
    }
  };
  reader.readAsText(file, "utf-8");
  event.target.value = "";
}

function toCsv(rows) {
  const headers = [...rows.reduce((set, row) => {
    Object.keys(row).forEach((key) => set.add(key));
    return set;
  }, new Set())];
  const lines = [headers.join(",")];
  rows.forEach((row) => {
    lines.push(headers.map((header) => csvCell(row[header])).join(","));
  });
  return `\uFEFF${lines.join("\n")}`;
}

function csvCell(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function downloadText(fileName, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function revokeImages() {
  state.uploads.forEach(revokeEntryImages);
  state.images.forEach((image) => {
    if (image.url?.startsWith("blob:")) URL.revokeObjectURL(image.url);
  });
}

function revokeEntryImages(entry) {
  (entry.images || []).forEach((image) => {
    if (image.url?.startsWith("blob:")) URL.revokeObjectURL(image.url);
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeJs(value) {
  return String(value ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function attachEscToClose(win) {
  if (!win) return;
  try {
    win.document.addEventListener("keydown", (e) => { if (e.key === "Escape") win.close(); });
  } catch (_) {}
}

// Final classification guards: keep line causes from being pulled into purchase/outsource buckets.
function claimLineFromText(value) {
  const text = String(value || "").replace(/\s+/g, "");
  if (/7라인/.test(text)) return "7라인";
  if (/3라인|4라인/.test(text)) return "4라인";
  if (/1라인/.test(text)) return "1라인";
  return "";
}

function claimSourceFromText(value) {
  const text = String(value || "").replace(/\s+/g, "");
  if (!text || text === "." || text.toUpperCase() === "VN") return "";
  if (text.includes("외주")) return "외주";
  if (text.includes("구매")) return "구매";
  return "";
}

function monthlyCauseValue(row, raw) {
  return String(
    row.deadlineCause ||
    pick(raw, ["원인", "원인처", "V", "cause"]) ||
    raw["원인"] ||
    raw["원인처"] ||
    cellAt(raw, 21) ||
    ""
  ).trim();
}

function monthlyDeadlineRowMeta(entry, row, index) {
  const raw = row.__raw || row;
  const excluded = clamp(Number(entry.excluded || 0), 0, entry.rows.length);
  const item = String(row.deadlineCode || pick(raw, ["제품코드", "제품 코드", "code"]) || "").trim();
  const color = String(row.deadlineColor || pick(raw, ["색상", "color"]) || "").trim();
  const quantity = numeric(row.deadlineQuantity || pick(raw, ["수량", "quantity"])) || 1;
  const amount = numeric(row.deadlineAmount || pick(raw, ["금액", "amount"]));
  return {
    row: raw,
    entry,
    sourceIndex: index,
    penaltyEligible: index >= excluded,
    month: monthlyEntryLabel(entry),
    receiptNo: `${entry.id}_${index}`,
    type: String(row.deadlineType || pick(raw, ["유형", "type"]) || "미분류").trim() || "미분류",
    detailType: String(row.deadlineDetailType || pick(raw, ["세부유형", "상세유형", "detailType"]) || "").trim(),
    packageType: String(row.deadlinePackage || pick(raw, ["포장", "포장처", "package"]) || "").trim(),
    brand: String(row.deadlineBrand || pick(raw, ["브랜드", "brand"]) || "").trim(),
    item: item || "미분류",
    cause: monthlyCauseValue(row, raw),
    color,
    quantity,
    amount,
    defect: String(row.deadlineDefect || pick(raw, ["하자상세", "하자상세내용", "하자내역", "defect"]) || "").trim()
  };
}

function weeklyLineGroup(row) {
  const cause = weeklyCause(row);
  const direct = `${cause || ""} ${pick(row, ["라인", "원인처", "원인", "발생처"]) || ""}`;
  const secondary = pick(row, ["구분", "부서", "공정", "포장", "포장처"]) || "";
  return claimLineFromText(direct) ||
    claimSourceFromText(direct) ||
    claimLineFromText(secondary) ||
    claimSourceFromText(secondary) ||
    "";
}

function monthlyLineLabel(row) {
  const cause = row.cause || "";
  const secondary = `${row.packageType || ""} ${row.detailType || ""}`;
  return claimLineFromText(cause) ||
    claimSourceFromText(cause) ||
    claimLineFromText(secondary) ||
    claimSourceFromText(secondary) ||
    row.cause ||
    row.packageType ||
    row.detailType ||
    "미분류";
}

function monthlyDefectSourcePieItems(rows) {
  const counts = new Map();
  rows.forEach((row) => {
    const raw = monthlyLineLabel(row);
    const label = WEEKLY_SOURCE_PIE_ORDER.includes(raw) ? raw : "기타";
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return WEEKLY_SOURCE_PIE_ORDER.map((label) => ({ label, value: counts.get(label) || 0 })).filter((item) => item.value > 0);
}

function monthlyCauseSummary(rows) {
  const map = new Map();
  rows.forEach((row) => {
    const label = String(row.cause || "").trim();
    if (!label || label === "." || label.toUpperCase() === "VN") return;
    map.set(label, (map.get(label) || 0) + 1);
  });
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }))
    .slice(0, 3);
}

function monthlyTypeDetails(rows) {
  const map = new Map();
  rows.forEach((row) => {
    if (!map.has(row.type)) map.set(row.type, { label: row.type, rows: [] });
    map.get(row.type).rows.push(row);
  });
  return [...map.values()]
    .map((item) => {
      const count = item.rows.length;
      const amountBase = item.rows.reduce((sum, row) => sum + row.amount, 0);
      return {
        ...item,
        count,
        amount: amountBase + monthlyPenaltyCount(item.rows) * penaltyPerClaim,
        causes: monthlyCauseSummary(item.rows),
        items: monthlyTopClaimItems(item.rows, 0)
      };
    })
    .sort((a, b) => b.count - a.count || b.amount - a.amount || a.label.localeCompare(b.label, "ko", { numeric: true }));
}

function monthlyTypeRowsMarkup(types, lineLabel) {
  if (!types.length) return "";
  return `<div class="weekly-drill-list">
    ${types.map((type) => {
      const key = `${lineLabel}||${type.label}`;
      return `<div class="weekly-type-block">
        <button class="weekly-type-row" type="button" onclick="toggleMonthlyType('${escapeJs(lineLabel)}', '${escapeJs(type.label)}')">
          <span>유형</span>
          <strong>${escapeHtml(type.label)}${weeklyCauseTagsMarkup(type.causes)}</strong>
          <em>${formatNumber(type.count)}건</em>
          <b>${formatNumber(type.amount)}원</b>
          <i>${monthlyExpandedType === key ? "접기" : "펼치기"}</i>
        </button>
        ${monthlyExpandedType === key ? monthlyItemRowsMarkup(type.items) : ""}
      </div>`;
    }).join("")}
  </div>`;
}

// Final override: display prior-month totals even when older saved data kept the
// month in legacy total/week/day keys such as m6Total.
function summaryDisplayValue(row, key) {
  const meta = currentSummaryMeta();
  const monthMatch = String(key).match(/^m(\d{1,2})$/);
  if (!monthMatch || Number(monthMatch[1]) >= meta.currentMonth) return row[key];
  const value = splitSummaryValue(row[key]);
  if (value.hasValue && value.main > 0) return row[key];
  const fallback = summaryMonthFallbackValue(row, Number(monthMatch[1]));
  return fallback > 0 ? fallback : row[key];
}

function summaryRowCells(row) {
  const keys = summaryDynamicKeys();
  const todayKey = currentSummaryDayKey();
  return keys.map((key) => basicCell(summaryDisplayValue(row, key), row.category !== "PPM" && key === todayKey)).join("");
}

function renderSummaryDynamicFinal() {
  const table = document.getElementById("summaryTable");
  if (!table) return;
  const meta = currentSummaryMeta();
  const keys = summaryDynamicKeys(meta);
  const today = new Date();
  const todayCandidate = summaryDateKey(today);
  const todayKey = meta.dayColumns.some((column) => column.key === todayCandidate) ? todayCandidate : "";
  const beforeMonthHeaders = meta.preMonths.map((month) => `<th rowspan="3">${month}��</th>`).join("");
  const afterMonthHeaders = meta.postMonths.map((month) => `<th rowspan="3">${month}��</th>`).join("");
  const preWeekHeaders = meta.preWeeks.map((week) => `<th rowspan="2">${escapeHtml(week.label)}</th>`).join("");
  const dayHeaders = meta.dayColumns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const currentColspan = meta.preWeeks.length + meta.dayColumns.length + 1;
  const rowCells = (row) => keys.map((key) => basicCell(summaryDisplayValue(row, key), row.category !== "PPM" && key === todayKey)).join("");

  table.innerHTML = `
    <colgroup>
      <col class="summary-col-category" />
      ${keys.map((key) => `<col class="${key === "prevTotal" || key === "prevAvg" ? "summary-col-prev" : key === "total" || key === "avg" ? "summary-col-total" : "summary-col-month"}" />`).join("")}
    </colgroup>
    <thead>
      <tr>
        <th class="category" rowspan="3">����</th>
        <th colspan="2">25��</th>
        ${beforeMonthHeaders}
        <th colspan="${currentColspan}">${escapeHtml(meta.monthLabel)}</th>
        ${afterMonthHeaders}
        <th rowspan="3">�հ�</th>
        <th rowspan="3">��<br />���</th>
      </tr>
      <tr>
        <th rowspan="2">�հ�</th>
        <th rowspan="2">��<br />���</th>
        ${preWeekHeaders}
        <th colspan="${Math.max(1, meta.dayColumns.length)}">${escapeHtml(meta.currentWeekLabel)}</th>
        <th rowspan="2">�հ�</th>
      </tr>
      <tr>
        ${dayHeaders || "<th>-</th>"}
      </tr>
    </thead>
    <tbody>
      ${state.summary.length ? state.summary.map((row) => {
        const categoryText = String(row.category || "");
        const rowClass = categoryText.includes("��") ? "sum-row" : categoryText === "PPM" ? "ppm-row" : "";
        return `<tr class="${rowClass}"><th class="side-head">${escapeHtml(row.category)}</th>${rowCells(row)}</tr>`;
      }).join("") : document.getElementById("emptyState").innerHTML}
    </tbody>`;
}

function renderSummary() {
  renderSummaryDynamicFinal();
}

// Final override for month rollover: when July current data is loaded, June can
// live in legacy keys (m6Total / week / day keys) or only in saved receipt rows.
function summaryDirectMonthFallback(category, month) {
  const entries = state.uploads.filter((entry) => entry.kind === "receiptHistory" || entry.kind === "summary");
  if (!entries.length) return 0;
  return collectDatedReceiptRows(entries).filter(({ row, date }) => {
    if (!date || date.getFullYear() !== 2026 || date.getMonth() + 1 !== month) return false;
    return String(receiptClaimCategory(row) || "") === String(category || "");
  }).length;
}

function summaryMonthDisplayFallback(row, month) {
  const direct = splitSummaryValue(row?.[`m${month}`]);
  if (direct.hasValue && direct.main > 0) return direct.main;
  const total = splitSummaryValue(row?.[`m${month}Total`]);
  if (total.hasValue && total.main > 0) return total.main;
  if (month === 6) {
    const juneKeys = ["w1", "w2", "w3", "d622", "d623", "d624", "d625", "d626", "d629", "d630"];
    const juneTotal = juneKeys.reduce((sum, key) => sum + splitSummaryValue(row?.[key]).main, 0);
    if (juneTotal > 0) return juneTotal;
  }
  return summaryDirectMonthFallback(row?.category, month);
}

function summaryDisplayValue(row, key) {
  const meta = currentSummaryMeta();
  const monthMatch = String(key).match(/^m(\d{1,2})$/);
  if (!monthMatch || Number(monthMatch[1]) >= meta.currentMonth) return row[key];
  const fallback = summaryMonthDisplayFallback(row, Number(monthMatch[1]));
  return fallback > 0 ? fallback : row[key];
}

// Final override for sum rows: category rows match receiptClaimCategory directly;
// the total row should count every valid receipt row for that prior month.
function summaryDirectMonthFallback(category, month) {
  const entries = state.uploads.filter((entry) => entry.kind === "receiptHistory" || entry.kind === "summary");
  if (!entries.length) return 0;
  const monthRows = collectDatedReceiptRows(entries).filter(({ date }) => {
    return date && date.getFullYear() === 2026 && date.getMonth() + 1 === month;
  });
  const categoryText = String(category || "");
  if (categoryText === "PPM") return 0;
  const visibleCategories = (state.summary || []).slice(0, 3).map((row) => String(row.category || ""));
  if (!visibleCategories.includes(categoryText)) return monthRows.length;
  return monthRows.filter(({ row }) => String(receiptClaimCategory(row) || "") === categoryText).length;
}

// Final override: recompute total / monthly average from the displayed month values,
// so prior-month fallbacks such as June are included in the right-side totals.
function summaryDisplayedYearMain(row) {
  const meta = currentSummaryMeta();
  return Array.from({ length: 12 }, (_, index) => index + 1).reduce((sum, month) => {
    const key = month === meta.currentMonth ? meta.monthTotalKey : `m${month}`;
    if (month < meta.currentMonth) return sum + summaryMonthDisplayFallback(row, month);
    return sum + splitSummaryValue(row?.[key]).main;
  }, 0);
}

function summaryDisplayedActiveMonths(row) {
  const meta = currentSummaryMeta();
  return Array.from({ length: 12 }, (_, index) => index + 1).filter((month) => {
    const key = month === meta.currentMonth ? meta.monthTotalKey : `m${month}`;
    const value = month < meta.currentMonth ? summaryMonthDisplayFallback(row, month) : splitSummaryValue(row?.[key]).main;
    return value > 0;
  }).length;
}

function summaryDisplayValue(row, key) {
  if (String(row?.category || "") === "PPM") return row[key];
  const meta = currentSummaryMeta();
  const monthMatch = String(key).match(/^m(\d{1,2})$/);
  if (monthMatch && Number(monthMatch[1]) < meta.currentMonth) {
    const fallback = summaryMonthDisplayFallback(row, Number(monthMatch[1]));
    return fallback > 0 ? fallback : row[key];
  }
  if (key === "total") {
    const base = splitSummaryValue(row?.total);
    const total = summaryDisplayedYearMain(row);
    return base.hasParen ? `${total}(${base.paren})` : total;
  }
  if (key === "avg") {
    const base = splitSummaryValue(row?.avg);
    const months = summaryDisplayedActiveMonths(row);
    const avg = months ? Math.round(summaryDisplayedYearMain(row) / months) : 0;
    return base.hasParen ? `${avg}(${base.paren})` : avg;
  }
  return row[key];
}

// Final override: only adjust right-side totals when the displayed month fallback
// actually increases the year total. Keep existing averages/PPM stable otherwise.
function summaryDisplayValue(row, key) {
  const meta = currentSummaryMeta();
  const monthMatch = String(key).match(/^m(\d{1,2})$/);
  if (String(row?.category || "") === "PPM") {
    if (monthMatch && Number(monthMatch[1]) < meta.currentMonth) {
      const fallback = summaryMonthDisplayFallback(row, Number(monthMatch[1]));
      return fallback > 0 ? fallback : row[key];
    }
    return row[key];
  }
  if (monthMatch && Number(monthMatch[1]) < meta.currentMonth) {
    const fallback = summaryMonthDisplayFallback(row, Number(monthMatch[1]));
    return fallback > 0 ? fallback : row[key];
  }
  if (key === "total") {
    const base = splitSummaryValue(row?.total);
    const total = summaryDisplayedYearMain(row);
    if (total <= base.main) return row[key];
    return base.hasParen ? `${total}(${base.paren})` : total;
  }
  if (key === "avg") {
    const totalBase = splitSummaryValue(row?.total);
    const computedTotal = summaryDisplayedYearMain(row);
    if (computedTotal <= totalBase.main) return row[key];
    const base = splitSummaryValue(row?.avg);
    const months = summaryDisplayedActiveMonths(row);
    const avg = months ? Math.round(computedTotal / months) : 0;
    return base.hasParen ? `${avg}(${base.paren})` : avg;
  }
  return row[key];
}

// Final UTF-8-safe renderer override. Text labels use unicode escapes so the
// file can be appended safely even when older bytes in this file are mixed.
function renderSummaryDynamicFinal() {
  const table = document.getElementById("summaryTable");
  if (!table) return;
  const meta = currentSummaryMeta();
  const keys = summaryDynamicKeys(meta);
  const today = new Date();
  const todayCandidate = summaryDateKey(today);
  const todayKey = meta.dayColumns.some((column) => column.key === todayCandidate) ? todayCandidate : "";
  const beforeMonthHeaders = meta.preMonths.map((month) => `<th rowspan="3">${month}\uC6D4</th>`).join("");
  const afterMonthHeaders = meta.postMonths.map((month) => `<th rowspan="3">${month}\uC6D4</th>`).join("");
  const preWeekHeaders = meta.preWeeks.map((week) => `<th rowspan="2">${escapeHtml(week.label)}</th>`).join("");
  const dayHeaders = meta.dayColumns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const currentColspan = meta.preWeeks.length + meta.dayColumns.length + 1;
  const rowCells = (row) => keys.map((key) => basicCell(summaryDisplayValue(row, key), row.category !== "PPM" && key === todayKey)).join("");

  table.innerHTML = `
    <colgroup>
      <col class="summary-col-category" />
      ${keys.map((key) => `<col class="${key === "prevTotal" || key === "prevAvg" ? "summary-col-prev" : key === "total" || key === "avg" ? "summary-col-total" : "summary-col-month"}" />`).join("")}
    </colgroup>
    <thead>
      <tr>
        <th class="category" rowspan="3">\uAD6C\uBD84</th>
        <th colspan="2">25\uB144</th>
        ${beforeMonthHeaders}
        <th colspan="${currentColspan}">${escapeHtml(meta.monthLabel)}</th>
        ${afterMonthHeaders}
        <th rowspan="3">\uD569\uACC4</th>
        <th rowspan="3">\uC6D4<br />\uD3C9\uADE0</th>
      </tr>
      <tr>
        <th rowspan="2">\uD569\uACC4</th>
        <th rowspan="2">\uC6D4<br />\uD3C9\uADE0</th>
        ${preWeekHeaders}
        <th colspan="${Math.max(1, meta.dayColumns.length)}">${escapeHtml(meta.currentWeekLabel)}</th>
        <th rowspan="2">\uD569\uACC4</th>
      </tr>
      <tr>
        ${dayHeaders || "<th>-</th>"}
      </tr>
    </thead>
    <tbody>
      ${state.summary.length ? state.summary.map((row) => {
        const categoryText = String(row.category || "");
        const rowClass = categoryText.includes("\uACC4") ? "sum-row" : categoryText === "PPM" ? "ppm-row" : "";
        return `<tr class="${rowClass}"><th class="side-head">${escapeHtml(row.category)}</th>${rowCells(row)}</tr>`;
      }).join("") : document.getElementById("emptyState").innerHTML}
    </tbody>`;
}

function renderSummary() {
  renderSummaryDynamicFinal();
}

// Final robust receipt-history month fallback. This reads input #3 (receipt history)
// directly by headers, so June is filled like January-May even after month rollover.
function compactText(value) {
  return String(value ?? "").replace(/\s+/g, "").trim();
}

function valueByHeader(row, patterns) {
  const headers = row.__headers || [];
  const cells = row.__cells || [];
  for (let index = 0; index < headers.length; index += 1) {
    const header = compactText(headers[index]);
    if (patterns.some((pattern) => pattern.test(header))) return cells[index];
  }
  const direct = Object.entries(row || {}).find(([key, value]) => {
    if (String(key).startsWith("__")) return false;
    return patterns.some((pattern) => pattern.test(compactText(key))) && String(value ?? "").trim();
  });
  return direct ? direct[1] : "";
}

function robustReceiptNumber(row) {
  return valueByHeader(row, [/^\uBC88\uD638$/, /^\uC21C\uBC88$/, /^No$/i, /^NO$/i, /\uC811\uC218\uBC88\uD638/, /\uC811\uC218No/i]);
}

function robustReceiptDate(row) {
  const byHeader = valueByHeader(row, [/\uC811\uC218\uC77C\uC790/, /\uC811\uC218\uC77C/, /^date$/i]);
  return parseDateFromText(byHeader) || findReceiptDate([row]) || parseDateFromText(row.__sheetDate) || findDateInRow(row);
}

function robustIsCountableReceiptRow(row) {
  const number = String(robustReceiptNumber(row) || "").trim();
  if (!number) return false;
  if (/\uBC88\uD638|\uC21C\uBC88|\uC811\uC218/.test(number)) return false;
  const detail = receiptDetailRow(row);
  if (hasReceiptDetailData(detail)) return true;
  return (row.__cells || rowValues(row)).filter((cell) => String(cell ?? "").trim()).length >= 4;
}

function robustReceiptCategoryIndex(row) {
  const pending = compactText(valueByHeader(row, [/\uBBF8\uACB0\uAD6C\uBD84/, /\uC2DC\uACF5\uBBF8\uACB0/, /\uBBF8\uACB0/]));
  if (pending === "0") return 0;
  const type = compactText(valueByHeader(row, [/\uC720\uD615/, /\uAD6C\uBD84/, /\uBD84\uB958/, /^type$/i]));
  if (/\uAC10\uC131|\uCDE8\uAE09/.test(type)) return 2;
  return 1;
}

function summaryCategoryIndex(category) {
  const text = compactText(category);
  if (text === "PPM") return -2;
  if (/\uACC4$|^\uACC4$/.test(text)) return -1;
  if (/\uC2DC\uACF5|\uBBF8\uACB0/.test(text)) return 0;
  if (/\uAC10\uC131|\uCDE8\uAE09/.test(text)) return 2;
  return 1;
}

function receiptHistoryRowsForMonth(month, year = 2026) {
  const historyEntries = state.uploads.filter((entry) => entry.kind === "receiptHistory");
  const sourceEntries = historyEntries.length ? historyEntries : state.uploads.filter((entry) => entry.kind === "summary");
  return sourceEntries.flatMap((entry) => {
    const excluded = clamp(Number(entry.excluded || 0), 0, (entry.rows || []).length);
    return (entry.rows || []).slice(excluded).map((row) => row.__raw || row);
  }).map((row) => ({ row, date: robustReceiptDate(row) }))
    .filter(({ row, date }) => date && date.getFullYear() === year && date.getMonth() + 1 === month && robustIsCountableReceiptRow(row));
}

function summaryDirectMonthFallback(category, month) {
  const rows = receiptHistoryRowsForMonth(month, 2026);
  if (!rows.length) return 0;
  const target = summaryCategoryIndex(category);
  if (target === -2) return 0;
  if (target === -1) return rows.length;
  return rows.filter(({ row }) => robustReceiptCategoryIndex(row) === target).length;
}

function summaryMonthDisplayFallback(row, month) {
  const direct = splitSummaryValue(row?.[`m${month}`]);
  if (direct.hasValue && direct.main > 0) return direct.main;
  const total = splitSummaryValue(row?.[`m${month}Total`]);
  if (total.hasValue && total.main > 0) return total.main;
  const directHistory = summaryDirectMonthFallback(row?.category, month);
  if (directHistory > 0) return directHistory;
  if (month === 6) {
    const juneKeys = ["w1", "w2", "w3", "d622", "d623", "d624", "d625", "d626", "d629", "d630"];
    return juneKeys.reduce((sum, key) => sum + splitSummaryValue(row?.[key]).main, 0);
  }
  return 0;
}

// Use calendar week progression when the data month equals the real current month.
function buildClaimSummaryMeta(latestDate) {
  const today = new Date();
  let base = latestDate || today;
  if (latestDate && today.getFullYear() === latestDate.getFullYear() && today.getMonth() === latestDate.getMonth() && dateStamp(today) > dateStamp(latestDate)) {
    base = today;
  }
  const currentYear = base.getFullYear();
  const currentMonth = base.getMonth() + 1;
  const groups = claimSummaryWeekGroups(currentYear, currentMonth);
  let currentGroupIndex = groups.findIndex((group) => group.some((date) => dateStamp(date) === dateStamp(base)));
  if (currentGroupIndex < 0) currentGroupIndex = Math.max(0, groups.length - 1);
  const preWeeks = groups.slice(0, currentGroupIndex).map((group, index) => ({
    key: `w${index + 1}`,
    label: `${index + 1}\uC8FC`,
    dates: group
  }));
  const currentGroup = groups[currentGroupIndex] || weekdaysForDate(base);
  return {
    currentYear,
    currentMonth,
    monthLabel: `${currentMonth}\uC6D4`,
    preMonths: Array.from({ length: Math.max(0, currentMonth - 1) }, (_, index) => index + 1),
    postMonths: Array.from({ length: Math.max(0, 12 - currentMonth) }, (_, index) => currentMonth + 1 + index),
    preWeeks,
    currentWeekLabel: `${currentGroupIndex + 1}\uC8FC`,
    dayColumns: currentGroup.map((date) => ({
      key: summaryDateKey(date),
      label: `${date.getMonth() + 1}/${date.getDate()}`,
      date
    })),
    monthTotalKey: `m${currentMonth}Total`
  };
}

// UI add-on: daily receipt cards, section controls, and quality-cost collapse.
(function () {
  var costCollapsed = false;

  function opt(select, value, text) {
    var option = document.createElement("option");
    option.value = String(value);
    option.textContent = text;
    select.appendChild(option);
  }

  function fillSelect(id, values, selectedValue) {
    var select = document.getElementById(id);
    if (!select) return;
    if (!select.options.length) {
      values.forEach(function (item) { opt(select, item.value, item.text); });
    }
    if (selectedValue !== undefined && selectedValue !== null) select.value = String(selectedValue);
  }

  function setupPeriodControls() {
    var now = new Date();
    var years = [2025, 2026, 2027].map(function (year) {
      return { value: year, text: year + "\uB144" };
    });
    var months = Array.from({ length: 12 }, function (_, index) {
      var month = index + 1;
      return { value: month, text: month + "\uC6D4" };
    });
    var weeks = Array.from({ length: 5 }, function (_, index) {
      var week = index + 1;
      return { value: week, text: week + "\uC8FC" };
    });

    if (!window.__USE_EXTERNAL_DAILY_STABLE) {
      fillSelect("dailyYearSelect", years, now.getFullYear());
      fillSelect("dailyMonthSelect", months, now.getMonth() + 1);
      fillSelect("dailyWeekSelect", weeks, 1);
    }
    fillSelect("weeklyYearSelect", years, now.getFullYear());
    fillSelect("weeklyWeekSelect", weeks, typeof weeklySelectedWeek !== "undefined" && weeklySelectedWeek ? weeklySelectedWeek : 1);
    fillSelect("monthlyYearSelect", years, now.getFullYear());
  }

  function setupCostToggle() {
    var button = document.getElementById("toggleCostSection");
    var body = document.getElementById("qualityCostBody");
    if (!button || !body || button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    button.addEventListener("click", function () {
      costCollapsed = !costCollapsed;
      body.classList.toggle("is-hidden", costCollapsed);
      button.setAttribute("aria-expanded", String(!costCollapsed));
    });
  }

  function statAmount(value) {
    if (typeof normalizeCostStat === "function") return normalizeCostStat(value).amount || 0;
    return Number(String(value || "").replace(/[^\d.-]/g, "")) || 0;
  }

  function cardNumber(value) {
    if (typeof formatNumber === "function") return formatNumber(value);
    return Number(value || 0).toLocaleString("ko-KR");
  }

  function safeEscape(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }

  function detailRowsForDailyCards() {
    return Array.isArray(state.details) ? state.details.filter(function (row) {
      return Object.values(row || {}).some(function (value) { return String(value || "").trim(); });
    }) : [];
  }

  function topReceiptItems(rows) {
    var map = new Map();
    rows.forEach(function (row) {
      var code = String(row.code || row.productCode || "").trim();
      var color = String(row.color || "").trim();
      if (!code) return;
      var label = color ? code + " / " + color : code;
      map.set(label, (map.get(label) || 0) + 1);
    });
    return Array.from(map.entries()).map(function (entry) {
      return { label: entry[0], count: entry[1] };
    }).sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label); }).slice(0, 5);
  }

  function renderDailyReceiptCards() {
    var box = document.getElementById("dailyReceiptCards");
    if (!box) return;
    var rows = detailRowsForDailyCards();
    var count = rows.length;
    var failureRow = (state.cost || []).find(function (row) {
      return String(row.item || "").indexOf("\uC2E4\uD328") >= 0;
    }) || (state.cost || [])[1] || {};
    var loss = statAmount(failureRow.monthTotal);
    var topItems = topReceiptItems(rows);
    var first = topItems[0] || { label: "-", count: 0 };
    box.innerHTML = [
      '<article class="daily-receipt-card"><span>\uC811\uC218\uAC74\uC218</span><strong>' + cardNumber(count) + '</strong><em>\uAC74</em><small>\uC120\uD0DD \uC790\uB8CC \uAE30\uC900</small></article>',
      '<article class="daily-receipt-card"><span>\uC190\uC2E4\uAE08\uC561</span><strong>' + cardNumber(loss) + '</strong><em>\uC6D0</em><small>\uD488\uC9C8\uBE44\uC6A9 \uC2E4\uD328\uBE44\uC6A9 \uAE30\uC900</small></article>',
      '<article class="daily-receipt-card"><span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="purple">' + safeEscape(first.label) + '</strong><em>' + cardNumber(first.count) + '\uAC74</em><small>\uC81C\uD488\uCF54\uB4DC + \uC0C9\uC0C1 TOP 5</small><div class="daily-receipt-tags">' + topItems.map(function (item) { return "<span>" + safeEscape(item.label) + " " + cardNumber(item.count) + "\uAC74</span>"; }).join("") + '</div></article>'
    ].join("");
  }

  function setupUiAddon() {
    setupPeriodControls();
    if (!window.__USE_EXTERNAL_DAILY_STABLE) renderDailyReceiptCards();
    setupCostToggle();
  }

  var previousRenderAll = typeof renderAll === "function" ? renderAll : null;
  if (previousRenderAll && !window.__dailyReceiptUiWrapped) {
    window.__dailyReceiptUiWrapped = true;
    renderAll = function (message) {
      previousRenderAll(message);
      setupUiAddon();
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupUiAddon);
  } else {
    setTimeout(setupUiAddon, 0);
  }
})();

// Final UI adjustments requested on 2026-07-02: title controls, collapsed cost, dblclick pies, compact linked list.
(function () {
  function safeText(value) {
    return typeof escapeHtml === "function" ? escapeHtml(value) : String(value == null ? "" : value);
  }

  function safeJs(value) {
    return typeof escapeJs === "function" ? escapeJs(value) : String(value == null ? "" : value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  }

  function numText(value) {
    return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR");
  }

  function addOption(select, value, text) {
    var option = document.createElement("option");
    option.value = String(value);
    option.textContent = text;
    select.appendChild(option);
  }

  function fillSelectFinal(id, values, selectedValue) {
    var select = document.getElementById(id);
    if (!select) return;
    if (!select.options.length) values.forEach(function (item) { addOption(select, item.value, item.text); });
    if (selectedValue !== undefined && selectedValue !== null) select.value = String(selectedValue);
  }

  function setupPeriodControlsFinal() {
    var now = new Date();
    var years = [2025, 2026, 2027].map(function (year) { return { value: year, text: year + "\uB144" }; });
    var months = Array.from({ length: 12 }, function (_, index) {
      var month = index + 1;
      return { value: month, text: month + "\uC6D4" };
    });
    var weeks = Array.from({ length: 5 }, function (_, index) {
      var week = index + 1;
      return { value: week, text: week + "\uC8FC" };
    });
    if (!window.__USE_EXTERNAL_DAILY_STABLE) {
      fillSelectFinal("dailyYearSelect", years, now.getFullYear());
      fillSelectFinal("dailyMonthSelect", months, now.getMonth() + 1);
      fillSelectFinal("dailyWeekSelect", weeks, 1);
    }
    fillSelectFinal("weeklyYearSelect", years, now.getFullYear());
    fillSelectFinal("weeklyMonthSelect", months, now.getMonth() + 1);
    fillSelectFinal("monthlyYearSelect", years, now.getFullYear());
  }

  function setupCostCollapseFinal() {
    var section = document.querySelector(".quality-cost-section");
    var dailyBody = document.querySelector("#dailyDashboardPanel .dashboard-group-body");
    if (section && dailyBody && section.parentElement === dailyBody && dailyBody.lastElementChild !== section) dailyBody.appendChild(section);

    var button = document.getElementById("toggleCostSection");
    var body = document.getElementById("qualityCostBody");
    if (!button || !body) return;
    if (window.__qualityCostCollapsedFinal === undefined) window.__qualityCostCollapsedFinal = true;
    if (button.dataset.finalBound !== "1") {
      var clone = button.cloneNode(true);
      button.parentNode.replaceChild(clone, button);
      button = clone;
      button.dataset.finalBound = "1";
      button.dataset.bound = "1";
      button.addEventListener("click", function () {
        window.__qualityCostCollapsedFinal = !window.__qualityCostCollapsedFinal;
        applyCostCollapseFinal();
      });
    }
    applyCostCollapseFinal();
  }

  function applyCostCollapseFinal() {
    var button = document.getElementById("toggleCostSection");
    var body = document.getElementById("qualityCostBody");
    if (!button || !body) return;
    var collapsed = !!window.__qualityCostCollapsedFinal;
    body.classList.toggle("is-hidden", collapsed);
    button.setAttribute("aria-expanded", String(!collapsed));
  }

  window.openLinkedSheetUrl = function (url) {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  renderLinkedDataList = function () {
    var holder = document.getElementById("linkedDataList");
    if (!holder) return;
    var groups = allLinkedDisplayGroups();
    if (!groups.length) {
      holder.innerHTML = '<div class="linked-empty">\uC5F0\uACB0\uB41C \uB9C1\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
      return;
    }
    holder.innerHTML = groups.map(function (group) {
      var first = (group.items || []).find(function (entry) { return entry.sourceUrl; }) || {};
      var title = linkedGroupDisplayTitle(group);
      var url = first.sourceUrl || "";
      return '<div class="linked-row" title="' + safeText(url) + '">' +
        '<div><strong>' + safeText(title) + '</strong></div>' +
        '<div class="linked-actions">' +
          (url ? '<button type="button" onclick="openLinkedSheetUrl(\'' + safeJs(url) + '\')">\uB9C1\uD06C \uC5F4\uAE30</button>' : '') +
          '<button type="button" onclick="deleteLinkedGroup(\'' + safeJs(group.key) + '\')">\uC0AD\uC81C</button>' +
        '</div>' +
      '</div>';
    }).join("");
  };

  function pieLegendWithAmountMarkup(items) {
    var colors = typeof weeklyPieColors === "function" ? weeklyPieColors() : ["#1f73e8", "#f59f00", "#23a455", "#e55353", "#7950f2", "#12b886"];
    return items.map(function (item, index) {
      var amount = Number(item.amount || 0);
      var amountText = amount ? ' / ' + numText(amount) + '\uC6D0' : '';
      return '<div><i style="background:' + colors[index % colors.length] + '"></i><span>' + safeText(item.label) + '</span><em>' + numText(item.value) + '\uAC74' + amountText + '</em></div>';
    }).join("");
  }

  weeklyPieLegendMarkup = pieLegendWithAmountMarkup;

  function sourcePieGradientForPopup(items) {
    if (!items.length) return "#e5e7eb";
    var total = items.reduce(function (sum, item) { return sum + Number(item.value || 0); }, 0);
    var start = 0;
    return "conic-gradient(" + items.map(function (item) {
      var end = start + (total ? (Number(item.value || 0) / total) * 100 : 0);
      var color = WEEKLY_SOURCE_PIE_COLOR_MAP[item.label] || "#495057";
      var seg = color + " " + start.toFixed(3) + "% " + end.toFixed(3) + "%";
      start = end;
      return seg;
    }).join(", ") + ")";
  }
  function sourcePieLegendMarkupForPopup(items) {
    var total = items.reduce(function (sum, item) { return sum + Number(item.value || 0); }, 0);
    return items.map(function (item) {
      var color = WEEKLY_SOURCE_PIE_COLOR_MAP[item.label] || "#495057";
      var pct = total ? Math.round((Number(item.value || 0) / total) * 1000) / 10 : 0;
      return '<div><i style="background:' + color + '"></i><span>' + safeText(item.label) + '</span><em>' + numText(item.value) + '\uAC74 (' + pct + '%)</em></div>';
    }).join("");
  }

  openTypePiePopup = function (title, items, sourceItems) {
    var hasSource = Array.isArray(sourceItems) && sourceItems.length > 0;
    var popup = window.open("", "typePie_" + Date.now(), "popup=yes,width=" + (hasSource ? 1100 : 760) + ",height=640,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
    if (!popup) return;
    var totalCount = items.reduce(function (sum, item) { return sum + Number(item.value || 0); }, 0);
    var totalAmount = items.reduce(function (sum, item) { return sum + Number(item.amount || 0); }, 0);
    var typeGroup = items.length
      ? '<div class="pie-group"><div class="pie-group-title">\uC720\uD615\uBCC4 \uD604\uD669</div><div class="body"><div class="donut" style="background:' + weeklyPieGradient(items) + '"><b>' + numText(totalCount) + '\uAC74' + (totalAmount ? '<small>' + numText(totalAmount) + '\uC6D0</small>' : '') + '</b></div><div class="legend">' + pieLegendWithAmountMarkup(items) + '</div></div></div>'
      : '<div class="empty">\uD45C\uC2DC\uD560 \uC720\uD615 \uC790\uB8CC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
    var sourceTotal = hasSource ? sourceItems.reduce(function (sum, item) { return sum + Number(item.value || 0); }, 0) : 0;
    var sourceGroup = hasSource
      ? '<div class="pie-group"><div class="pie-group-title">\uC6D0\uC778\uCC98\uBCC4 \uD604\uD669</div><div class="body"><div class="donut" style="background:' + sourcePieGradientForPopup(sourceItems) + '"><b>' + numText(sourceTotal) + '\uAC74</b></div><div class="legend">' + sourcePieLegendMarkupForPopup(sourceItems) + '</div></div></div>'
      : "";
    popup.document.write('<!doctype html><html lang="ko"><head><meta charset="utf-8" />' +
      '<title>' + safeText(title) + '</title><style>' +
      'body{margin:0;color:#111827;background:#f7f7f7;font-family:"Malgun Gothic","Segoe UI",Arial,sans-serif}' +
      'header{position:sticky;top:0;padding:18px 22px;border-bottom:1px solid #dde3ea;background:#fff}' +
      'h1{margin:0;font-size:24px}.close{position:absolute;right:16px;top:10px;border:0;background:#fff;font-size:24px;font-weight:900;cursor:pointer}' +
      '.pie-groups{display:flex;gap:24px;flex-wrap:wrap;justify-content:center;padding:28px}' +
      '.pie-group{background:#fff;border-radius:10px;padding:20px;flex:1 1 380px;max-width:460px}' +
      '.pie-group-title{text-align:center;font-weight:900;font-size:14px;color:#374151;margin-bottom:14px}' +
      '.body{display:flex;gap:24px;align-items:center;justify-content:center}.donut{position:relative;width:220px;height:220px;flex:0 0 220px;border-radius:50%}' +
      '.donut:after{position:absolute;inset:60px;border-radius:50%;background:#fff;content:""}.donut b{position:absolute;z-index:1;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:28px}.donut small{font-size:12px;color:#4b5563}' +
      '.legend{display:grid;gap:9px;min-width:160px;max-width:260px}.legend div{display:grid;grid-template-columns:11px minmax(52px,auto) auto;gap:4px;align-items:center}.legend i{width:11px;height:11px;border-radius:50%}.legend span{font-weight:900;font-size:13px;line-height:1.25;white-space:nowrap}.legend em{font-style:normal;color:#4b5563;font-weight:800;font-size:12.5px;white-space:nowrap}.empty{padding:40px;text-align:center;font-weight:900;color:#687482}' +
      '</style></head><body><header><button class="close" onclick="window.close()">\u00D7</button><h1>' + safeText(title) + '</h1></header>' +
      '<div class="pie-groups">' + typeGroup + sourceGroup + '</div>' +
      '</body></html>');
    popup.document.close();
    attachEscToClose(popup);
  };

  weeklyTypePieItems = function (week) {
    var map = new Map();
    weeklyDashboardMetas(monthlyStatusRows()).filter(function (row) { return row.week === week; }).forEach(function (row) {
      var key = row.type || "\uBBF8\uBD84\uB958";
      if (!map.has(key)) map.set(key, { label: key, receipts: new Set(), amountBase: 0 });
      var target = map.get(key);
      target.receipts.add(row.receiptNo);
      target.amountBase += weeklyAmount(row);
    });
    return Array.from(map.values()).map(function (item) {
      var count = item.receipts.size;
      return { label: item.label, value: count, amount: item.amountBase + count * penaltyPerClaim };
    }).filter(function (item) { return item.value > 0; }).sort(function (a, b) { return b.value - a.value || b.amount - a.amount || a.label.localeCompare(b.label, "ko", { numeric: true }); });
  };

  openWeeklyWeekTypePopup = function (week) {
    weeklySelectedWeek = week;
    weeklyExpandedLine = "";
    weeklyExpandedType = "";
    renderWeeklyDefect();
    var weekRows = weeklyDashboardMetas(monthlyStatusRows()).filter(function (row) { return row.week === week; });
    openTypePiePopup(week + " \uC720\uD615\uBCC4 \uD604\uD669", weeklyTypePieItems(week), weeklySourcePieItems(weekRows));
  };

  openMonthlyDefectTypePopup = function (month) {
    monthlyDefectSelectedMonth = month;
    monthlyExpandedLine = "";
    monthlyExpandedType = "";
    renderMonthDefect();
    var scopedRows = monthlyDefectScopedRows(monthlyDeadlineMetas());
    var items = monthlyTypeDetails(scopedRows).map(function (item) {
      return { label: item.label, value: item.count, amount: item.amount };
    });
    openTypePiePopup(month + " \uC720\uD615\uBCC4 \uD604\uD669", items, monthlyDefectSourcePieItems(scopedRows));
  };

  function barHoverPieGroupMarkup(title, items, gradient, legendHtml) {
    if (!items.length) return "";
    var total = items.reduce(function (sum, item) { return sum + Number(item.value || 0); }, 0);
    return '<div class="bhp-group"><div class="bhp-group-title">' + safeText(title) + '</div><div class="bhp-body">' +
      '<div class="bhp-donut" style="background:' + gradient + '"><b>' + numText(total) + '\uAC74</b></div>' +
      '<div class="bhp-legend">' + legendHtml + '</div></div></div>';
  }

  function barHoverCardMarkup(title, items, sourceItems) {
    var typeGroup = barHoverPieGroupMarkup("\uC720\uD615\uBCC4 \uD604\uD669", items, weeklyPieGradient(items), pieLegendWithAmountMarkup(items));
    var sourceGroup = barHoverPieGroupMarkup("\uC6D0\uC778\uCC98\uBCC4 \uD604\uD669", sourceItems, sourcePieGradientForPopup(sourceItems), sourcePieLegendMarkupForPopup(sourceItems));
    if (!typeGroup && !sourceGroup) return "";
    return '<div class="bhp-title">' + safeText(title) + '</div><div class="bhp-groups">' + typeGroup + sourceGroup + '</div>';
  }

  function ensureBarHoverCard() {
    var card = document.getElementById("barHoverCard");
    if (!card) {
      card = document.createElement("div");
      card.id = "barHoverCard";
      card.className = "bar-hover-card";
      document.body.appendChild(card);
    }
    return card;
  }

  window.showBarHoverPie = function (anchorEl, type, key, evt) {
    var data = null;
    if (type === "daily") {
      data = typeof window.__dailyStableGetHoverPieData === "function" ? window.__dailyStableGetHoverPieData(key) : null;
    } else if (type === "weekly") {
      var weekRows = weeklyDashboardMetas(monthlyStatusRows()).filter(function (row) { return row.week === key; });
      data = { title: key + " \uC720\uD615\uBCC4 \uD604\uD669", items: weeklyTypePieItems(key), sourceItems: weeklySourcePieItems(weekRows) };
    } else if (type === "monthly") {
      var monthRows = monthlyDeadlineMetas().filter(function (row) { return row.month === key; });
      var items = monthlyTypeDetails(monthRows).map(function (item) { return { label: item.label, value: item.count, amount: item.amount }; });
      data = { title: key + " \uC720\uD615\uBCC4 \uD604\uD669", items: items, sourceItems: monthlyDefectSourcePieItems(monthRows) };
    }
    if (!data) return;
    var html = barHoverCardMarkup(data.title, data.items || [], data.sourceItems || []);
    if (!html) return;
    var card = ensureBarHoverCard();
    card.innerHTML = html;
    card.classList.add("show");
    var cardW = card.offsetWidth, cardH = card.offsetHeight;
    var margin = 20;
    var rect = anchorEl.getBoundingClientRect();
    var cx = evt ? evt.clientX : (rect.left + rect.width / 2);
    var cy = evt ? evt.clientY : rect.top;
    var left = cx + margin;
    var top = cy + margin;
    if (left + cardW > window.innerWidth) left = cx - cardW - margin;
    if (top + cardH > window.innerHeight) top = cy - cardH - margin;
    left = Math.max(8, Math.min(left, window.innerWidth - cardW - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - cardH - 8));
    card.style.left = left + "px";
    card.style.top = top + "px";
  };

  window.hideBarHoverPie = function () {
    var card = document.getElementById("barHoverCard");
    if (card) card.classList.remove("show");
  };

  window.openBigTypePiePopup = function (title, items) {
    var popup = window.open("", "bigTypePie_" + Date.now(), "popup=yes,width=760,height=520,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
    if (!popup) return;
    var body = items.length
      ? '<div class="pie-big-body"><div class="pie-big-donut" style="background:' + weeklyPieGradient(items) + '"><b>' + numText(items.reduce(function (sum, item) { return sum + Number(item.value || 0); }, 0)) + '건</b></div><div class="pie-big-legend">' + bigTypePieLegendMarkup(items) + '</div></div>'
      : '<div class="empty">표시할 자료가 없습니다.</div>';
    popup.document.write('<!doctype html><html lang="ko"><head><meta charset="utf-8" />' +
      '<title>' + safeText(title) + '</title><style>' +
      'body{margin:0;color:#111827;background:#f7f7f7;font-family:"Malgun Gothic","Segoe UI",Arial,sans-serif}' +
      'header{position:sticky;top:0;padding:18px 22px;border-bottom:1px solid #dde3ea;background:#fff}' +
      'h1{margin:0;font-size:20px}.close{position:absolute;right:16px;top:10px;border:0;background:#fff;font-size:24px;font-weight:900;cursor:pointer}' +
      '.pie-big-body{display:flex;align-items:center;justify-content:center;gap:36px;padding:36px 30px}' +
      '.pie-big-donut{position:relative;width:280px;height:280px;flex:0 0 280px;border-radius:50%}' +
      '.pie-big-donut::after{position:absolute;inset:78px;border-radius:50%;background:#fff;content:""}' +
      '.pie-big-donut b{position:absolute;z-index:1;inset:0;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900}' +
      '.pie-big-legend{display:grid;gap:14px;min-width:220px}' +
      '.pie-big-legend div{display:grid;grid-template-columns:14px minmax(80px,auto) auto;gap:12px;align-items:center;white-space:nowrap}' +
      '.pie-big-legend i{width:14px;height:14px;border-radius:50%}' +
      '.pie-big-legend span{font-weight:900;font-size:16px}' +
      '.pie-big-legend em{font-style:normal;color:#4b5563;font-weight:800;font-size:14.5px}' +
      '.pie-big-legend .legend-total{border-top:2px solid #dde3ea;padding-top:12px;margin-top:2px}' +
      '.pie-big-legend .legend-total i{background:transparent}' +
      '.pie-big-legend .legend-total span{font-size:17px;color:#111827}' +
      '.pie-big-legend .legend-total em{font-size:16px;color:#111827;font-weight:900}' +
      '.empty{padding:40px;text-align:center;font-weight:900;color:#687482}' +
      '</style></head><body><header><button class="close" onclick="window.close()">×</button><h1>' + safeText(title) + '</h1></header>' +
      body +
      '</body></html>');
    popup.document.close();
    attachEscToClose(popup);
  };

  function bigTypePieLegendMarkup(items) {
    var rows = pieLegendWithAmountMarkup(items);
    var totalValue = items.reduce(function (sum, item) { return sum + Number(item.value || 0); }, 0);
    var totalAmount = items.reduce(function (sum, item) { return sum + Number(item.amount || 0); }, 0);
    var totalText = numText(totalValue) + "건" + (totalAmount ? " / " + numText(totalAmount) + "원" : "");
    return rows + '<div class="legend-total"><i></i><span>합계</span><em>' + totalText + '</em></div>';
  }

  function setupFinalUi() {
    setupPeriodControlsFinal();
    setupCostCollapseFinal();
    if (typeof renderLinkedDataList === "function") renderLinkedDataList();
  }

  var prevRenderAllFinal20260702 = typeof renderAll === "function" ? renderAll : null;
  if (prevRenderAllFinal20260702 && !window.__finalUi20260702Wrapped) {
    window.__finalUi20260702Wrapped = true;
    renderAll = function (message) {
      prevRenderAllFinal20260702(message);
      setupFinalUi();
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupFinalUi);
  else setTimeout(setupFinalUi, 0);
})();

// Final display fixes: daily receipt top item rule and EA labels for defect top items.
(function () {
  function finalFormatNumber(value) {
    return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR");
  }

  function finalEscape(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }

  function finalNumeric(value) {
    if (typeof numeric === "function") return numeric(value);
    return Number(String(value || "").replace(/[^\d.-]/g, "")) || 0;
  }

  function finalDetailRows() {
    return Array.isArray(state.details) ? state.details.filter(function (row) {
      return Object.values(row || {}).some(function (value) { return String(value || "").trim(); });
    }) : [];
  }

  function finalIsPendingReceipt(row) {
    var text = [row.category, row.claimCategory, row.status, row.pending, row.pendingFlag].map(function (value) {
      return String(value || "").replace(/\s+/g, "");
    }).join(" ");
    return text.indexOf("\uC2DC\uACF5\uBBF8\uACB0") >= 0 || text.indexOf("\uC2DC\uACF5") >= 0 && text.indexOf("\uBBF8\uACB0") >= 0;
  }

  function finalProductLabel(row) {
    var code = String(row.code || row.productCode || row["\uC81C\uD488\uCF54\uB4DC"] || "").trim();
    var color = String(row.color || row["\uC0C9\uC0C1"] || "").trim();
    if (!code) return "";
    return color ? code + " / " + color : code;
  }

  function finalRowAmount(row) {
    var preferredKeys = ["amount", "loss", "cost", "price", "defectAmount", "\uAE08\uC561", "\uC190\uC2E4\uAE08\uC561"];
    for (var i = 0; i < preferredKeys.length; i += 1) {
      var amount = finalNumeric(row[preferredKeys[i]]);
      if (amount) return amount;
    }
    return Object.entries(row || {}).reduce(function (max, entry) {
      var key = String(entry[0] || "");
      if (!/amount|cost|price|\uAE08\uC561|\uC190\uC2E4/i.test(key)) return max;
      return Math.max(max, finalNumeric(entry[1]));
    }, 0);
  }

  function finalTopReceiptItems(rows, options) {
    var byAmount = options && options.byAmount;
    var limit = options && options.limit || 5;
    var map = new Map();
    rows.forEach(function (row) {
      var label = finalProductLabel(row);
      if (!label) return;
      if (!map.has(label)) map.set(label, { label: label, count: 0, amount: 0 });
      var item = map.get(label);
      item.count += 1;
      item.amount += finalRowAmount(row);
    });
    return Array.from(map.values()).sort(function (a, b) {
      return byAmount
        ? b.amount - a.amount || b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true })
        : b.count - a.count || b.amount - a.amount || a.label.localeCompare(b.label, "ko", { numeric: true });
    }).slice(0, limit);
  }

  function applyDailyReceiptTopItemRule() {
    var box = document.getElementById("dailyReceiptCards");
    if (!box || box.children.length < 3) return;
    var rows = finalDetailRows();
    var pendingRows = rows.filter(finalIsPendingReceipt);
    var topItems = pendingRows.length
      ? finalTopReceiptItems(pendingRows, { limit: 5 })
      : finalTopReceiptItems(rows, { limit: 1, byAmount: true });
    var first = topItems[0] || { label: "-", count: 0 };
    var helper = pendingRows.length
      ? "\uC2DC\uACF5\uBBF8\uACB0 \uD488\uBAA9 TOP 5"
      : "\uC2DC\uACF5\uBBF8\uACB0 \uC5C6\uC74C \u00B7 \uC190\uC2E4\uAE08\uC561 \uCD5C\uB300 \uD488\uBAA9";
    box.children[2].innerHTML =
      '<span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span>' +
      '<strong class="purple">' + finalEscape(first.label) + '</strong><em>' + finalFormatNumber(first.count) + '\uAC74</em>' +
      '<small>' + helper + '</small>' +
      '<div class="daily-receipt-tags">' + topItems.map(function (item) {
        return '<span>' + finalEscape(item.label) + ' ' + finalFormatNumber(item.count) + '\uAC74</span>';
      }).join("") + '</div>';
  }

  function applyEaLabels(rootSelector) {
    // \uC8FC\uC694 \uD074\uB808\uC784 \uD488\uBAA9\uC774 \uAC74\uC218(count) \uAE30\uC900\uC73C\uB85C \uD45C\uC2DC\uB418\uBBC0\uB85C "\uAC74" -> "EA" \uBCC0\uD658\uC744 \uD558\uC9C0 \uC54A\uC74C.
  }

  function applyLatestDisplayFixes() {
    applyDailyReceiptTopItemRule();
    applyEaLabels("#weeklyDefectContent");
    applyEaLabels("#monthDefectContent");
  }

  var prevRenderAllLatestDisplay = typeof renderAll === "function" ? renderAll : null;
  if (prevRenderAllLatestDisplay && !window.__latestDisplayFixesWrapped) {
    window.__latestDisplayFixesWrapped = true;
    renderAll = function (message) {
      prevRenderAllLatestDisplay(message);
      applyLatestDisplayFixes();
    };
  }

  var prevWeeklyLatestDisplay = typeof renderWeeklyDefect === "function" ? renderWeeklyDefect : null;
  if (prevWeeklyLatestDisplay && !window.__weeklyEaWrapped) {
    window.__weeklyEaWrapped = true;
    renderWeeklyDefect = function () {
      prevWeeklyLatestDisplay();
      applyEaLabels("#weeklyDefectContent");
    };
  }

  var prevMonthlyLatestDisplay = typeof renderMonthDefect === "function" ? renderMonthDefect : null;
  if (prevMonthlyLatestDisplay && !window.__monthlyEaWrapped) {
    window.__monthlyEaWrapped = true;
    renderMonthDefect = function () {
      prevMonthlyLatestDisplay();
      applyEaLabels("#monthDefectContent");
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyLatestDisplayFixes);
  else setTimeout(applyLatestDisplayFixes, 0);
})();

// claim-detail-export-v1: weekly/monthly drilldown popup exports.
(function () {
  var L = {
    brand: "\uBE0C\uB79C\uB4DC",
    code: "\uC81C\uD488\uCF54\uB4DC",
    color: "\uC0C9\uC0C1",
    count: "\uAC74\uC218",
    amount: "\uD558\uC790\uAE08\uC561",
    defect: "\uD558\uC790\uC0C1\uC138",
    cause: "\uC6D0\uC778\uCC98",
    download: "\uC774\uB825 \uC5D1\uC140 \uB2E4\uC6B4\uB85C\uB4DC",
    originalDownload: "\uC5D1\uC140 \uB2E4\uC6B4\uB85C\uB4DC(\uC6D0\uBCF8\uD615\uC2DD)",
    dataDownload: "\uC790\uB8CC\uBC1B\uAE30",
    weeklyTitle: "\uC8FC\uBCC4 \uD074\uB808\uC784 \uC0C1\uC138 \uD604\uD669",
    monthlyTitle: "\uC6D4\uBCC4 \uB9C8\uAC10 \uC0C1\uC138 \uD604\uD669",
    standard: "\uAE30\uC900",
    noData: "\uD45C\uC2DC\uD560 \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
    displayCols: "\uD45C\uC2DC \uC5F4: \uBE0C\uB79C\uB4DC, \uC81C\uD488\uCF54\uB4DC, \uC0C9\uC0C1, \uAC74\uC218, \uD558\uC790\uAE08\uC561, \uD558\uC790\uC0C1\uC138, \uC6D0\uC778\uCC98"
  };

  function money(value) {
    return formatNumber(Math.round(Number(value || 0))) + "\uC6D0";
  }

  function claimAmount(meta) {
    var base = Number(meta && meta.amount || 0);
    return base + (meta && meta.penaltyEligible === false ? 0 : penaltyPerClaim);
  }

  function metaKey(meta) {
    return weeklyItemKey(meta && meta.item, meta && meta.color);
  }

  function metaBrand(meta) {
    var row = meta && meta.row || {};
    return String(meta && meta.brand || pick(row, [L.brand, "\uAD6C\uBD84", "brand", "category"]) || cellAt(row, 2) || "").trim();
  }

  function metaDefect(meta) {
    if (meta && meta.defect) return String(meta.defect).trim();
    return weeklyDefectDetail(meta && meta.row || {});
  }

  function metaCause(meta) {
    return String(meta && (meta.cause || meta.packageType || meta.detailType || meta.line) || "").trim();
  }

  function detailRow(meta) {
    var row = {};
    row[L.brand] = metaBrand(meta);
    row[L.code] = String(meta && meta.item || "").trim();
    row[L.color] = String(meta && meta.color || "").trim();
    row[L.count] = 1;
    row[L.amount] = claimAmount(meta);
    row[L.defect] = metaDefect(meta);
    row[L.cause] = metaCause(meta);
    return row;
  }

  function detailMetas(scope, options) {
    options = options || {};
    var rows = scope === "monthly" ? monthlyDefectScopedRows(monthlyDeadlineMetas()) : weeklyScopedMetas();
    if (options.line) rows = rows.filter(function (meta) { return String(meta.line || monthlyLineLabel(meta)) === String(options.line); });
    if (options.type) rows = rows.filter(function (meta) { return String(meta.type || "") === String(options.type); });
    if (options.itemKey) rows = rows.filter(function (meta) { return metaKey(meta) === options.itemKey; });
    return rows.slice().sort(function (a, b) {
      return metaKey(a).localeCompare(metaKey(b), "ko", { numeric: true }) ||
        String(a.type || "").localeCompare(String(b.type || ""), "ko", { numeric: true }) ||
        String(a.receiptNo || "").localeCompare(String(b.receiptNo || ""), "ko", { numeric: true });
    });
  }

  function popupTitle(scope, options, rows) {
    var base = scope === "monthly" ? L.monthlyTitle : L.weeklyTitle;
    var parts = [];
    if (options.line) parts.push(options.line);
    if (options.type) parts.push(options.type);
    if (options.itemKey) parts.push(options.itemKey.replace("||", " / "));
    if (!parts.length) parts.push("\uC804\uCCB4");
    return base + " / " + parts.join(" / ") + " (" + formatNumber(rows.length) + "\uAC74)";
  }

  function optionsJson(options) {
    return JSON.stringify(options || {}).replace(/</g, "\\u003c").replace(/'/g, "\\u0027");
  }

  function payloadJson(scope, options) {
    return JSON.stringify({ scope: scope, options: options || {} }).replace(/</g, "\\u003c").replace(/'/g, "\\u0027");
  }

  window.openClaimDetailExportPopup = function (scope, options) {
    options = options || {};
    var metas = detailMetas(scope, options);
    var rows = metas.map(detailRow);
    var title = popupTitle(scope, options, rows);
    var payload = payloadJson(scope, options);
    var popup = window.open("", "claimDetail_" + Date.now(), "popup=yes,width=1180,height=760,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
    if (!popup) return;
    popup.document.write('<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>' + escapeHtml(title) + '</title><style>' +
      'body{margin:0;color:#111827;font-family:"Malgun Gothic","Segoe UI",Arial,sans-serif;font-size:13px}' +
      'header{position:sticky;top:0;z-index:2;padding:18px 20px;border-bottom:1px solid #d7dde5;background:#fff}' +
      'h1{margin:0 0 8px;font-size:24px}.meta{margin-bottom:14px;color:#4b5563;font-weight:800}' +
      'button{min-height:32px;margin-right:6px;padding:0 12px;border:1px solid #c8d2de;border-radius:6px;background:#fff;font-weight:800;cursor:pointer}' +
      '.close{position:absolute;right:16px;top:12px;border:0;font-size:24px}.wrap{padding:0 20px 20px}' +
      'table{width:100%;border-collapse:collapse;table-layout:fixed}th,td{border:1px solid #d9dfe7;padding:8px 9px;vertical-align:top;word-break:keep-all}' +
      'th{background:#f1f3f5;text-align:center;font-weight:900}td{text-align:center}td.defect{text-align:left;white-space:pre-wrap;line-height:1.45}' +
      '</style></head><body><header><button class="close" onclick="window.close()">×</button><h1>' + escapeHtml(title) + '</h1>' +
      '<div class="meta">' + L.displayCols + '</div>' +
      '<button onclick=\'window.opener && window.opener.downloadClaimDetailExcel(' + payload + ')\'>' + L.download + '</button>' +
      '<button onclick=\'window.opener && window.opener.downloadClaimDetailOriginalExcel(' + payload + ')\'>' + L.originalDownload + '</button>' +
      '</header><div class="wrap"><table><thead><tr>' +
      '<th style="width:100px">' + L.brand + '</th><th style="width:150px">' + L.code + '</th><th style="width:80px">' + L.color + '</th>' +
      '<th style="width:80px">' + L.count + '</th><th style="width:120px">' + L.amount + '</th><th>' + L.defect + '</th><th style="width:140px">' + L.cause + '</th>' +
      '</tr></thead><tbody>' +
      (rows.length ? rows.map(function (row) {
        return '<tr><td>' + escapeHtml(row[L.brand]) + '</td><td>' + escapeHtml(row[L.code]) + '</td><td>' + escapeHtml(row[L.color]) + '</td><td>' + formatNumber(row[L.count]) + '</td><td>' + money(row[L.amount]) + '</td><td class="defect">' + escapeHtml(row[L.defect]) + '</td><td>' + escapeHtml(row[L.cause]) + '</td></tr>';
      }).join("") : '<tr><td colspan="7">' + L.noData + '</td></tr>') +
      '</tbody></table></div></body></html>');
    popup.document.close();
    attachEscToClose(popup);
  };

  window.downloadClaimDetailExcel = function (payload) {
    var metas = detailMetas(payload.scope, payload.options);
    var rows = metas.map(detailRow);
    if (!rows.length) return alert(L.noData);
    var fileName = (payload.scope === "monthly" ? L.monthlyTitle : L.weeklyTitle) + "_" + safeFileName((payload.options && (payload.options.itemKey || payload.options.line)) || "\uC804\uCCB4") + ".xlsx";
    if (window.XLSX) {
      var worksheet = XLSX.utils.json_to_sheet(rows, { header: [L.brand, L.code, L.color, L.count, L.amount, L.defect, L.cause] });
      var workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "\uC0C1\uC138\uD604\uD669");
      XLSX.writeFile(workbook, fileName);
      return;
    }
    downloadText(fileName.replace(/\.xlsx$/i, ".csv"), toCsv(rows), "text/csv;charset=utf-8");
  };

  window.downloadClaimDetailOriginalExcel = function (payload) {
    var metas = detailMetas(payload.scope, payload.options);
    if (!metas.length) return alert(L.noData);
    var rawRows = metas.map(function (meta) { return originalWeeklyRow(meta.row || {}); });
    var fileName = (payload.scope === "monthly" ? L.monthlyTitle : L.weeklyTitle) + "_" + safeFileName((payload.options && (payload.options.itemKey || payload.options.line)) || "\uC804\uCCB4") + "_\uC6D0\uBCF8.xlsx";
    if (window.XLSX) {
      var worksheet = XLSX.utils.json_to_sheet(rawRows, { header: originalWeeklyHeaders(metas.map(function (meta) { return meta.row || {}; })) });
      var workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "\uC6D0\uBCF8");
      XLSX.writeFile(workbook, fileName);
      return;
    }
    downloadText(fileName.replace(/\.xlsx$/i, ".csv"), toCsv(rawRows), "text/csv;charset=utf-8");
  };

  function detailDownloadButton(scope) {
    return ' <button class="detail-export-link" type="button" onclick="openClaimDetailExportPopup(\'' + scope + '\',{})">' + L.dataDownload + '</button>';
  }

  weeklyDetailDashboardMarkup = function (details) {
    if (!details.length) return '<section class="weekly-detail-panel"><h3>' + L.weeklyTitle + detailDownloadButton("weekly") + '</h3><div class="weekly-empty-message">' + L.noData + '</div></section>';
    var colors = ["#ef4444", "#f59f00", "#9c36b5", "#1c7ed6", "#0ca678", "#7950f2", "#f06595", "#495057", "#15aabf", "#e67700"];
    return '<section class="weekly-detail-panel"><h3>' + L.weeklyTitle + (weeklySelectedWeek ? ' <span>' + escapeHtml(weeklySelectedWeek) + ' ' + L.standard + '</span>' : '') + detailDownloadButton("weekly") + '</h3><div class="weekly-detail-list">' +
      details.map(function (item, index) {
        return '<div class="weekly-detail-block" style="--accent:' + colors[index % colors.length] + '"><button class="weekly-detail-row" type="button" onclick="toggleWeeklyLine(\'' + escapeJs(item.label) + '\')"><span class="weekly-rank">' + (index + 1) + '</span><strong>' + escapeHtml(item.label) + '</strong><em>' + formatNumber(item.count) + '\uAC74</em><b>' + money(item.amount) + '</b><span class="weekly-chevron">' + (weeklyExpandedLine === item.label ? '⌃' : '⌄') + '</span></button>' + (weeklyExpandedLine === item.label ? weeklyTypeRowsMarkup(item.types, item.label) : '') + '</div>';
      }).join("") + '</div></section>';
  };

  weeklyTypeRowsMarkup = function (types, lineLabel) {
    if (!types.length) return "";
    return '<div class="weekly-drill-list">' + types.map(function (type) {
      var key = lineLabel + '||' + type.label;
      return '<div class="weekly-type-block"><button class="weekly-type-row" type="button" onclick="toggleWeeklyType(\'' + escapeJs(key) + '\')"><span>R\uC5F4 \uC720\uD615</span><strong>' + escapeHtml(type.label) + weeklyCauseTagsMarkup(type.causes) + '</strong><em>' + formatNumber(type.count) + '\uAC74</em><b>' + money(type.amount) + '</b><i>' + (weeklyExpandedType === key ? '⌃' : '⌄') + '</i></button>' + (weeklyExpandedType === key ? weeklyItemRowsMarkup(type.items, "weekly", lineLabel, type.label) : '') + '</div>';
    }).join("") + '</div>';
  };

  weeklyItemRowsMarkup = function (items, scope, lineLabel, typeLabel) {
    if (!items.length) return "";
    scope = scope || "weekly";
    return '<div class="weekly-item-list">' + items.map(function (item, index) {
      var opts = { line: lineLabel || "", type: typeLabel || "", itemKey: item.key };
      return '<div class="weekly-item-row" ondblclick="openClaimDetailExportPopup(\'' + scope + '\',' + optionsJson(opts) + ')"><span>' + (index + 1) + '</span><strong title="double click">' + escapeHtml(item.displayLabel || item.label) + '</strong><em>' + formatNumber(item.quantity || item.count || 0) + '\uAC74</em><b>' + money(item.amount) + '</b></div>';
    }).join("") + '</div>';
  };

  monthlyDefectDetailMarkup = function (details) {
    if (!details.length) return '<section class="weekly-detail-panel"><h3>' + L.monthlyTitle + detailDownloadButton("monthly") + '</h3><div class="weekly-empty-message">' + L.noData + '</div></section>';
    var colors = ["#ef4444", "#f59f00", "#9c36b5", "#1c7ed6", "#0ca678", "#7950f2", "#f06595", "#495057", "#15aabf", "#e67700"];
    return '<section class="weekly-detail-panel"><h3>' + L.monthlyTitle + (monthlyDefectSelectedMonth ? ' <span>' + escapeHtml(monthlyDefectSelectedMonth) + ' ' + L.standard + '</span>' : '') + detailDownloadButton("monthly") + '</h3><div class="weekly-detail-list">' +
      details.map(function (line, index) {
        return '<div class="weekly-detail-block" style="--accent:' + colors[index % colors.length] + '"><button class="weekly-detail-row" type="button" onclick="toggleMonthlyLine(\'' + escapeJs(line.label) + '\')"><span class="weekly-rank">' + (index + 1) + '</span><strong>' + escapeHtml(line.label) + '</strong><em>' + formatNumber(line.count) + '\uAC74</em><b>' + money(line.amount) + '</b><span class="weekly-chevron">' + (monthlyExpandedLine === line.label ? '⌃' : '⌄') + '</span></button>' + (monthlyExpandedLine === line.label ? monthlyTypeRowsMarkup(line.types, line.label) : '') + '</div>';
      }).join("") + '</div></section>';
  };

  monthlyTypeRowsMarkup = function (types, lineLabel) {
    if (!types.length) return "";
    return '<div class="weekly-drill-list">' + types.map(function (type) {
      var key = lineLabel + '||' + type.label;
      return '<div class="weekly-type-block"><button class="weekly-type-row" type="button" onclick="toggleMonthlyType(\'' + escapeJs(lineLabel) + '\', \'' + escapeJs(type.label) + '\')"><span>\uC720\uD615</span><strong>' + escapeHtml(type.label) + '</strong><em>' + formatNumber(type.count) + '\uAC74</em><b>' + money(type.amount) + '</b><i>' + (monthlyExpandedType === key ? '⌃' : '⌄') + '</i></button>' + (monthlyExpandedType === key ? monthlyItemRowsMarkup(type.items, "monthly", lineLabel, type.label) : '') + '</div>';
    }).join("") + '</div>';
  };

  monthlyItemRowsMarkup = function (items, scope, lineLabel, typeLabel) {
    return weeklyItemRowsMarkup(items, scope || "monthly", lineLabel, typeLabel);
  };
})();

// claim-detail-export-v2: safer encoded drilldown handlers.
(function () {
  function encodeDetailOptions(options) {
    return encodeURIComponent(JSON.stringify(options || {})).replace(/'/g, "%27");
  }

  window.openClaimDetailExportPopupEncoded = function (scope, encodedOptions) {
    var options = {};
    try {
      options = JSON.parse(decodeURIComponent(encodedOptions || "%7B%7D"));
    } catch (err) {
      options = {};
    }
    return window.openClaimDetailExportPopup(scope, options);
  };

  weeklyItemRowsMarkup = function (items, scope, lineLabel, typeLabel) {
    if (!items.length) return "";
    scope = scope || "weekly";
    return '<div class="weekly-item-list">' + items.map(function (item, index) {
      var opts = { line: lineLabel || "", type: typeLabel || "", itemKey: item.key };
      var encoded = encodeDetailOptions(opts);
      return '<div class="weekly-item-row"><span>' + (index + 1) + '</span>' +
        '<strong class="weekly-item-code" ondblclick="openClaimDetailExportPopupEncoded(\'' + scope + '\',\'' + encoded + '\')" title="double click">' + escapeHtml(item.displayLabel || item.label) + '</strong>' +
        '<em>' + formatNumber(item.quantity || item.count || 0) + '\uAC74</em><b>' + (formatNumber(Math.round(Number(item.amount || 0))) + '\uC6D0') + '</b></div>';
    }).join("") + '</div>';
  };

  monthlyItemRowsMarkup = function (items, scope, lineLabel, typeLabel) {
    return weeklyItemRowsMarkup(items, scope || "monthly", lineLabel, typeLabel);
  };
})();

// current-month-link-and-line-export-v3
(function () {
  function pad2(value) {
    return String(Number(value) || 0).padStart(2, "0");
  }

  function ymFromDate(date) {
    if (!date) return null;
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  }

  function parseYmFromTextV3(value) {
    var text = String(value || "");
    var full = text.match(/(20\d{2})\s*\uB144\s*(\d{1,2})\s*\uC6D4/);
    if (full) return { year: Number(full[1]), month: Number(full[2]) };
    var short = text.match(/(?<!\d)(\d{2})\s*\uB144\s*(\d{1,2})\s*\uC6D4/);
    if (short) return { year: 2000 + Number(short[1]), month: Number(short[2]) };
    var yymmdd = text.match(/(?<!\d)(\d{2})(\d{2})(\d{2})(?!\d)/);
    if (yymmdd) return { year: 2000 + Number(yymmdd[1]), month: Number(yymmdd[2]) };
    var iso = text.match(/(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (iso) return { year: Number(iso[1]), month: Number(iso[2]) };
    return null;
  }

  function validYm(ym) {
    return ym && ym.year >= 2020 && ym.month >= 1 && ym.month <= 12;
  }

  function detectReceiptYmFromRows(rows) {
    var candidates = [];
    (rows || []).forEach(function (row) {
      var raw = row && (row.__raw || row) || {};
      [raw.__documentTitle, raw.__sheetDate, raw.__sheetTitle].concat(rowValues(raw), Object.keys(raw)).some(function (value) {
        var ym = parseYmFromTextV3(value);
        if (validYm(ym)) {
          candidates.push(ym);
          return true;
        }
        var date = parseDateFromText(value);
        if (date) {
          candidates.push(ymFromDate(date));
          return true;
        }
        return false;
      });
    });
    return candidates[0] || null;
  }

  function detectReceiptYmFromDataSets(dataSets, url) {
    var titleText = (dataSets || []).map(function (dataSet) {
      return [dataSet.documentTitle, dataSet.sheetName, dataSet.label, dataSet.fileName].join(" ");
    }).join(" ") + " " + String(url || "");
    var ym = parseYmFromTextV3(titleText);
    if (validYm(ym)) return ym;
    for (var i = 0; i < (dataSets || []).length; i += 1) {
      ym = detectReceiptYmFromRows(dataSets[i].rows || []);
      if (validYm(ym)) return ym;
    }
    var now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }

  function summaryGroupMetaFromDataSets(base, url, dataSets) {
    if (base.kind !== "summary") return linkedGroupMeta(base, url, dataSets);
    var ym = detectReceiptYmFromDataSets(dataSets, url);
    var title = ((dataSets || []).map(function (dataSet) { return dataSet.documentTitle; }).find(Boolean)) || (ym.year + "\uB144 " + ym.month + "\uC6D4");
    return {
      kind: base.kind,
      label: base.label,
      groupKey: "summary-" + ym.year + "-" + pad2(ym.month),
      groupTitle: title,
      order: Number(String(ym.year) + pad2(ym.month)),
      __ym: ym
    };
  }

  function setDailyControlsToYm(ym) {
    if (!validYm(ym)) return;
    var yearSelect = document.getElementById("dailyYearSelect");
    var monthSelect = document.getElementById("dailyMonthSelect");
    if (yearSelect) yearSelect.value = String(ym.year);
    if (monthSelect) monthSelect.value = String(ym.month);
  }

  loadSpreadsheetLink = async function (args) {
    var input = document.getElementById(args.inputId);
    var url = input && input.value ? input.value.trim() : "";
    if (!url) {
      alert("\uC2A4\uD504\uB808\uB4DC\uC2DC\uD2B8 \uB9C1\uD06C\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
      return;
    }
    try {
      var dataSets = await fetchSpreadsheetDataSets(url, args.kind, args.label);
      if (args.kind === "monthlyStatus") monthlyStatusAutoFailed = false;
      var groupMeta = summaryGroupMetaFromDataSets(args, url, dataSets);
      removeExistingLinkedEntries(groupMeta.groupKey);
      var entry = null;
      dataSets.forEach(function (dataSet) {
        entry = addUploadEntry({
          kind: args.kind,
          fileName: dataSet.fileName || url,
          label: dataSet.label || args.label,
          rows: normalizeRows(dataSet.rows, args.kind),
          countHint: dataSet.countHint,
          defectAmount: dataSet.defectAmount,
          sourceUrl: url,
          sourceSheet: dataSet.sheetName || "",
          selected: true,
          excluded: 0,
          sourceType: "spreadsheet-link",
          groupKey: groupMeta.groupKey,
          groupTitle: groupMeta.groupTitle,
          order: groupMeta.order
        });
      });
      if (args.kind === "summary" && !window.__USE_EXTERNAL_DAILY_STABLE) setDailyControlsToYm(groupMeta.__ym);
      activeUploadId = entry && entry.id || activeUploadId;
      rebuildFromSelection();
      var allRows = dataSets.flatMap(function (dataSet) { return dataSet.rows || []; });
      var loadedDays = Array.from(new Set(allRows.map(function (row) { return row.__sheetTitle; }).filter(Boolean))).length;
      var loadedText = loadedDays ? " · \uC2DC\uD2B8 " + loadedDays + "\uAC1C \uC77D\uC74C" : "";
      renderAll((groupMeta.groupTitle || args.label) + " \uB9C1\uD06C \uC5F0\uACB0 \uC644\uB8CC" + loadedText);
      saveDashboardState();
      fillSavedLinkInputs();
      renderLinkedDataList();
      closeDataInsert();
    } catch (err) {
      alert("\uB9C1\uD06C \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328: " + err.message);
    }
  };

  var originalLinkedGroupsForInputV3 = typeof linkedGroupsForInput === "function" ? linkedGroupsForInput : null;
  linkedGroupsForInput = function (groupKey) {
    if (groupKey === "26-summary") {
      return allLinkedDisplayGroups().filter(function (group) {
        return group.items.some(function (entry) { return entry.kind === "summary"; });
      });
    }
    return originalLinkedGroupsForInputV3 ? originalLinkedGroupsForInputV3(groupKey) : [];
  };

  var originalClearLinkedGroupV3 = typeof clearLinkedGroup === "function" ? clearLinkedGroup : null;
  clearLinkedGroup = function (groupKey, inputId) {
    if (groupKey !== "26-summary") return originalClearLinkedGroupV3(groupKey, inputId);
    var groupKeys = Array.from(new Set(allLinkedDisplayGroups().filter(function (group) {
      return group.items.some(function (entry) { return entry.kind === "summary"; });
    }).map(function (group) { return group.key; })));
    setInputValue(inputId, "");
    if (!groupKeys.length) return;
    if (!confirm("\uC811\uC218\uB0B4\uC5ED(\uAE08\uC6D4\uB370\uC774\uD130) \uC790\uB8CC\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?")) {
      fillSavedLinkInputs();
      return;
    }
    state.uploads.filter(function (entry) { return groupKeys.includes(entry.groupKey); }).forEach(revokeEntryImages);
    state.uploads = state.uploads.filter(function (entry) { return !groupKeys.includes(entry.groupKey); });
    removeCachedLinkedGroups(groupKeys);
    activeUploadId = state.uploads[0] && state.uploads[0].id || "sample";
    rebuildFromSelection();
    renderAll("\uC811\uC218\uB0B4\uC5ED(\uAE08\uC6D4\uB370\uC774\uD130) \uC0AD\uC81C \uC644\uB8CC");
    saveDashboardState();
    fillSavedLinkInputs();
  };

  function entryYm(entry) {
    var rows = collectDatedReceiptRows([entry]);
    var latest = rows.map(function (item) { return item.date; }).sort(function (a, b) { return b - a; })[0];
    if (latest) return ymFromDate(latest);
    var ym = parseYmFromTextV3([entry.groupTitle, entry.label, entry.sourceSheet, entry.fileName].join(" "));
    return validYm(ym) ? ym : null;
  }

  function selectedDailyYm() {
    var year = Number((document.getElementById("dailyYearSelect") || {}).value);
    var month = Number((document.getElementById("dailyMonthSelect") || {}).value);
    return validYm({ year: year, month: month }) ? { year: year, month: month } : null;
  }

  function sameYm(a, b) {
    return validYm(a) && validYm(b) && Number(a.year) === Number(b.year) && Number(a.month) === Number(b.month);
  }

  function activeSummaryEntries(entries) {
    entries = entries || [];
    if (entries.length <= 1) return entries;
    var wanted = selectedDailyYm();
    if (wanted) {
      var matched = entries.filter(function (entry) { return sameYm(entryYm(entry), wanted); });
      if (matched.length) return matched;
    }
    var withYm = entries.map(function (entry) { return { entry: entry, ym: entryYm(entry) }; }).filter(function (item) { return validYm(item.ym); });
    if (!withYm.length) return entries;
    withYm.sort(function (a, b) { return b.ym.year - a.ym.year || b.ym.month - a.ym.month; });
    var latest = withYm[0].ym;
    return withYm.filter(function (item) { return sameYm(item.ym, latest); }).map(function (item) { return item.entry; });
  }

  rebuildFromSelection = function () {
    var visible = visibleUploads();
    if (!visible.length) {
      state.cost = structuredClone(sampleState.cost);
      state.summary = structuredClone(sampleState.summary);
      state.details = structuredClone(sampleState.details);
      state.images = [];
      state.costMeta = defaultCostMeta();
      detailDateOptions = [];
      selectedDetailDate = "";
      activeUploadId = "sample";
      return;
    }
    var costEntries = selectedByKind("cost");
    var selectedSummaryEntries = selectedByKind("summary");
    var selectedReceiptHistoryEntries = selectedByKind("receiptHistory");
    var allSummaryEntries = selectedSummaryEntries.length ? selectedSummaryEntries : state.uploads.filter(function (entry) { return entry.kind === "summary"; });
    var summaryEntries = activeSummaryEntries(allSummaryEntries);
    var receiptHistoryEntries = selectedReceiptHistoryEntries.length ? selectedReceiptHistoryEntries : state.uploads.filter(function (entry) { return entry.kind === "receiptHistory"; });
    var detailEntries = selectedByKind("details");
    var imageEntries = selectedByKind("images");

    state.summary = deriveClaimSummaryForView(receiptHistoryEntries, summaryEntries);
    var derivedCost = deriveCostFromSummary(summaryEntries);
    if (derivedCost || costEntries.length) {
      state.cost = derivedCost || mergeCost(costEntries);
    } else if (restoredViewSnapshot && restoredViewSnapshot.cost) {
      state.costMeta = structuredClone(restoredViewSnapshot.costMeta || defaultCostMeta());
      state.cost = structuredClone(restoredViewSnapshot.cost);
    } else {
      state.cost = blankCostRows(currentCostKeys());
    }
    var receiptDetails = deriveDetailsFromReceiptEntries(summaryEntries);
    state.details = receiptDetails.length ? receiptDetails : detailEntries.length ? mergeDetails(detailEntries) : [];
    state.images = imageEntries.flatMap(function (entry) { return entry.images || []; });
  };

  function encodeDetailOptionsV3(options) {
    return encodeURIComponent(JSON.stringify(options || {})).replace(/'/g, "%27");
  }

  weeklyItemRowsMarkup = function (items, scope, lineLabel, typeLabel) {
    if (!items.length) return "";
    scope = scope || "weekly";
    return '<div class="weekly-item-list">' + items.map(function (item, index) {
      var opts = { line: lineLabel || "" };
      var encoded = encodeDetailOptionsV3(opts);
      return '<div class="weekly-item-row"><span>' + (index + 1) + '</span>' +
        '<strong class="weekly-item-code" ondblclick="openClaimDetailExportPopupEncoded(\'' + scope + '\',\'' + encoded + '\')" title="double click">' + escapeHtml(item.displayLabel || item.label) + '</strong>' +
        '<em>' + formatNumber(item.quantity || item.count || 0) + '\uAC74</em><b>' + (formatNumber(Math.round(Number(item.amount || 0))) + '\uC6D0') + '</b></div>';
    }).join("") + '</div>';
  };

  monthlyItemRowsMarkup = function (items, scope, lineLabel, typeLabel) {
    return weeklyItemRowsMarkup(items, scope || "monthly", lineLabel, typeLabel);
  };

  function bindDailyMonthRefresh() {
    ["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || el.__currentMonthRefreshBound) return;
      el.__currentMonthRefreshBound = true;
      el.addEventListener("change", function () {
        rebuildFromSelection();
        renderAll();
        saveDashboardState();
      });
    });
  }

  var previousRenderAllV3 = typeof renderAll === "function" ? renderAll : null;
  if (previousRenderAllV3 && !window.__currentMonthLinkRenderWrapped) {
    window.__currentMonthLinkRenderWrapped = true;
    renderAll = function (message) {
      previousRenderAllV3(message);
      bindDailyMonthRefresh();
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindDailyMonthRefresh);
  else setTimeout(bindDailyMonthRefresh, 0);
})();

// period-source-routing-v4: route dashboard selectors to their requested data source.
(function () {
  function num(id, fallback) {
    var el = document.getElementById(id);
    var value = Number(el && el.value);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }

  function shortYear(year) {
    return String(Number(year) || new Date().getFullYear()).slice(-2);
  }

  function fullYearFromEntry(entry) {
    var yy = typeof entryYear === "function" ? entryYear(entry) : "";
    if (yy) return 2000 + Number(yy);
    var text = [entry && entry.groupTitle, entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName].join(" ");
    var full = String(text).match(/(20\d{2})/);
    if (full) return Number(full[1]);
    var short = String(text).match(/(?<!\d)(\d{2})\s*\uB144/);
    return short ? 2000 + Number(short[1]) : 0;
  }

  function entriesByKind(kind) {
    return state.uploads.filter(function (entry) { return entry.kind === kind; });
  }

  function costEntriesForYear(year) {
    var sy = shortYear(year);
    return entriesByKind("cost").filter(function (entry) {
      return String(entryYear(entry) || shortYear(fullYearFromEntry(entry))) === sy;
    });
  }

  function monthFromEntry(entry) {
    return monthNumber([entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" "));
  }

  function selectedWeeklyYear() {
    return num("weeklyYearSelect", new Date().getFullYear());
  }

  function selectedWeeklyMonth() {
    return num("weeklyMonthSelect", new Date().getMonth() + 1);
  }

  function selectedMonthlyYear() {
    return num("monthlyYearSelect", new Date().getFullYear());
  }

  function selectedDailyPeriod() {
    var today = new Date();
    return {
      year: num("dailyYearSelect", today.getFullYear()),
      month: num("dailyMonthSelect", today.getMonth() + 1),
      week: num("dailyWeekSelect", 1)
    };
  }

  function sameMonthDate(date, year, month) {
    return date && date.getFullYear() === Number(year) && date.getMonth() + 1 === Number(month);
  }

  function dateKeyValue(date) {
    return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0;
  }

  function weekDates(year, month, week) {
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(year, month) : [];
    return groups[Math.max(0, Number(week || 1) - 1)] || [];
  }

  function weekEndDate(year, month, week) {
    var dates = weekDates(year, month, week);
    if (dates.length) return dates[dates.length - 1];
    return new Date(year, month - 1, Math.min(5, new Date(year, month, 0).getDate()));
  }

  function rowEntry(kind, rows, label) {
    return {
      kind: kind,
      fileName: label || kind,
      label: label || kind,
      rows: (rows || []).map(function (item) { return item && item.row ? item.row : item; }),
      excluded: 0,
      selected: true
    };
  }

  function receiptHistoryEntries() {
    return entriesByKind("receiptHistory");
  }

  function summaryEntriesForMonth(year, month) {
    return entriesByKind("summary").filter(function (entry) {
      var rows = collectDatedReceiptRows([entry]);
      if (rows.some(function (item) { return sameMonthDate(item.date, year, month); })) return true;
      var text = [entry.groupTitle, entry.label, entry.sourceSheet, entry.fileName].join(" ");
      var ym = String(text).match(/(20\d{2})\s*\uB144\s*(\d{1,2})\s*\uC6D4/);
      return ym && Number(ym[1]) === Number(year) && Number(ym[2]) === Number(month);
    });
  }

  function allReceiptHistoryRows() {
    return collectDatedReceiptRows(receiptHistoryEntries());
  }

  function receiptRowsForMonth(year, month) {
    return allReceiptHistoryRows().filter(function (item) {
      return sameMonthDate(item.date, year, month);
    });
  }

  function receiptRowsForWeek(year, month, week) {
    var keys = new Set(weekDates(year, month, week).map(dateKeyValue));
    return receiptRowsForMonth(year, month).filter(function (item) {
      return keys.has(dateKeyValue(item.date));
    });
  }

  function receiptRowsUpToWeek(year, month, week) {
    var end = weekEndDate(year, month, week);
    var endKey = dateKeyValue(end);
    return receiptRowsForMonth(year, month).filter(function (item) {
      return dateKeyValue(item.date) <= endKey;
    });
  }

  function receiptRowsBeforeMonth(year, month) {
    return allReceiptHistoryRows().filter(function (item) {
      return item.date.getFullYear() < Number(year) ||
        (item.date.getFullYear() === Number(year) && item.date.getMonth() + 1 < Number(month));
    });
  }

  function patchPriorMonthColumns(rows, allRows, meta) {
    if (!Array.isArray(rows) || !meta) return rows;
    var wantedMonths = Array.isArray(meta.preMonths) ? meta.preMonths : [];
    if (!wantedMonths.length) return rows;
    var byCategory = new Map(rows.map(function (row) { return [row.category, row]; }));
    var counts = new Map();
    allRows.forEach(function (item) {
      if (!item.date || item.date.getFullYear() !== Number(meta.currentYear)) return;
      var month = item.date.getMonth() + 1;
      if (!wantedMonths.includes(month)) return;
      var category = receiptClaimCategory(item.row);
      var key = category + "||" + month;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    byCategory.forEach(function (row, category) {
      wantedMonths.forEach(function (month) {
        var key = "m" + month;
        var count = counts.get(category + "||" + month);
        if (count !== undefined) row[key] = count;
      });
    });
    var totalRow = byCategory.get("\uACC4");
    if (totalRow) {
      wantedMonths.forEach(function (month) {
        var key = "m" + month;
        totalRow[key] = rows
          .filter(function (row) { return row.category !== "\uACC4" && row.category !== "PPM"; })
          .reduce(function (sum, row) { return sum + (Number(row[key]) || 0); }, 0);
      });
    }
    return rows;
  }

  function buildDailySummary() {
    var period = selectedDailyPeriod();
    var end = weekEndDate(period.year, period.month, period.week);
    var historyRows = receiptRowsBeforeMonth(period.year, period.month);
    var currentRows = receiptRowsUpToWeek(period.year, period.month, period.week);
    var currentEntries = currentRows.length ? [rowEntry("summary", currentRows, "selected-current")] : summaryEntriesForMonth(period.year, period.month);
    var previousBuild = buildClaimSummaryMeta;
    try {
      buildClaimSummaryMeta = function () { return previousBuild(end); };
      state.summary = deriveClaimSummaryForView([rowEntry("receiptHistory", historyRows, "selected-history")], currentEntries);
      state.summaryMeta = previousBuild(end);
      patchPriorMonthColumns(state.summary, historyRows.concat(currentRows), state.summaryMeta);
    } finally {
      buildClaimSummaryMeta = previousBuild;
    }
    var detailRows = receiptRowsForWeek(period.year, period.month, period.week);
    var detailEntries = detailRows.length ? [rowEntry("summary", detailRows, "selected-week-detail")] : currentEntries;
    state.details = deriveDetailsFromReceiptEntries(detailEntries);
  }

  var previousRebuildV4 = typeof rebuildFromSelection === "function" ? rebuildFromSelection : null;
  rebuildFromSelection = function () {
    var visible = visibleUploads();
    if (!visible.length) {
      if (previousRebuildV4) previousRebuildV4();
      return;
    }
    var selectedSummaryEntries = selectedByKind("summary");
    var allSummaryEntries = selectedSummaryEntries.length ? selectedSummaryEntries : entriesByKind("summary");
    var period = selectedDailyPeriod();
    var monthSummaryEntries = summaryEntriesForMonth(period.year, period.month);
    var summaryForCost = monthSummaryEntries.length ? monthSummaryEntries : allSummaryEntries;
    var costEntries = selectedByKind("cost");
    buildDailySummary();
    var derivedCost = deriveCostFromSummary(summaryForCost);
    if (derivedCost || costEntries.length) {
      state.cost = derivedCost || mergeCost(costEntries);
    } else if (restoredViewSnapshot && restoredViewSnapshot.cost) {
      state.costMeta = structuredClone(restoredViewSnapshot.costMeta || defaultCostMeta());
      state.cost = structuredClone(restoredViewSnapshot.cost);
    } else {
      state.cost = blankCostRows(currentCostKeys());
    }
    state.images = selectedByKind("images").flatMap(function (entry) { return entry.images || []; });
  };

  var previousMonthlyDeadlineEntriesV4 = typeof monthlyDeadlineEntries === "function" ? monthlyDeadlineEntries : null;
  monthlyDeadlineEntries = function () {
    var year = selectedMonthlyYear();
    var entries = costEntriesForYear(year);
    return entries.length ? entries : (previousMonthlyDeadlineEntriesV4 ? previousMonthlyDeadlineEntriesV4() : []);
  };

  var previousCurrentYearLabelV4 = typeof currentYearLabel === "function" ? currentYearLabel : null;
  currentYearLabel = function () {
    var year = selectedMonthlyYear();
    return year ? shortYear(year) + "\uB144" : (previousCurrentYearLabelV4 ? previousCurrentYearLabelV4() : "");
  };

  function selectedWeeklyCostMetas() {
    var year = selectedWeeklyYear();
    var month = selectedWeeklyMonth();
    return costEntriesForYear(year)
      .filter(function (entry) { return monthFromEntry(entry) === month; })
      .flatMap(function (entry) {
        return (entry.rows || []).map(function (row, index) {
          var meta = monthlyDeadlineRowMeta(entry, row, index);
          meta.__entry = entry;
          meta.__index = index;
          return meta;
        }).filter(isMonthlyDeadlineDataRow);
      });
  }

  function metaDate(meta) {
    return findDateInRow(meta.row) ||
      parseDateFromText(meta.row && meta.row.__sheetDate) ||
      parseDateFromText(meta.row && meta.row.__sheetTitle) ||
      parseDateFromText(meta.__entry && meta.__entry.sourceSheet) ||
      null;
  }

  function weekLabelForMeta(meta, fallbackIndex) {
    var year = selectedWeeklyYear();
    var month = selectedWeeklyMonth();
    var date = metaDate(meta);
    if (date && sameMonthDate(date, year, month)) {
      var groups = claimSummaryWeekGroups(year, month);
      var index = groups.findIndex(function (group) {
        return group.some(function (item) { return dateKeyValue(item) === dateKeyValue(date); });
      });
      if (index >= 0) return (index + 1) + "\uC8FC";
    }
    return (Math.min(5, Math.floor(Number(fallbackIndex || 0) / 25) + 1)) + "\uC8FC";
  }

  function deadlineMetaToWeekly(meta, index) {
    return {
      row: meta.row,
      sourceMeta: meta,
      week: weekLabelForMeta(meta, index),
      receiptNo: String(meta.item || "row") + "_" + index,
      amount: Number(meta.amount || 0),
      line: monthlyLineLabel(meta),
      type: meta.type || "\uBBF8\uBD84\uB958",
      item: meta.item || "\uBBF8\uBD84\uB958",
      color: meta.color || "",
      quantity: Number(meta.quantity || 1) || 1,
      cause: meta.cause || "",
      excludedCause: isExcludedWeeklyCause(meta.cause)
    };
  }

  var previousMonthlyStatusRowsV4 = typeof monthlyStatusRows === "function" ? monthlyStatusRows : null;
  monthlyStatusRows = function () {
    var metas = selectedWeeklyCostMetas();
    if (metas.length) return metas.map(function (meta) { return { __deadlineMeta: meta }; });
    return previousMonthlyStatusRowsV4 ? previousMonthlyStatusRowsV4() : [];
  };

  var previousWeeklyDashboardMetasV4 = typeof weeklyDashboardMetas === "function" ? weeklyDashboardMetas : null;
  weeklyDashboardMetas = function (rows) {
    if ((rows || []).some(function (row) { return row && row.__deadlineMeta; })) {
      return (rows || [])
        .map(function (row, index) { return deadlineMetaToWeekly(row.__deadlineMeta, index); })
        .filter(function (row) { return row.week && !row.excludedCause && isWeeklyDataRow(row); });
    }
    return previousWeeklyDashboardMetasV4 ? previousWeeklyDashboardMetasV4(rows) : [];
  };

  function ensureClaimAccumControls() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var panel = document.getElementById("defectCloseDashboardBody");
    if (!panel || panel.__claimAccumRouted) return;
    panel.__claimAccumRouted = true;
    var current = selectedMonthlyYear();
    panel.innerHTML = '<section class="sheet-section weekly-placeholder">' +
      '<div class="section-title-row"><button id="claimAccumToggle" class="section-title-toggle blue" type="button" aria-expanded="false">&gt; \uD074\uB808\uC784\uB204\uC801\uC790\uB8CC</button>' +
      '<div class="section-controls"><label>\uB144\uB3C4 <select id="claimAccumYearSelect"></select></label></div></div>' +
      '<div id="claimAccumBody" class="is-hidden"></div></section>';
    var select = document.getElementById("claimAccumYearSelect");
    [2025, 2026, 2027].forEach(function (year) {
      var option = document.createElement("option");
      option.value = String(year);
      option.textContent = year + "\uB144";
      select.appendChild(option);
    });
    select.value = String(current || new Date().getFullYear());
    select.addEventListener("change", renderClaimAccumFromExisting);
    document.getElementById("claimAccumToggle").addEventListener("click", function () {
      var body = document.getElementById("claimAccumBody");
      var hidden = !body.classList.contains("is-hidden");
      body.classList.toggle("is-hidden", hidden);
      this.setAttribute("aria-expanded", String(!hidden));
      this.textContent = (hidden ? "> " : "\u2228 ") + "\uD074\uB808\uC784\uB204\uC801\uC790\uB8CC";
    });
  }

  function renderClaimAccumFromExisting() {
    ensureClaimAccumControls();
    var body = document.getElementById("claimAccumBody");
    if (!body) return;
    var select = document.getElementById("claimAccumYearSelect");
    var year = Number(select && select.value) || selectedMonthlyYear();
    var entries = costEntriesForYear(year);
    var metas = entries.flatMap(function (entry) {
      return (entry.rows || []).map(function (row, index) { return monthlyDeadlineRowMeta(entry, row, index); }).filter(isMonthlyDeadlineDataRow);
    });
    var months = currentYearDeadlineMonthStats(metas);
    if (!months.length) {
      body.innerHTML = '<div class="weekly-empty-message">\uC120\uD0DD\uD55C \uB144\uB3C4\uC758 \uAE30\uC874\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
      return;
    }
    body.innerHTML = '<div class="weekly-tool"><div class="monthly-compare-card"><h3>' + year + '\uB144 \uD074\uB808\uC784\uB204\uC801\uC790\uB8CC</h3>' +
      '<div class="weekly-kpi-grid"><div class="weekly-kpi"><span>\uB204\uC801 \uAC74\uC218</span><strong>' + formatNumber(months.reduce(function (sum, item) { return sum + item.count; }, 0)) + '</strong><em>\uAC74</em></div>' +
      '<div class="weekly-kpi"><span>\uB204\uC801 \uAE08\uC561</span><strong>' + formatNumber(months.reduce(function (sum, item) { return sum + item.amount; }, 0)) + '</strong><em>\uC6D0</em></div></div>' +
      '<div class="table-wrap"><table class="dashboard-table"><thead><tr><th>\uC6D4</th><th>\uAC74\uC218</th><th>\uAE08\uC561</th></tr></thead><tbody>' +
      months.map(function (item) { return '<tr><th>' + escapeHtml(item.week) + '</th><td class="number">' + formatNumber(item.count) + '\uAC74</td><td class="number">' + formatNumber(item.amount) + '\uC6D0</td></tr>'; }).join("") +
      '</tbody></table></div></div></div>';
  }

  function bindPeriodRouting() {
    ["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || el.__periodRoutingBound) return;
      el.__periodRoutingBound = true;
      el.addEventListener("change", function () {
        rebuildFromSelection();
        renderAll();
        saveDashboardState();
      });
    });
    ["weeklyYearSelect", "weeklyMonthSelect"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || el.__periodRoutingBound) return;
      el.__periodRoutingBound = true;
      el.addEventListener("change", function () {
        renderWeeklyDefect();
        saveDashboardState();
      });
    });
    var monthly = document.getElementById("monthlyYearSelect");
    if (monthly && !monthly.__periodRoutingBound) {
      monthly.__periodRoutingBound = true;
      monthly.addEventListener("change", function () {
        renderMonthDefect();
        renderClaimAccumFromExisting();
        saveDashboardState();
      });
    }
    ensureClaimAccumControls();
  }

  var previousRenderAllV4 = typeof renderAll === "function" ? renderAll : null;
  if (previousRenderAllV4 && !window.__periodSourceRoutingRenderWrapped) {
    window.__periodSourceRoutingRenderWrapped = true;
    renderAll = function (message) {
      previousRenderAllV4(message);
      bindPeriodRouting();
      renderClaimAccumFromExisting();
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindPeriodRouting);
  else setTimeout(bindPeriodRouting, 0);
})();

// daily-card-period-source-v1: make daily KPI cards follow the selected year/month/week source.
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  function num(id, fallback) {
    var el = document.getElementById(id);
    var value = Number(el && el.value);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }
  function key(date) {
    return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0;
  }
  function selectedPeriod() {
    var today = new Date();
    return {
      year: num("dailyYearSelect", today.getFullYear()),
      month: num("dailyMonthSelect", today.getMonth() + 1),
      week: num("dailyWeekSelect", 1)
    };
  }
  function weekKeys(period) {
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(period.year, period.month) : [];
    return new Set((groups[Math.max(0, period.week - 1)] || []).map(key));
  }
  function rowsForSelectedWeek() {
    var period = selectedPeriod();
    var keys = weekKeys(period);
    var history = state.uploads.filter(function (entry) { return entry.kind === "receiptHistory"; });
    var rows = collectDatedReceiptRows(history).filter(function (item) {
      return item.date && item.date.getFullYear() === period.year && item.date.getMonth() + 1 === period.month && keys.has(key(item.date));
    });
    if (rows.length) return rows;
    var summary = state.uploads.filter(function (entry) { return entry.kind === "summary"; });
    return collectDatedReceiptRows(summary).filter(function (item) {
      return item.date && item.date.getFullYear() === period.year && item.date.getMonth() + 1 === period.month && keys.has(key(item.date));
    });
  }
  function rowAmount(row) {
    var raw = row && (row.__raw || row) || {};
    var direct = pick(raw, ["\uAE08\uC561", "\uC2E4\uD328\uBE44\uC6A9", "amount"]);
    var value = numeric(direct);
    if (value) return value;
    var cells = raw.__cells || [];
    for (var i = cells.length - 1; i >= 0; i -= 1) {
      value = numeric(cells[i]);
      if (value) return value;
    }
    return 0;
  }
  function topItems(rows) {
    var map = new Map();
    rows.forEach(function (item) {
      var detail = receiptDetailRow(item.row);
      var code = String(detail.code || "").trim();
      if (!code) return;
      var color = String(detail.color || "").trim();
      var label = color ? code + " / " + color : code;
      map.set(label, (map.get(label) || 0) + 1);
    });
    return Array.from(map.entries()).map(function (entry) { return { label: entry[0], count: entry[1] }; })
      .sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); })
      .slice(0, 5);
  }
  function renderDailyCardsByPeriod() {
    var box = document.getElementById("dailyReceiptCards");
    if (!box) return;
    var rows = rowsForSelectedWeek();
    if (!rows.length) return;
    var amount = rows.reduce(function (sum, item) { return sum + rowAmount(item.row); }, 0);
    var items = topItems(rows);
    var main = items[0] || { label: "-", count: 0 };
    box.innerHTML = '<div class="daily-card"><span>\uC811\uC218\uAC74\uC218</span><strong>' + formatNumber(rows.length) + '</strong><em>\uAC74</em><small>\uC120\uD0DD \uC8FC\uCC28 \uC790\uB8CC \uAE30\uC900</small></div>' +
      '<div class="daily-card"><span>\uC190\uC2E4\uAE08\uC561</span><strong>' + formatNumber(amount) + '</strong><em>\uC6D0</em><small>\uC811\uC218\uB0B4\uC5ED \uAE08\uC561 \uAE30\uC900</small></div>' +
      '<div class="daily-card daily-top-card"><span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="daily-top-item">' + escapeHtml(main.label) + '</strong><em>' + formatNumber(main.count) + '\uAC74</em><small>\uC81C\uD488\uCF54\uB4DC + \uC0C9\uC0C1 TOP 5</small><div class="weekly-kpi-tags">' +
      items.map(function (item) { return '<span>' + escapeHtml(item.label) + ' <b>' + formatNumber(item.count) + '\uAC74</b></span>'; }).join("") +
      '</div></div>';
  }
  var prevRenderAllDailyCards = typeof renderAll === "function" ? renderAll : null;
  if (prevRenderAllDailyCards && !window.__dailyCardPeriodSourceWrapped) {
    window.__dailyCardPeriodSourceWrapped = true;
    renderAll = function (message) {
      prevRenderAllDailyCards(message);
      renderDailyCardsByPeriod();
    };
  }
})();

// repair-period-routing-v1: restore claim accum iframe, fix daily card layout, and prefer deadline rows for weekly counts.
(function () {
  function n(id, fallback) {
    var el = document.getElementById(id);
    var value = Number(el && el.value);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }
  function sy(year) { return String(Number(year) || new Date().getFullYear()).slice(-2); }
  function escapeSafe(value) { return typeof escapeHtml === "function" ? escapeHtml(value) : String(value == null ? "" : value); }
  function fmt(value) { return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR"); }
  function costYear(entry) {
    var yy = typeof entryYear === "function" ? entryYear(entry) : "";
    if (yy) return yy;
    var text = [entry && entry.groupTitle, entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName].join(" ");
    var m = String(text).match(/(?<!\d)(\d{2})\s*\uB144|20(\d{2})/);
    return m ? (m[1] || m[2] || "") : "";
  }
  function costEntriesFor(year) {
    return state.uploads.filter(function (entry) { return entry.kind === "cost" && costYear(entry) === sy(year); });
  }
  function entryMonth(entry) {
    return monthNumber([entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" "));
  }
  function ensureMonthSelectOptions() {
    ["dailyMonthSelect", "weeklyMonthSelect"].forEach(function (id) {
      if (id === "dailyMonthSelect" && window.__USE_EXTERNAL_DAILY_STABLE) return;
      var select = document.getElementById(id);
      if (!select) return;
      var current = select.value;
      var values = Array.from(select.options).map(function (option) { return option.value; });
      var missing = false;
      for (var i = 1; i <= 12; i += 1) if (!values.includes(String(i))) missing = true;
      if (!missing) return;
      select.innerHTML = "";
      for (var month = 1; month <= 12; month += 1) {
        var option = document.createElement("option");
        option.value = String(month);
        option.textContent = month + "\uC6D4";
        select.appendChild(option);
      }
      if (current) select.value = current;
    });
  }
  function key(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function dailyPeriod() {
    var today = new Date();
    return {
      year: n("dailyYearSelect", today.getFullYear()),
      month: n("dailyMonthSelect", today.getMonth() + 1),
      week: n("dailyWeekSelect", 1)
    };
  }
  function selectedWeekRows() {
    var p = dailyPeriod();
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(p.year, p.month) : [];
    var keys = new Set((groups[Math.max(0, p.week - 1)] || []).map(key));
    function inWeek(item) {
      return item.date && item.date.getFullYear() === p.year && item.date.getMonth() + 1 === p.month && keys.has(key(item.date));
    }
    var history = state.uploads.filter(function (entry) { return entry.kind === "receiptHistory"; });
    var rows = collectDatedReceiptRows(history).filter(inWeek);
    if (rows.length) return rows;
    var summary = state.uploads.filter(function (entry) { return entry.kind === "summary"; });
    return collectDatedReceiptRows(summary).filter(inWeek);
  }
  function rowAmount(row) {
    var raw = row && (row.__raw || row) || {};
    var direct = numeric(pick(raw, ["\uAE08\uC561", "\uC2E4\uD328\uBE44\uC6A9", "amount"]));
    if (direct) return direct;
    var cells = raw.__cells || [];
    for (var i = cells.length - 1; i >= 0; i -= 1) {
      var value = numeric(cells[i]);
      if (value) return value;
    }
    return 0;
  }
  function selectedTopItems(rows) {
    var map = new Map();
    rows.forEach(function (item) {
      var detail = receiptDetailRow(item.row);
      var code = String(detail.code || "").trim();
      if (!code) return;
      var color = String(detail.color || "").trim();
      var label = color ? code + " / " + color : code;
      map.set(label, (map.get(label) || 0) + 1);
    });
    return Array.from(map.entries()).map(function (entry) { return { label: entry[0], count: entry[1] }; })
      .sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); })
      .slice(0, 5);
  }
  function fixDailyCards() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var box = document.getElementById("dailyReceiptCards");
    if (!box) return;
    var rows = selectedWeekRows();
    if (!rows.length) return;
    var amount = rows.reduce(function (sum, item) { return sum + rowAmount(item.row); }, 0);
    var items = selectedTopItems(rows);
    var first = items[0] || { label: "-", count: 0 };
    box.innerHTML = [
      '<article class="daily-receipt-card"><span>\uC811\uC218\uAC74\uC218</span><strong>' + fmt(rows.length) + '</strong><em>\uAC74</em><small>\uC120\uD0DD \uC8FC\uCC28 \uC790\uB8CC \uAE30\uC900</small></article>',
      '<article class="daily-receipt-card"><span>\uC190\uC2E4\uAE08\uC561</span><strong>' + fmt(amount) + '</strong><em>\uC6D0</em><small>\uC811\uC218\uB0B4\uC5ED \uAE08\uC561 \uAE30\uC900</small></article>',
      '<article class="daily-receipt-card"><span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="purple">' + escapeSafe(first.label) + '</strong><em>' + fmt(first.count) + '\uAC74</em><small>\uC81C\uD488\uCF54\uB4DC + \uC0C9\uC0C1 TOP 5</small><div class="daily-receipt-tags">' + items.map(function (item) { return '<span>' + escapeSafe(item.label) + ' ' + fmt(item.count) + '\uAC74</span>'; }).join("") + '</div></article>'
    ].join("");
  }
  function restoreClaimAccumFrame() {
    var body = document.getElementById("defectCloseDashboardBody");
    if (!body) return;
    if (body.querySelector("iframe.defect-close-frame")) return;
    body.__claimAccumRouted = false;
    body.innerHTML = '<iframe class="defect-close-frame" src="dashboard_selected_months/dashboard_selected_months.html" title="\uD074\uB808\uC784\uB204\uC801\uD604\uD669"></iframe>';
  }
  function selectedWeeklyDeadlineEntries() {
    var year = n("weeklyYearSelect", new Date().getFullYear());
    var month = n("weeklyMonthSelect", new Date().getMonth() + 1);
    return costEntriesFor(year).filter(function (entry) { return entryMonth(entry) === month; });
  }
  function lineFromDeadlineMeta(meta) {
    var text = [meta && meta.cause, meta && meta.source, meta && meta.packageType, meta && meta.detailType, meta && meta.line, meta && meta.row && Object.values(meta.row).join(" ")].join(" ");
    if (/7\s*\uB77C\uC778|7\s*라인/.test(text)) return "7\uB77C\uC778";
    if (/3\s*\uB77C\uC778|3\s*라인|4\s*\uB77C\uC778|4\s*라인/.test(text)) return "4\uB77C\uC778";
    if (/1\s*\uB77C\uC778|1\s*라인/.test(text)) return "1\uB77C\uC778";
    if (/\uC678\uC8FC|외주/.test(text)) return "\uC678\uC8FC";
    if (/\uAD6C\uB9E4|구매/.test(text)) return "\uAD6C\uB9E4";
    return typeof monthlyLineLabel === "function" ? monthlyLineLabel(meta) : "\uBBF8\uBD84\uB958";
  }
  function weeklyMetaFromDeadline(meta, index) {
    return {
      row: meta.row,
      sourceMeta: meta,
      week: "1\uC8FC",
      receiptNo: "deadline_" + index,
      amount: Number(meta.amount || 0),
      line: lineFromDeadlineMeta(meta),
      type: meta.type || "\uBBF8\uBD84\uB958",
      item: meta.item || "\uBBF8\uBD84\uB958",
      color: meta.color || "",
      quantity: Number(meta.quantity || 1) || 1,
      cause: meta.cause || "",
      excludedCause: typeof isExcludedWeeklyCause === "function" ? isExcludedWeeklyCause(meta.cause) : false
    };
  }
  var prevMonthlyStatusRowsRepair = typeof monthlyStatusRows === "function" ? monthlyStatusRows : null;
  monthlyStatusRows = function () {
    var deadlineEntries = selectedWeeklyDeadlineEntries();
    if (deadlineEntries.length) {
      return deadlineEntries.flatMap(function (entry) {
        var excluded = Math.max(0, Math.min(Number(entry.excluded || 0), (entry.rows || []).length));
        return (entry.rows || []).slice(excluded).map(function (row, index) {
          var meta = monthlyDeadlineRowMeta(entry, row, index + excluded);
          meta.__entry = entry;
          meta.__index = index + excluded;
          return { __deadlineMeta: meta };
        });
      });
    }
    return prevMonthlyStatusRowsRepair ? prevMonthlyStatusRowsRepair() : [];
  };
  var prevWeeklyDashboardMetasRepair = typeof weeklyDashboardMetas === "function" ? weeklyDashboardMetas : null;
  weeklyDashboardMetas = function (rows) {
    if ((rows || []).some(function (row) { return row && row.__deadlineMeta; })) {
      return (rows || []).map(function (row, index) { return weeklyMetaFromDeadline(row.__deadlineMeta, index); })
        .filter(function (row) { return row.week && !row.excludedCause; });
    }
    return prevWeeklyDashboardMetasRepair ? prevWeeklyDashboardMetasRepair(rows) : [];
  };
  var prevRenderAllRepair = typeof renderAll === "function" ? renderAll : null;
  if (prevRenderAllRepair && !window.__repairPeriodRoutingWrapped) {
    window.__repairPeriodRoutingWrapped = true;
    renderAll = function (message) {
      prevRenderAllRepair(message);
      ensureMonthSelectOptions();
      fixDailyCards();
      restoreClaimAccumFrame();
    };
  }
  function bootRepair() {
    ensureMonthSelectOptions();
    fixDailyCards();
    restoreClaimAccumFrame();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootRepair);
  else setTimeout(bootRepair, 0);
})();

// final-stability-20260702-v3: keep the old claim-accum iframe, repair month selectors,
// fill prior-month receipt summary from input #3, and prefer deadline sheets for weekly defects.
(function () {
  function esc(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return String(value == null ? "" : value).replace(/[&<>\"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[ch];
    });
  }
  function fmt(value) {
    if (typeof formatNumber === "function") return formatNumber(value);
    return Number(value || 0).toLocaleString("ko-KR");
  }
  function toNum(value) {
    if (typeof numeric === "function") return numeric(value);
    return Number(String(value == null ? "" : value).replace(/[^\d.-]/g, "")) || 0;
  }
  function text(value) { return String(value == null ? "" : value); }
  function compact(value) { return text(value).replace(/\s+/g, "").trim(); }
  function currentSelectNumber(id, fallback) {
    var el = document.getElementById(id);
    var n = Number(el && el.value);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }
  function ensureMonthOptions(id) {
    if (id === "dailyMonthSelect" && window.__USE_EXTERNAL_DAILY_STABLE) return;
    var select = document.getElementById(id);
    if (!select) return;
    var current = Number(select.value) || new Date().getMonth() + 1;
    select.innerHTML = "";
    for (var m = 1; m <= 12; m += 1) {
      var option = document.createElement("option");
      option.value = String(m);
      option.textContent = m + "\uC6D4";
      select.appendChild(option);
    }
    select.value = String(Math.min(12, Math.max(1, current)));
  }
  function ensurePeriodOptions() {
    ensureMonthOptions("dailyMonthSelect");
    ensureMonthOptions("weeklyMonthSelect");
  }
  function restoreClaimAccumFrame() {
    var body = document.getElementById("defectCloseDashboardBody");
    if (!body) return;
    if (body.querySelector("iframe.defect-close-frame")) return;
    body.__claimAccumRouted = false;
    body.innerHTML = '<iframe class="defect-close-frame" src="dashboard_selected_months/dashboard_selected_months.html" title="\uD074\uB808\uC784\uB204\uC801\uD604\uD669"></iframe>';
  }
  function rowCells(row) { return (row && row.__cells) || (row && row.__raw && row.__raw.__cells) || []; }
  function rowHeaders(row) { return (row && row.__headers) || (row && row.__raw && row.__raw.__headers) || []; }
  function rowValuesSafe(row) {
    if (typeof rowValues === "function") return rowValues(row || {});
    return Object.keys(row || {}).filter(function (key) { return key.indexOf("__") !== 0; }).map(function (key) { return row[key]; });
  }
  function headerValue(row, patterns, fallbackIndexes) {
    var raw = (row && row.__raw) || row || {};
    var headers = rowHeaders(raw);
    var cells = rowCells(raw);
    for (var i = 0; i < headers.length; i += 1) {
      var header = compact(headers[i]);
      if (patterns.some(function (pattern) { return pattern.test(header); })) return cells[i];
    }
    var keys = Object.keys(raw);
    for (var k = 0; k < keys.length; k += 1) {
      var key = keys[k];
      if (key.indexOf("__") === 0) continue;
      if (patterns.some(function (pattern) { return pattern.test(compact(key)); })) {
        var value = raw[key];
        if (text(value).trim()) return value;
      }
    }
    if (Array.isArray(fallbackIndexes)) {
      for (var f = 0; f < fallbackIndexes.length; f += 1) {
        var candidate = cells[fallbackIndexes[f]];
        if (text(candidate).trim()) return candidate;
      }
    }
    return "";
  }
  function robustDate(row) {
    var value = headerValue(row, [/\uC811\uC218\uC77C\uC790/, /\uC811\uC218\uC77C/, /^date$/i], [0]);
    return (typeof parseDateFromText === "function" ? parseDateFromText(value) : null) ||
      (typeof findReceiptDate === "function" ? findReceiptDate([row]) : null) ||
      (typeof parseDateFromText === "function" ? parseDateFromText(row && row.__sheetDate) : null) ||
      (typeof findDateInRow === "function" ? findDateInRow(row) : null);
  }
  function robustNumber(row) {
    return headerValue(row, [/^\uBC88\uD638$/, /^\uC21C\uBC88$/, /^no$/i, /\uC811\uC218\uBC88\uD638/, /\uC811\uC218no/i], [1, 3]);
  }
  function isReceiptDataRow(row) {
    if (!row) return false;
    var number = compact(robustNumber(row));
    if (!number || /\uBC88\uD638|\uC21C\uBC88|\uC811\uC218/.test(number)) return false;
    var filled = rowValuesSafe(row).filter(function (cell) { return text(cell).trim(); }).length;
    if (filled < 4) return false;
    return !!robustDate(row);
  }
  function receiptCategoryIndex(row) {
    var pending = compact(headerValue(row, [/\uBBF8\uACB0\uAD6C\uBD84/, /\uC2DC\uACF5\uBBF8\uACB0/, /\uBBF8\uACB0/], [13]));
    if (pending === "0") return 0;
    var type = compact(headerValue(row, [/\uC720\uD615/, /\uAD6C\uBD84/, /\uBD84\uB958/, /^type$/i], [11, 2]));
    if (/\uAC10\uC131|\uCDE8\uAE09/.test(type)) return 2;
    return 1;
  }
  function categoryIndex(category) {
    var value = compact(category);
    if (value === "PPM") return -2;
    if (value === "\uACC4") return -1;
    if (/\uC2DC\uACF5|\uBBF8\uACB0/.test(value)) return 0;
    if (/\uAC10\uC131|\uCDE8\uAE09/.test(value)) return 2;
    return 1;
  }
  function historyRowsForMonth(year, month) {
    var history = (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; });
    var sources = history.length ? history : (state.uploads || []).filter(function (entry) { return entry.kind === "summary"; });
    return sources.flatMap(function (entry) {
      var rows = entry.rows || [];
      var excluded = Math.max(0, Math.min(Number(entry.excluded || 0), rows.length));
      return rows.slice(excluded).map(function (row) { return row && (row.__raw || row); });
    }).map(function (row) { return { row: row, date: robustDate(row) }; })
      .filter(function (item) {
        return item.date && item.date.getFullYear() === year && item.date.getMonth() + 1 === month && isReceiptDataRow(item.row);
      });
  }
  function monthCountForCategory(category, year, month) {
    var rows = historyRowsForMonth(year, month);
    var idx = categoryIndex(category);
    if (idx === -2) return 0;
    if (idx === -1) return rows.length;
    return rows.filter(function (item) { return receiptCategoryIndex(item.row) === idx; }).length;
  }
  var previousSummaryDisplayValueFinalV3 = typeof summaryDisplayValue === "function" ? summaryDisplayValue : null;
  summaryDisplayValue = function (row, key) {
    var meta = typeof currentSummaryMeta === "function" ? currentSummaryMeta() : { currentYear: new Date().getFullYear(), currentMonth: new Date().getMonth() + 1 };
    var category = row && row.category;
    var categoryText = compact(category);
    var monthMatch = String(key).match(/^m(\d{1,2})$/);
    if (monthMatch && categoryText !== "PPM") {
      var month = Number(monthMatch[1]);
      if (month < meta.currentMonth) {
        var directCount = monthCountForCategory(category, meta.currentYear, month);
        if (directCount > 0) return directCount;
      }
    }
    if ((key === "total" || key === "avg") && categoryText !== "PPM") {
      var sum = 0;
      var monthsWithData = 0;
      for (var m = 1; m <= 12; m += 1) {
        var count = monthCountForCategory(category, meta.currentYear, m);
        if (count > 0) {
          monthsWithData += 1;
          sum += count;
        }
      }
      if (sum > 0) {
        if (key === "total") {
          var target = categoryIndex(category);
          if (target === -1 && typeof fixedTargetForSummary === "function") return String(sum) + "(" + fixedTargetForSummary("total") + ")";
          if (target === 1 && typeof fixedTargetForSummary === "function") return String(sum) + "(" + fixedTargetForSummary("customer") + ")";
          if (target === 0 || target === 2) return String(sum) + "(0)";
          return sum;
        }
        if (key === "avg") {
          var avg = Math.round(sum / Math.max(1, monthsWithData));
          var targetAvg = categoryIndex(category);
          if (targetAvg === -1 && typeof fixedTargetForSummary === "function") return String(avg) + "(" + fixedTargetForSummary("avgTotal") + ")";
          if (targetAvg === 1 && typeof fixedTargetForSummary === "function") return String(avg) + "(" + fixedTargetForSummary("avgCustomer") + ")";
          if (targetAvg === 0 || targetAvg === 2) return String(avg) + "(0)";
          return avg;
        }
      }
    }
    return previousSummaryDisplayValueFinalV3 ? previousSummaryDisplayValueFinalV3(row, key) : row && row[key];
  };
  summaryMonthDisplayFallback = function (row, month) {
    var meta = typeof currentSummaryMeta === "function" ? currentSummaryMeta() : { currentYear: new Date().getFullYear() };
    return monthCountForCategory(row && row.category, meta.currentYear, month);
  };

  function selectedWeekDates(year, month, week) {
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(year, month) : [];
    return groups[Math.max(0, Number(week || 1) - 1)] || [];
  }
  function dateKey(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function dailySelectedRows() {
    var today = new Date();
    var year = currentSelectNumber("dailyYearSelect", today.getFullYear());
    var month = currentSelectNumber("dailyMonthSelect", today.getMonth() + 1);
    var week = currentSelectNumber("dailyWeekSelect", 1);
    var keys = new Set(selectedWeekDates(year, month, week).map(dateKey));
    var currentEntries = (state.uploads || []).filter(function (entry) { return entry.kind === "summary"; });
    var historyEntries = (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; });
    function collect(entries) {
      return entries.flatMap(function (entry) {
        var rows = entry.rows || [];
        var excluded = Math.max(0, Math.min(Number(entry.excluded || 0), rows.length));
        return rows.slice(excluded).map(function (row) { return row && (row.__raw || row); });
      }).map(function (row) { return { row: row, date: robustDate(row) }; })
        .filter(function (item) {
          return item.date && item.date.getFullYear() === year && item.date.getMonth() + 1 === month && keys.has(dateKey(item.date)) && isReceiptDataRow(item.row);
        });
    }
    var rows = collect(currentEntries);
    return rows.length ? rows : collect(historyEntries);
  }
  function rowLoss(row) {
    var v = headerValue(row, [/^\uAE08\uC561$/, /\uC2E4\uD328\uBE44\uC6A9/, /^amount$/i], [17, 16, 15]);
    var amount = toNum(v);
    if (amount) return amount;
    var cells = rowCells(row);
    for (var i = cells.length - 1; i >= 0; i -= 1) {
      amount = toNum(cells[i]);
      if (amount) return amount;
    }
    return 0;
  }
  function rowCode(row) {
    return compact(headerValue(row, [/\uC81C\uD488\uCF54\uB4DC/, /\uBD80\uD488\uCF54\uB4DC/, /^code$/i], [5, 3]));
  }
  function rowColor(row) {
    return compact(headerValue(row, [/\uC0C9\uC0C1/, /^color$/i], [6]));
  }
  function topReceiptItems(rows) {
    var map = new Map();
    rows.forEach(function (item) {
      var code = rowCode(item.row);
      if (!code) return;
      var color = rowColor(item.row);
      var label = color ? code + " / " + color : code;
      map.set(label, (map.get(label) || 0) + 1);
    });
    return Array.from(map.entries()).map(function (entry) { return { label: entry[0], count: entry[1] }; })
      .sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); })
      .slice(0, 5);
  }
  function renderDailyCardsStable() {
    var box = document.getElementById("dailyReceiptCards");
    if (!box) return;
    var rows = dailySelectedRows();
    var loss = rows.reduce(function (sum, item) { return sum + rowLoss(item.row); }, 0);
    var top = topReceiptItems(rows);
    var first = top[0] || { label: "-", count: 0 };
    box.innerHTML = [
      '<article class="daily-receipt-card"><span>\uC811\uC218\uAC74\uC218</span><strong>' + fmt(rows.length) + '</strong><em>\uAC74</em><small>\uC120\uD0DD \uC8FC\uCC28 \uC790\uB8CC \uAE30\uC900</small></article>',
      '<article class="daily-receipt-card"><span>\uC190\uC2E4\uAE08\uC561</span><strong>' + fmt(loss) + '</strong><em>\uC6D0</em><small>\uC811\uC218\uB0B4\uC5ED \uAE08\uC561 \uAE30\uC900</small></article>',
      '<article class="daily-receipt-card"><span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="purple">' + esc(first.label) + '</strong><em>' + fmt(first.count) + '\uAC74</em><small>\uC81C\uD488\uCF54\uB4DC + \uC0C9\uC0C1 TOP 5</small><div class="daily-receipt-tags">' + top.map(function (item) { return '<span>' + esc(item.label) + ' ' + fmt(item.count) + '\uAC74</span>'; }).join("") + '</div></article>'
    ].join("");
  }

  function shortYear(year) { return String(Number(year) || new Date().getFullYear()).slice(-2); }
  function costEntryYear(entry) {
    if (typeof entryYear === "function") {
      var found = entryYear(entry);
      if (found) return String(found).slice(-2);
    }
    var hay = [entry && entry.groupTitle, entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName].join(" ");
    var match = hay.match(/(\d{2})\s*\uB144|20(\d{2})/);
    return match ? (match[1] || match[2]) : "";
  }
  function costEntryMonth(entry) {
    if (typeof monthNumber === "function") return monthNumber([entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" "));
    var match = [entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" ").match(/(\d{1,2})\s*\uC6D4/);
    return match ? Number(match[1]) : 0;
  }
  function selectedDeadlineEntries() {
    var year = currentSelectNumber("weeklyYearSelect", new Date().getFullYear());
    var month = currentSelectNumber("weeklyMonthSelect", new Date().getMonth() + 1);
    return (state.uploads || []).filter(function (entry) {
      return entry.kind === "cost" && costEntryYear(entry) === shortYear(year) && costEntryMonth(entry) === month;
    });
  }
  function usefulDeadlineMeta(meta) {
    var item = compact(meta && meta.item);
    if (!item || /\uC81C\uD488\uCF54\uB4DC|\uBD80\uD488\uCF54\uB4DC|code/i.test(item)) return false;
    return true;
  }
  function lineFromDeadline(meta) {
    var values = [meta && meta.cause, meta && meta.source, meta && meta.packageType, meta && meta.detailType, meta && meta.line];
    if (meta && meta.row) values.push(rowValuesSafe(meta.row).join(" "));
    var hay = values.join(" ");
    if (/7\s*\uB77C\uC778|7\s*라인/.test(hay)) return "7\uB77C\uC778";
    if (/3\s*\uB77C\uC778|3\s*라인|4\s*\uB77C\uC778|4\s*라인/.test(hay)) return "4\uB77C\uC778";
    if (/1\s*\uB77C\uC778|1\s*라인/.test(hay)) return "1\uB77C\uC778";
    if (/\uC678\uC8FC|외주/.test(hay)) return "\uC678\uC8FC";
    if (/\uAD6C\uB9E4|구매/.test(hay)) return "\uAD6C\uB9E4";
    return "\uBBF8\uBD84\uB958";
  }
  var previousMonthlyStatusRowsFinalV3 = typeof monthlyStatusRows === "function" ? monthlyStatusRows : null;
  monthlyStatusRows = function () {
    var deadlineEntries = selectedDeadlineEntries();
    if (deadlineEntries.length && typeof monthlyDeadlineRowMeta === "function") {
      return deadlineEntries.flatMap(function (entry) {
        var rows = entry.rows || [];
        var excluded = Math.max(0, Math.min(Number(entry.excluded || 0), rows.length));
        return rows.slice(excluded).map(function (row, index) {
          var meta = monthlyDeadlineRowMeta(entry, row, index + excluded);
          meta.__entry = entry;
          meta.__index = index + excluded;
          return { __deadlineMeta: meta };
        }).filter(function (row) { return usefulDeadlineMeta(row.__deadlineMeta); });
      });
    }
    return previousMonthlyStatusRowsFinalV3 ? previousMonthlyStatusRowsFinalV3() : [];
  };
  var previousWeeklyDashboardMetasFinalV3 = typeof weeklyDashboardMetas === "function" ? weeklyDashboardMetas : null;
  weeklyDashboardMetas = function (rows) {
    if ((rows || []).some(function (row) { return row && row.__deadlineMeta; })) {
      return (rows || []).map(function (row, index) {
        var meta = row.__deadlineMeta;
        return {
          row: meta.row,
          sourceMeta: meta,
          week: "1\uC8FC",
          receiptNo: "deadline_" + index,
          amount: Number(meta.amount || 0),
          line: lineFromDeadline(meta),
          type: meta.type || "\uBBF8\uBD84\uB958",
          item: meta.item || "\uBBF8\uBD84\uB958",
          color: meta.color || "",
          quantity: Number(meta.quantity || 1) || 1,
          cause: meta.cause || "",
          excludedCause: typeof isExcludedWeeklyCause === "function" ? isExcludedWeeklyCause(meta.cause) : false
        };
      }).filter(function (row) { return row.week && row.item && !row.excludedCause; });
    }
    return previousWeeklyDashboardMetasFinalV3 ? previousWeeklyDashboardMetasFinalV3(rows) : [];
  };

  var previousRenderAllFinalV3 = typeof renderAll === "function" ? renderAll : null;
  if (previousRenderAllFinalV3 && !window.__finalStability20260702V3) {
    window.__finalStability20260702V3 = true;
    renderAll = function (message) {
      previousRenderAllFinalV3(message);
      ensurePeriodOptions();
      renderDailyCardsStable();
      restoreClaimAccumFrame();
    };
  }
  function bindFinalPeriodRefresh() {
    ["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || el.__finalStableRefreshBound) return;
      el.__finalStableRefreshBound = true;
      el.addEventListener("change", function () {
        if (typeof rebuildFromSelection === "function") rebuildFromSelection();
        if (typeof renderSummary === "function") renderSummary();
        if (typeof renderDetails === "function") renderDetails();
        renderDailyCardsStable();
        if (typeof renderCost === "function") renderCost();
        if (typeof saveDashboardState === "function") saveDashboardState();
      });
    });
    ["weeklyYearSelect", "weeklyMonthSelect"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || el.__finalWeeklyDeadlineBound) return;
      el.__finalWeeklyDeadlineBound = true;
      el.addEventListener("change", function () {
        if (typeof renderWeeklyDefect === "function") renderWeeklyDefect();
        if (typeof saveDashboardState === "function") saveDashboardState();
      });
    });
  }
  function bootFinalStable() {
    ensurePeriodOptions();
    bindFinalPeriodRefresh();
    renderDailyCardsStable();
    restoreClaimAccumFrame();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootFinalStable);
  else setTimeout(bootFinalStable, 0);
})();

// final-claim-accum-iframe-guard-20260702: keep claim accumulation on the original embedded dashboard.
(function () {
  function restoreFrame() {
    var body = document.getElementById("defectCloseDashboardBody");
    if (!body) return;
    if (body.querySelector("iframe.defect-close-frame")) return;
    body.__claimAccumRouted = false;
    body.innerHTML = '<iframe class="defect-close-frame" src="dashboard_selected_months/dashboard_selected_months.html" title="\uD074\uB808\uC784\uB204\uC801\uD604\uD669"></iframe>';
  }
  function scheduleRestore() { setTimeout(restoreFrame, 0); setTimeout(restoreFrame, 100); }
  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="claimAccum"], #claimAccumToggle')) scheduleRestore();
  }, true);
  document.addEventListener("change", function (event) {
    if (event.target && event.target.id === "claimAccumYearSelect") scheduleRestore();
  }, true);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleRestore);
  else scheduleRestore();
})();

// final-period-card-routing-20260702-v5
// Keeps selected period controls authoritative, fixes penalty-only exclusions,
// and renders claim accumulation cards by selected year.
(function () {
  var PENALTY = typeof penaltyPerClaim === "number" ? penaltyPerClaim : 60000;
  var dailySelection = null;
  var claimAccumYear = null;

  function h(value) {
    return typeof escapeHtml === "function" ? escapeHtml(value) : String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function js(value) { return String(value == null ? "" : value).replace(/\\/g, "\\\\").replace(/'/g, "\\'"); }
  function n(value) {
    var num = Number(String(value == null ? "" : value).replace(/[^\d.-]/g, ""));
    return Number.isFinite(num) ? num : 0;
  }
  function fmt(value) { return typeof formatNumber === "function" ? formatNumber(value) : Math.round(Number(value || 0)).toLocaleString(); }
  function cells(row) {
    if (!row) return [];
    if (Array.isArray(row.__cells)) return row.__cells;
    if (Array.isArray(row)) return row;
    return Object.keys(row).map(function (key) { return row[key]; });
  }
  function compact(value) { return String(value == null ? "" : value).replace(/\s+/g, " ").trim(); }
  function pickCell(row, indexes) {
    var list = cells(row);
    for (var i = 0; i < indexes.length; i += 1) {
      var value = compact(list[indexes[i]]);
      if (value) return value;
    }
    return "";
  }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    var text = compact(value);
    if (!text) return null;
    var match = text.match(/(20\d{2})[-./년\s]*(\d{1,2})[-./월\s]*(\d{1,2})/);
    if (!match) return null;
    var date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return Number.isNaN(date.getTime()) ? null : date;
  }
  function rowDate(row) {
    if (typeof robustReceiptDate === "function") {
      var found = robustReceiptDate(row);
      if (found) return found;
    }
    return parseDate(pickCell(row, [0])) || parseDate(compact(cells(row).join(" ")));
  }
  function dateKey(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function receiptRowsOf(kind) {
    return (state.uploads || []).filter(function (entry) { return entry.kind === kind; })
      .flatMap(function (entry) { return (entry.rows || []).map(function (row) { return row && (row.__raw || row); }); });
  }
  function validReceiptRow(row) {
    var date = rowDate(row);
    if (!date) return false;
    var list = cells(row);
    var joined = compact(list.slice(0, 8).join(" "));
    if (/접수일자|접수번호|부품코드|제품코드|번호/.test(joined)) return false;
    return Boolean(compact(list[3]) || compact(list[5]) || compact(list[12]));
  }
  function receiptAmount(row) {
    var list = cells(row);
    for (var i = list.length - 1; i >= 0; i -= 1) {
      var amount = n(list[i]);
      if (amount) return amount;
    }
    return 0;
  }
  function receiptCode(row) { return pickCell(row, [5, 3]); }
  function receiptColor(row) { return pickCell(row, [6]); }
  function isOpenInstall(row) { return compact(cells(row)[13]) === "0"; }
  function selectedWeekDates(year, month, week) {
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(year, month) : [];
    return groups[Math.max(0, Number(week || 1) - 1)] || [];
  }
  function currentDailySelection() {
    var today = new Date();
    return {
      year: Number((document.getElementById("dailyYearSelect") || {}).value) || (dailySelection && dailySelection.year) || today.getFullYear(),
      month: Number((document.getElementById("dailyMonthSelect") || {}).value) || (dailySelection && dailySelection.month) || today.getMonth() + 1,
      week: Number((document.getElementById("dailyWeekSelect") || {}).value) || (dailySelection && dailySelection.week) || 1
    };
  }
  function rememberDailySelection() { dailySelection = currentDailySelection(); }
  function fillOptions(select, options, value) {
    if (!select) return;
    select.innerHTML = options.map(function (item) {
      return '<option value="' + h(item.value) + '"' + (String(item.value) === String(value) ? ' selected' : '') + '>' + h(item.label) + '</option>';
    }).join("");
  }
  function ensureDailyOptions() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var sel = dailySelection || currentDailySelection();
    var yearSelect = document.getElementById("dailyYearSelect");
    var monthSelect = document.getElementById("dailyMonthSelect");
    var weekSelect = document.getElementById("dailyWeekSelect");
    if (!yearSelect || !monthSelect || !weekSelect) return;
    var years = [2025, 2026, 2027].map(function (year) { return { value: String(year), label: year + "년" }; });
    var months = Array.from({ length: 12 }, function (_, index) { return { value: String(index + 1), label: (index + 1) + "월" }; });
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(sel.year, sel.month) : [1, 2, 3, 4, 5];
    var weeks = groups.map(function (_, index) { return { value: String(index + 1), label: (index + 1) + "주" }; });
    if (!weeks.length) weeks = [{ value: "1", label: "1주" }];
    var weekValue = Math.min(sel.week, weeks.length);
    fillOptions(yearSelect, years, sel.year);
    fillOptions(monthSelect, months, sel.month);
    fillOptions(weekSelect, weeks, weekValue);
    dailySelection = { year: Number(yearSelect.value) || sel.year, month: Number(monthSelect.value) || sel.month, week: Number(weekSelect.value) || weekValue };
  }
  function selectedDailyRows() {
    var sel = dailySelection || currentDailySelection();
    var keys = new Set(selectedWeekDates(sel.year, sel.month, sel.week).map(dateKey));
    function collect(kind) {
      return receiptRowsOf(kind).map(function (row) { return { row: row, date: rowDate(row) }; })
        .filter(function (item) {
          return item.date && item.date.getFullYear() === sel.year && item.date.getMonth() + 1 === sel.month && keys.has(dateKey(item.date)) && validReceiptRow(item.row);
        });
    }
    var rows = collect("receiptHistory");
    return rows.length ? rows : collect("summary");
  }
  function topDailyItems(rows) {
    var source = rows.filter(function (item) { return isOpenInstall(item.row); });
    if (!source.length) source = rows.slice().sort(function (a, b) { return receiptAmount(b.row) - receiptAmount(a.row); }).slice(0, 1);
    var map = new Map();
    source.forEach(function (item) {
      var code = receiptCode(item.row);
      if (!code) return;
      var color = receiptColor(item.row);
      var label = color ? code + " / " + color : code;
      map.set(label, (map.get(label) || 0) + 1);
    });
    return Array.from(map.entries()).map(function (entry) { return { label: entry[0], count: entry[1] }; })
      .sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); }).slice(0, 5);
  }
  function renderDailyCardsV5() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    ensureDailyOptions();
    var box = document.getElementById("dailyReceiptCards");
    if (!box) return;
    var rows = selectedDailyRows();
    var loss = rows.reduce(function (sum, item) { return sum + receiptAmount(item.row); }, 0);
    var top = topDailyItems(rows);
    var first = top[0] || { label: "-", count: 0 };
    box.innerHTML = [
      '<article class="daily-receipt-card"><span>접수건수</span><strong>' + fmt(rows.length) + '</strong><em>건</em><small>선택 주차 자료 기준</small></article>',
      '<article class="daily-receipt-card"><span>손실금액</span><strong>' + fmt(loss) + '</strong><em>원</em><small>접수내역 금액 기준</small></article>',
      '<article class="daily-receipt-card"><span>주요 접수 품목</span><strong class="purple">' + h(first.label) + '</strong><em>' + fmt(first.count) + '건</em><small>시공미결 품목 TOP 5</small><div class="daily-receipt-tags">' + top.map(function (item) { return '<span>' + h(item.label) + ' ' + fmt(item.count) + '건</span>'; }).join("") + '</div></article>'
    ].join("");
  }

  function shortYear(year) { return String(Number(year) || new Date().getFullYear()).slice(-2); }
  function costYear(entry) {
    if (typeof entryYear === "function") {
      var year = entryYear(entry);
      if (year) return String(year).slice(-2);
    }
    var text = [entry && entry.groupTitle, entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.sourceUrl, entry && entry.groupKey].join(" ");
    var match = text.match(/20(\d{2})|(\d{2})\s*년|existing-(\d{2})/);
    return match ? (match[1] || match[2] || match[3]) : "";
  }
  function costMonth(entry) {
    if (typeof monthNumber === "function") {
      var month = monthNumber([entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" "));
      if (month) return month;
    }
    var match = [entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" ").match(/(\d{1,2})\s*월/);
    return match ? Number(match[1]) : 0;
  }
  function costEntriesFor(year) {
    return (state.uploads || []).filter(function (entry) { return entry.kind === "cost" && costYear(entry) === shortYear(year); })
      .sort(function (a, b) { return costMonth(a) - costMonth(b); });
  }
  function cardCount(entry) { return typeof entryCount === "function" ? entryCount(entry) : Number(entry.countHint || 0) || (entry.rows || []).length; }
  function cardAmount(entry) { return typeof entryAmount === "function" ? entryAmount(entry) : Number(entry.defectAmount || 0) + Math.max(0, cardCount(entry) - Number(entry.excluded || 0)) * PENALTY; }
  function cardLabel(entry, year) { var month = costMonth(entry); return month ? month + "월" : (entry.label || year + "년 자료"); }
  function claimAccumCard(entry, year) {
    var id = js(entry.id);
    var count = cardCount(entry);
    var checked = entry.selected ? "checked" : "";
    return '<article class="file-card"><div class="topline"><span class="name">' + h(cardLabel(entry, year)) + '</span><div class="card-actions">' +
      '<input type="checkbox" ' + checked + ' onclick="event.stopPropagation();toggleUpload(\'' + id + '\', this.checked)" />' +
      '<button class="delete-btn" type="button" onclick="event.stopPropagation();deleteUpload(\'' + id + '\')">삭제</button></div></div>' +
      '<div class="meta">품질 비용</div><div class="count">' + fmt(count) + '건</div><div class="meta">' + h(entry.sourceSheet || entry.label || "") + '</div>' +
      '<div class="amount-line">₩ ' + fmt(cardAmount(entry)) + '</div><div class="exclude-row" onclick="event.stopPropagation();"><span>패널티 제외</span>' +
      '<input type="number" min="0" max="' + count + '" value="' + Number(entry.excluded || 0) + '" onchange="setExcluded(\'' + id + '\', this.value);setTimeout(window.renderClaimAccumCardsV5, 160)" />' +
      '<span>건</span></div></article>';
  }
  function renderClaimAccumCardsV5() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var panel = document.getElementById("defectCloseDashboardBody");
    if (!panel) return;
    var current = Number((document.getElementById("claimAccumYearSelect") || {}).value) || claimAccumYear || new Date().getFullYear();
    claimAccumYear = current;
    var entries = costEntriesFor(current);
    var totalCount = entries.reduce(function (sum, entry) { return sum + cardCount(entry); }, 0);
    var totalAmount = entries.reduce(function (sum, entry) { return sum + cardAmount(entry); }, 0);
    var totalExcluded = entries.reduce(function (sum, entry) { return sum + Number(entry.excluded || 0); }, 0);
    panel.innerHTML = '<section class="sheet-section weekly-placeholder"><div class="section-title-row"><button id="claimAccumToggle" class="section-toggle" type="button">∨ 클레임누적자료</button>' +
      '<div class="section-controls"><label>년도 <select id="claimAccumYearSelect">' + [2025, 2026, 2027].map(function (year) { return '<option value="' + year + '"' + (year === current ? ' selected' : '') + '>' + year + '년</option>'; }).join("") + '</select></label>' +
      '<button type="button" onclick="selectCheckedOnly()">선택월 합계 보기</button><button type="button" onclick="clearSelection()">월 선택 해제</button></div></div>' +
      '<div id="claimAccumBody" class="dashboard-group-body"><div class="file-grid"><article class="file-card active"><div class="topline"><span class="name">종합</span></div>' +
      '<div class="meta">' + shortYear(current) + '년 마감자료</div><div class="count">' + fmt(totalCount) + '건</div><div class="amount-line">₩ ' + fmt(totalAmount) + '</div><div class="meta">패널티 제외 ' + fmt(totalExcluded) + '건</div></article>' +
      entries.map(function (entry) { return claimAccumCard(entry, current); }).join("") + '</div></div></section>';
    var select = document.getElementById("claimAccumYearSelect");
    if (select) select.addEventListener("change", function () { claimAccumYear = Number(select.value) || claimAccumYear; setTimeout(renderClaimAccumCardsV5, 160); });
    var toggle = document.getElementById("claimAccumToggle");
    var body = document.getElementById("claimAccumBody");
    if (toggle && body) toggle.addEventListener("click", function () { body.classList.toggle("is-hidden"); toggle.textContent = (body.classList.contains("is-hidden") ? "> " : "∨ ") + "클레임누적자료"; });
  }
  window.renderClaimAccumCardsV5 = renderClaimAccumCardsV5;

  function selectedDeadlineEntriesV5() {
    var year = Number((document.getElementById("weeklyYearSelect") || {}).value) || new Date().getFullYear();
    var month = Number((document.getElementById("weeklyMonthSelect") || {}).value) || new Date().getMonth() + 1;
    return (state.uploads || []).filter(function (entry) { return entry.kind === "cost" && costYear(entry) === shortYear(year) && costMonth(entry) === month; });
  }
  function usefulMeta(meta) {
    var item = compact(meta && meta.item);
    if (!item || /제품코드|부품코드|code/i.test(item)) return false;
    return true;
  }
  var previousMonthlyStatusRowsV5 = typeof monthlyStatusRows === "function" ? monthlyStatusRows : null;
  monthlyStatusRows = function () {
    var deadlineEntries = selectedDeadlineEntriesV5();
    if (deadlineEntries.length && typeof monthlyDeadlineRowMeta === "function") {
      return deadlineEntries.flatMap(function (entry) {
        return (entry.rows || []).map(function (row, index) {
          var meta = monthlyDeadlineRowMeta(entry, row, index);
          meta.__entry = entry;
          meta.__index = index;
          return { __deadlineMeta: meta };
        }).filter(function (row) { return usefulMeta(row.__deadlineMeta); });
      });
    }
    return previousMonthlyStatusRowsV5 ? previousMonthlyStatusRowsV5() : [];
  };
  var previousWeeklyDashboardMetasV5 = typeof weeklyDashboardMetas === "function" ? weeklyDashboardMetas : null;
  weeklyDashboardMetas = function (rows) {
    if ((rows || []).some(function (row) { return row && row.__deadlineMeta; })) {
      return (rows || []).map(function (row, index) {
        var meta = row.__deadlineMeta;
        var line = typeof lineFromDeadline === "function" ? lineFromDeadline(meta) : (typeof monthlyLineLabel === "function" ? monthlyLineLabel(meta) : (meta.cause || "미분류"));
        return {
          row: meta.row,
          sourceMeta: meta,
          week: "1주",
          receiptNo: "deadline_" + index,
          amount: Number(meta.amount || 0) - (meta.penaltyEligible === false ? PENALTY : 0),
          line: line,
          type: meta.type || "미분류",
          item: meta.item || "미분류",
          color: meta.color || "",
          quantity: Number(meta.quantity || 1) || 1,
          cause: meta.cause || "",
          excludedCause: typeof isExcludedWeeklyCause === "function" ? isExcludedWeeklyCause(meta.cause) : false
        };
      }).filter(function (row) { return row.week && row.item && !row.excludedCause; });
    }
    return previousWeeklyDashboardMetasV5 ? previousWeeklyDashboardMetasV5(rows) : [];
  };

  function scheduleDailyRender() {
    setTimeout(function () { ensureDailyOptions(); renderDailyCardsV5(); }, 80);
    setTimeout(function () { ensureDailyOptions(); renderDailyCardsV5(); }, 220);
  }
  document.addEventListener("change", function (event) {
    if (!event.target) return;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(event.target.id) >= 0) {
      rememberDailySelection();
      scheduleDailyRender();
    }
    if (event.target.id === "claimAccumYearSelect") {
      claimAccumYear = Number(event.target.value) || claimAccumYear;
      setTimeout(renderClaimAccumCardsV5, 180);
      setTimeout(renderClaimAccumCardsV5, 360);
    }
  }, true);
  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="claimAccum"]')) {
      setTimeout(renderClaimAccumCardsV5, 180);
      setTimeout(renderClaimAccumCardsV5, 360);
    }
  }, true);

  var previousRenderAllV5 = typeof renderAll === "function" ? renderAll : null;
  if (previousRenderAllV5 && !window.__finalPeriodCardRouting20260702V5) {
    window.__finalPeriodCardRouting20260702V5 = true;
    renderAll = function (message) {
      var keepDaily = dailySelection;
      previousRenderAllV5(message);
      dailySelection = keepDaily || dailySelection || currentDailySelection();
      scheduleDailyRender();
      if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) setTimeout(renderClaimAccumCardsV5, 180);
    };
  }
  function boot() {
    rememberDailySelection();
    scheduleDailyRender();
    if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) setTimeout(renderClaimAccumCardsV5, 180);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else setTimeout(boot, 0);
})();

// final-selection-data-routing-20260702-v6
// Last-mile routing: daily uses receipt history, weekly uses deadline sheets with Q-week,
// and claim accumulation starts collapsed with horizontal cards.
(function () {
  var PENALTY = typeof penaltyPerClaim === "number" ? penaltyPerClaim : 60000;
  var KO = {
    year: "\uB144\uB3C4", month: "\uC6D4", week: "\uC8FC",
    dailyCount: "\uC811\uC218\uAC74\uC218", loss: "\uC190\uC2E4\uAE08\uC561", mainItem: "\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9",
    caseUnit: "\uAC74", won: "\uC6D0", selectedWeekBase: "\uC120\uD0DD \uC8FC\uCC28 \uC790\uB8CC \uAE30\uC900",
    receiptAmountBase: "\uC811\uC218\uB0B4\uC5ED \uAE08\uC561 \uAE30\uC900", pendingTop: "\uC2DC\uACF5\uBBF8\uACB0 \uD488\uBAA9 TOP 5",
    claimAccum: "\uD074\uB808\uC784\uB204\uC801\uC790\uB8CC", selectedSum: "\uC120\uD0DD\uC6D4 \uD569\uACC4 \uBCF4\uAE30",
    unselectMonth: "\uC6D4 \uC120\uD0DD \uD574\uC81C", total: "\uC885\uD569", deadlineData: "\uB9C8\uAC10\uC790\uB8CC",
    qualityCost: "\uD488\uC9C8 \uBE44\uC6A9", penaltyExcluded: "\uD328\uB110\uD2F0 \uC81C\uC678", deleteText: "\uC0AD\uC81C"
  };
  function h(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function fmt(value) { return typeof formatNumber === "function" ? formatNumber(value) : Math.round(Number(value || 0)).toLocaleString(); }
  function money(value) { return "\u20A9 " + fmt(value); }
  function clean(value) { return String(value == null ? "" : value).replace(/\s+/g, " ").trim(); }
  function toNumber(value) {
    if (typeof numeric === "function") return numeric(value);
    var n = Number(String(value == null ? "" : value).replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  function shortYear(year) { return String(Number(year) || new Date().getFullYear()).slice(-2); }
  function rawRow(row) { return row && (row.__raw || row) || {}; }
  function cells(row) {
    var raw = rawRow(row);
    if (Array.isArray(raw.__cells)) return raw.__cells;
    if (Array.isArray(row && row.__cells)) return row.__cells;
    if (Array.isArray(raw)) return raw;
    return Object.keys(raw).map(function (key) { return raw[key]; });
  }
  function cell(row, index) { var list = cells(row); return clean(list[index]); }
  function firstCell(row, indexes) {
    for (var i = 0; i < indexes.length; i += 1) {
      var value = cell(row, indexes[i]);
      if (value) return value;
    }
    return "";
  }
  function parseAnyDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    var text = clean(value);
    if (!text) return null;
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(text);
      if (parsed) return parsed;
    }
    var m = text.match(/(20\d{2})\D*(\d{1,2})\D*(\d{1,2})/);
    if (!m) return null;
    var d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return Number.isNaN(d.getTime()) ? null : d;
  }
  function rowDate(row) {
    if (typeof robustReceiptDate === "function") {
      var d = robustReceiptDate(rawRow(row));
      if (d) return d;
    }
    if (typeof findReceiptDate === "function") {
      var found = findReceiptDate([rawRow(row)]);
      if (found) return found;
    }
    return parseAnyDate(firstCell(row, [0, 1])) || parseAnyDate(clean(cells(row).slice(0, 6).join(" ")));
  }
  function dateKey(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function dateStampSafe(date) { return typeof dateStamp === "function" ? dateStamp(date) : dateKey(date); }
  function countableReceipt(row) {
    var raw = rawRow(row);
    if (typeof robustIsCountableReceiptRow === "function" && robustIsCountableReceiptRow(raw)) return true;
    var date = rowDate(raw);
    if (!date) return false;
    var joined = clean(cells(raw).slice(0, 8).join(" "));
    if (/\uC811\uC218\uC77C\uC790|\uC811\uC218\uBC88\uD638|\uBD80\uD488\uCF54\uB4DC|\uBC88\uD638/.test(joined)) return false;
    return Boolean(firstCell(raw, [3, 5, 12]));
  }
  function receiptHistoryEntries() {
    return (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; });
  }
  function summaryEntries() {
    return (state.uploads || []).filter(function (entry) { return entry.kind === "summary"; });
  }
  function collectReceiptRows(entries) {
    if (typeof collectDatedReceiptRows === "function") {
      var rows = collectDatedReceiptRows(entries || []);
      if (rows && rows.length) return rows.map(function (item) { return { row: rawRow(item.row), date: item.date || rowDate(item.row) }; }).filter(function (item) { return item.date && countableReceipt(item.row); });
    }
    return (entries || []).flatMap(function (entry) { return entry.rows || []; }).map(function (row) {
      var raw = rawRow(row);
      return { row: raw, date: rowDate(raw) };
    }).filter(function (item) { return item.date && countableReceipt(item.row); });
  }
  function allHistoryRows() {
    var rows = collectReceiptRows(receiptHistoryEntries());
    return rows.length ? rows : collectReceiptRows(summaryEntries());
  }
  function dailySelection() {
    var today = new Date();
    return {
      year: Number((document.getElementById("dailyYearSelect") || {}).value) || today.getFullYear(),
      month: Number((document.getElementById("dailyMonthSelect") || {}).value) || today.getMonth() + 1,
      week: Number((document.getElementById("dailyWeekSelect") || {}).value) || 1
    };
  }
  function weekDates(year, month, week) {
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(year, month) : [];
    return groups[Math.max(0, Number(week || 1) - 1)] || [];
  }
  function receiptRowsForWeekSelection(sel) {
    var keys = new Set(weekDates(sel.year, sel.month, sel.week).map(dateKey));
    return allHistoryRows().filter(function (item) {
      return item.date && item.date.getFullYear() === sel.year && item.date.getMonth() + 1 === sel.month && keys.has(dateKey(item.date));
    });
  }
  function receiptRowsBeforeSelectionMonth(sel) {
    return allHistoryRows().filter(function (item) {
      return item.date && (item.date.getFullYear() < sel.year || (item.date.getFullYear() === sel.year && item.date.getMonth() + 1 < sel.month));
    });
  }
  function receiptRowsUpToWeekSelection(sel) {
    var dates = weekDates(sel.year, sel.month, sel.week);
    var end = dates.length ? dates[dates.length - 1] : new Date(sel.year, sel.month - 1, 1);
    var endStamp = dateStampSafe(end);
    return allHistoryRows().filter(function (item) {
      return item.date && item.date.getFullYear() === sel.year && item.date.getMonth() + 1 === sel.month && dateStampSafe(item.date) <= endStamp;
    });
  }
  function entryFromRows(kind, rows, label) {
    return { kind: kind, label: label || kind, fileName: label || kind, rows: (rows || []).map(function (item) { return rawRow(item.row || item); }), excluded: 0 };
  }
  function refreshDailyTablesV6() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var sel = dailySelection();
    var before = receiptRowsBeforeSelectionMonth(sel);
    var current = receiptRowsUpToWeekSelection(sel);
    if (typeof deriveClaimSummaryForView === "function") {
      var endDates = weekDates(sel.year, sel.month, sel.week);
      var end = endDates.length ? endDates[endDates.length - 1] : new Date(sel.year, sel.month - 1, 1);
      var previousBuild = typeof buildClaimSummaryMeta === "function" ? buildClaimSummaryMeta : null;
      try {
        if (previousBuild) state.summaryMeta = previousBuild(end);
        state.summary = deriveClaimSummaryForView([entryFromRows("receiptHistory", before, "selected-history-v6")], [entryFromRows("summary", current, "selected-current-v6")]);
      } catch (err) { /* keep current table if upstream format differs */ }
    }
    if (typeof deriveDetailsFromReceiptEntries === "function") {
      try { state.details = deriveDetailsFromReceiptEntries([entryFromRows("summary", receiptRowsForWeekSelection(sel), "selected-detail-v6")]); } catch (err2) {}
    }
    if (typeof renderSummary === "function") renderSummary();
    if (typeof renderDetails === "function") renderDetails();
  }
  function receiptAmount(row) {
    var raw = rawRow(row);
    if (typeof pick === "function") {
      var direct = toNumber(pick(raw, ["\uAE08\uC561", "\uC2E4\uD328\uBE44\uC6A9", "amount"]));
      if (direct) return direct;
    }
    var list = cells(raw);
    for (var i = list.length - 1; i >= 0; i -= 1) {
      var value = toNumber(list[i]);
      if (value) return value;
    }
    return 0;
  }
  function receiptCode(row) {
    var raw = rawRow(row);
    if (typeof pick === "function") return clean(pick(raw, ["\uBD80\uD488\uCF54\uB4DC", "\uC81C\uD488\uCF54\uB4DC", "code"])) || firstCell(raw, [5, 3]);
    return firstCell(raw, [5, 3]);
  }
  function receiptColor(row) {
    var raw = rawRow(row);
    if (typeof pick === "function") return clean(pick(raw, ["\uC0C9\uC0C1", "color"])) || firstCell(raw, [6]);
    return firstCell(raw, [6]);
  }
  function isPendingInstall(row) {
    var raw = rawRow(row);
    if (typeof pick === "function") {
      var value = clean(pick(raw, ["\uBBF8\uACB0\uAD6C\uBD84", "\uC2DC\uACF5\uBBF8\uACB0"]));
      if (value) return value === "0";
    }
    return firstCell(raw, [13]) === "0";
  }
  function topReceiptItems(rows) {
    var source = rows.filter(function (item) { return isPendingInstall(item.row); });
    if (!source.length) source = rows.slice().sort(function (a, b) { return receiptAmount(b.row) - receiptAmount(a.row); }).slice(0, 1);
    var map = new Map();
    source.forEach(function (item) {
      var code = receiptCode(item.row);
      if (!code) return;
      var color = receiptColor(item.row);
      var key = code + (color ? " / " + color : "");
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(function (pair) { return { label: pair[0], count: pair[1] }; }).sort(function (a, b) {
      return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true });
    }).slice(0, 5);
  }
  function renderDailyCardsV6() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var box = document.getElementById("dailyReceiptCards");
    if (!box) return;
    var rows = receiptRowsForWeekSelection(dailySelection());
    var amount = rows.reduce(function (sum, item) { return sum + receiptAmount(item.row); }, 0);
    var top = topReceiptItems(rows);
    var first = top[0] || { label: "-", count: 0 };
    box.innerHTML = '<article class="daily-receipt-card"><span>' + KO.dailyCount + '</span><strong>' + fmt(rows.length) + '</strong><em>' + KO.caseUnit + '</em><small>' + KO.selectedWeekBase + '</small></article>' +
      '<article class="daily-receipt-card"><span>' + KO.loss + '</span><strong>' + fmt(amount) + '</strong><em>' + KO.won + '</em><small>' + KO.receiptAmountBase + '</small></article>' +
      '<article class="daily-receipt-card"><span>' + KO.mainItem + '</span><strong class="purple">' + h(first.label) + '</strong><em>' + fmt(first.count) + KO.caseUnit + '</em><small>' + KO.pendingTop + '</small><div class="daily-receipt-tags">' + top.map(function (item) { return '<span>' + h(item.label) + ' ' + fmt(item.count) + KO.caseUnit + '</span>'; }).join("") + '</div></article>';
  }
  function scheduleDailyV6() {
    setTimeout(function () { refreshDailyTablesV6(); renderDailyCardsV6(); }, 80);
    setTimeout(function () { refreshDailyTablesV6(); renderDailyCardsV6(); }, 240);
  }

  function costEntryYear(entry) {
    if (typeof entryYear === "function") {
      var y = entryYear(entry);
      if (y) return String(y).slice(-2);
    }
    var text = [entry && entry.groupTitle, entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.sourceUrl, entry && entry.groupKey].join(" ");
    var m = text.match(/20(\d{2})|(\d{2})\s*\uB144|existing-(\d{2})/);
    return m ? (m[1] || m[2] || m[3]) : "";
  }
  function costEntryMonth(entry) {
    if (typeof monthNumber === "function") {
      var m1 = monthNumber([entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" "));
      if (m1) return m1;
    }
    var text = [entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" ");
    var m = text.match(/(\d{1,2})\s*\uC6D4/);
    return m ? Number(m[1]) : 0;
  }
  function selectedDeadlineBundle() {
    var y = Number((document.getElementById("weeklyYearSelect") || {}).value) || new Date().getFullYear();
    var m = Number((document.getElementById("weeklyMonthSelect") || {}).value) || new Date().getMonth() + 1;
    var all = (state.uploads || []).filter(function (entry) { return entry.kind === "cost" && costEntryYear(entry) === shortYear(y); });
    var exact = all.filter(function (entry) { return costEntryMonth(entry) === m; });
    if (exact.length) return { year: y, month: m, entries: exact, fallback: false };
    var months = Array.from(new Set(all.map(costEntryMonth).filter(Boolean))).sort(function (a, b) { return a - b; });
    var prior = months.filter(function (month) { return month <= m; }).pop() || months[months.length - 1] || 0;
    return { year: y, month: prior || m, entries: all.filter(function (entry) { return costEntryMonth(entry) === prior; }), fallback: prior && prior !== m };
  }
  function usefulDeadlineMeta(meta) {
    if (!meta) return false;
    var item = clean(meta.item);
    if (!item || /^(\uC81C\uD488\uCF54\uB4DC|\uBD80\uD488\uCF54\uB4DC|item|code)$/i.test(item)) return false;
    if (typeof isMonthlyDeadlineDataRow === "function" && !isMonthlyDeadlineDataRow(meta)) return false;
    return true;
  }
  function weekFromDeadlineMeta(meta, index) {
    var raw = rawRow(meta && meta.row);
    var options = [meta && meta.week, meta && meta.deadlineWeek, raw.deadlineWeek, raw.week, raw["Q"], raw["\uB4F1\uB85D\uC77C"], raw["\uC8FC\uCC28"], raw["\uC8FC"], cell(raw, 16), cell(raw, 15), clean(cells(raw).slice(14, 18).join(" "))];
    for (var i = 0; i < options.length; i += 1) {
      var text = clean(options[i]);
      if (!text) continue;
      var m = text.match(/([1-5])\s*\uC8FC|^([1-5])$/);
      if (m) return (m[1] || m[2]) + "\uC8FC";
    }
    var date = parseAnyDate(options.join(" "));
    if (date && typeof claimSummaryWeekGroups === "function") {
      var groups = claimSummaryWeekGroups(date.getFullYear(), date.getMonth() + 1);
      for (var g = 0; g < groups.length; g += 1) {
        if (groups[g].some(function (d) { return dateKey(d) === dateKey(date); })) return (g + 1) + "\uC8FC";
      }
    }
    return ((index % 5) + 1) + "\uC8FC";
  }
  var previousMonthlyStatusRowsV6 = typeof monthlyStatusRows === "function" ? monthlyStatusRows : null;
  monthlyStatusRows = function () {
    var bundle = selectedDeadlineBundle();
    if (bundle.entries.length && typeof monthlyDeadlineRowMeta === "function") {
      return bundle.entries.flatMap(function (entry) {
        return (entry.rows || []).map(function (row, index) {
          var meta = monthlyDeadlineRowMeta(entry, row, index);
          meta.__entry = entry;
          meta.__index = index;
          meta.__effectiveYear = bundle.year;
          meta.__effectiveMonth = bundle.month;
          return { __deadlineMeta: meta };
        }).filter(function (row) { return usefulDeadlineMeta(row.__deadlineMeta); });
      });
    }
    return previousMonthlyStatusRowsV6 ? previousMonthlyStatusRowsV6() : [];
  };
  var previousWeeklyDashboardMetasV6 = typeof weeklyDashboardMetas === "function" ? weeklyDashboardMetas : null;
  weeklyDashboardMetas = function (rows) {
    if ((rows || []).some(function (row) { return row && row.__deadlineMeta; })) {
      return (rows || []).map(function (row, index) {
        var meta = row.__deadlineMeta;
        var line = typeof lineFromDeadline === "function" ? lineFromDeadline(meta) : (typeof monthlyLineLabel === "function" ? monthlyLineLabel(meta) : clean(meta.cause) || "\uBBF8\uBD84\uB958");
        var baseAmount = Number(meta.amount || 0) - (meta.penaltyEligible === false ? PENALTY : 0);
        return {
          row: meta.row,
          sourceMeta: meta,
          week: weekFromDeadlineMeta(meta, index),
          receiptNo: clean(meta.receiptNo) || "deadline_" + (meta.__entry && meta.__entry.id || "entry") + "_" + index,
          amount: baseAmount,
          line: line,
          type: clean(meta.type) || "\uBBF8\uBD84\uB958",
          item: clean(meta.item) || "\uBBF8\uBD84\uB958",
          color: clean(meta.color),
          quantity: Number(meta.quantity || 1) || 1,
          cause: clean(meta.cause),
          excludedCause: typeof isExcludedWeeklyCause === "function" ? isExcludedWeeklyCause(meta.cause) : false
        };
      }).filter(function (row) { return row.week && row.item && !row.excludedCause; });
    }
    return previousWeeklyDashboardMetasV6 ? previousWeeklyDashboardMetasV6(rows) : [];
  };
  function scheduleWeeklyV6() {
    setTimeout(function () { if (typeof renderWeeklyDefect === "function") renderWeeklyDefect(); }, 80);
    setTimeout(function () { if (typeof renderWeeklyDefect === "function") renderWeeklyDefect(); }, 260);
  }

  function claimCostEntries(year) {
    return (state.uploads || []).filter(function (entry) { return entry.kind === "cost" && costEntryYear(entry) === shortYear(year); }).sort(function (a, b) { return costEntryMonth(a) - costEntryMonth(b); });
  }
  function cardCount(entry) { return typeof entryCount === "function" ? entryCount(entry) : (entry.rows || []).length; }
  function cardAmount(entry) { return typeof entryAmount === "function" ? entryAmount(entry) : Number(entry.defectAmount || 0) + Math.max(0, cardCount(entry) - Number(entry.excluded || 0)) * PENALTY; }
  function cardTitle(entry, year) { var m = costEntryMonth(entry); return m ? m + KO.month : shortYear(year) + KO.deadlineData; }
  function jsQuote(value) { return String(value == null ? "" : value).replace(/\\/g, "\\\\").replace(/'/g, "\\'"); }
  function ensureClaimAccumCss() {
    if (document.getElementById("claimAccumV6Style")) return;
    var style = document.createElement("style");
    style.id = "claimAccumV6Style";
    style.textContent = "#claimAccumBody .claim-accum-card-grid{display:flex;gap:12px;overflow-x:auto;padding:8px 2px 12px}#claimAccumBody .file-card{flex:0 0 185px}#claimAccumBody .file-card.aggregate-card{flex-basis:190px}.claim-accum-title-btn{border:0;background:transparent;color:#1f6fe5;font:900 24px 'Malgun Gothic','Segoe UI',Arial,sans-serif;cursor:pointer}.claim-accum-controls{display:flex;gap:8px;align-items:center}.claim-accum-header{display:flex;align-items:center;gap:12px;margin:8px 0 14px}";
    document.head.appendChild(style);
  }
  function renderClaimAccumCardsV6() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var panel = document.getElementById("defectCloseDashboardBody");
    if (!panel) return;
    ensureClaimAccumCss();
    var select = document.getElementById("claimAccumYearSelect");
    var selectedYear = Number(select && select.value) || window.__claimAccumSelectedYearV6 || new Date().getFullYear();
    window.__claimAccumSelectedYearV6 = selectedYear;
    var entries = claimCostEntries(selectedYear);
    var totalCount = entries.reduce(function (sum, entry) { return sum + cardCount(entry); }, 0);
    var totalAmount = entries.reduce(function (sum, entry) { return sum + cardAmount(entry); }, 0);
    var totalExcluded = entries.reduce(function (sum, entry) { return sum + Number(entry.excluded || 0); }, 0);
    var yearOptions = [2025, 2026, 2027].map(function (year) { return '<option value="' + year + '"' + (year === selectedYear ? ' selected' : '') + '>' + year + '\uB144</option>'; }).join("");
    function card(entry) {
      var id = jsQuote(entry.id);
      var count = cardCount(entry);
      return '<article class="file-card"><div class="topline"><span class="name">' + h(cardTitle(entry, selectedYear)) + '</span><div class="card-actions"><input type="checkbox" ' + (entry.selected ? 'checked' : '') + ' onclick="event.stopPropagation();toggleUpload(\'' + id + '\', this.checked)" /><button class="delete-btn" type="button" onclick="event.stopPropagation();deleteUpload(\'' + id + '\')">' + KO.deleteText + '</button></div></div><div class="meta">' + KO.qualityCost + '</div><div class="count">' + fmt(count) + KO.caseUnit + '</div><div class="meta">' + h(entry.sourceSheet || entry.label || "") + '</div><div class="amount-line">' + money(cardAmount(entry)) + '</div><div class="exclude-row" onclick="event.stopPropagation();"><span>' + KO.penaltyExcluded + '</span><input type="number" min="0" max="' + count + '" value="' + Number(entry.excluded || 0) + '" onchange="setExcluded(\'' + id + '\', this.value);setTimeout(window.renderClaimAccumCardsV6,180)" /><span>' + KO.caseUnit + '</span></div></article>';
    }
    panel.innerHTML = '<section class="sheet-section"><div class="claim-accum-header"><button id="claimAccumToggle" class="claim-accum-title-btn" type="button" aria-expanded="false">&gt; ' + KO.claimAccum + '</button><div class="claim-accum-controls"><label>' + KO.year + ' <select id="claimAccumYearSelect">' + yearOptions + '</select></label><button type="button" onclick="selectCheckedOnly()">' + KO.selectedSum + '</button><button type="button" onclick="clearSelection()">' + KO.unselectMonth + '</button></div></div><div id="claimAccumBody" class="dashboard-group-body is-hidden"><div class="claim-accum-card-grid"><article class="file-card aggregate-card active"><div class="topline"><span class="name">' + KO.total + '</span></div><div class="meta">' + shortYear(selectedYear) + KO.deadlineData + '</div><div class="count">' + fmt(totalCount) + KO.caseUnit + '</div><div class="amount-line">' + money(totalAmount) + '</div><div class="meta">' + KO.penaltyExcluded + ' ' + fmt(totalExcluded) + KO.caseUnit + '</div></article>' + entries.map(card).join("") + '</div></div></section>';
    var yearSelect = document.getElementById("claimAccumYearSelect");
    if (yearSelect) yearSelect.addEventListener("change", function () { window.__claimAccumSelectedYearV6 = Number(yearSelect.value) || selectedYear; setTimeout(renderClaimAccumCardsV6, 80); });
    var toggle = document.getElementById("claimAccumToggle");
    var body = document.getElementById("claimAccumBody");
    if (toggle && body) toggle.addEventListener("click", function () {
      var collapsed = body.classList.toggle("is-hidden");
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.innerHTML = (collapsed ? "&gt; " : "\u2228 ") + KO.claimAccum;
    });
  }
  window.renderClaimAccumCardsV6 = renderClaimAccumCardsV6;

  document.addEventListener("change", function (event) {
    var id = event.target && event.target.id;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(id) >= 0) scheduleDailyV6();
    if (["weeklyYearSelect", "weeklyMonthSelect"].indexOf(id) >= 0) scheduleWeeklyV6();
    if (id === "claimAccumYearSelect") setTimeout(renderClaimAccumCardsV6, 220);
  }, true);
  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="weekly"]')) scheduleWeeklyV6();
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="claimAccum"]')) { setTimeout(renderClaimAccumCardsV6, 260); setTimeout(renderClaimAccumCardsV6, 560); }
  }, true);
  var previousRenderAllV6 = typeof renderAll === "function" ? renderAll : null;
  if (previousRenderAllV6 && !window.__finalSelectionDataRouting20260702V6) {
    window.__finalSelectionDataRouting20260702V6 = true;
    renderAll = function (message) {
      previousRenderAllV6(message);
      scheduleDailyV6();
      if (document.querySelector('[data-dashboard-panel="weekly"].active, #weeklyDashboardPanel.active')) scheduleWeeklyV6();
      if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) { setTimeout(renderClaimAccumCardsV6, 260); setTimeout(renderClaimAccumCardsV6, 560); }
    };
  }
  function boot() {
    scheduleDailyV6();
    if (document.querySelector('[data-dashboard-panel="weekly"].active, #weeklyDashboardPanel.active')) scheduleWeeklyV6();
    if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) { setTimeout(renderClaimAccumCardsV6, 260); setTimeout(renderClaimAccumCardsV6, 560); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else setTimeout(boot, 0);
})();
// final-stable-routing-20260702-v7
(function () {
  var PENALTY = typeof penaltyPerClaim === "number" ? penaltyPerClaim : 60000;
  var TXT = {
    dailyCount: "\uC811\uC218\uAC74\uC218",
    loss: "\uC190\uC2E4\uAE08\uC561",
    mainItem: "\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9",
    caseUnit: "\uAC74",
    won: "\uC6D0",
    selectedWeek: "\uC120\uD0DD \uC8FC\uCC28 \uC790\uB8CC \uAE30\uC900",
    amountBase: "\uC811\uC218\uB0B4\uC5ED \uAE08\uC561 \uAE30\uC900",
    itemTop: "\uC2DC\uACF5\uBBF8\uACB0 \uD488\uBAA9 TOP 5",
    noWeekly: "4. \uC6D4\uAC04\uD604\uD669 \uC790\uB8CC\uB97C \uB123\uC73C\uBA74 \uC8FC\uD558\uC790\uD604\uD669\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
    claimAccum: "\uD074\uB808\uC784\uB204\uC801\uC790\uB8CC",
    year: "\uB144\uB3C4",
    selectedSum: "\uC120\uD0DD\uC6D4 \uD569\uACC4 \uBCF4\uAE30",
    unselectMonth: "\uC6D4 \uC120\uD0DD \uD574\uC81C",
    total: "\uC885\uD569",
    deleteText: "\uC0AD\uC81C",
    qualityCost: "\uD488\uC9C8 \uBE44\uC6A9",
    penaltyExcluded: "\uD328\uB110\uD2F0 \uC81C\uC678",
    deadlineData: "\uB144 \uB9C8\uAC10\uC790\uB8CC",
    month: "\uC6D4"
  };
  function id(name) { return document.getElementById(name); }
  function toNum(value, fallback) { var n = Number(value); return Number.isFinite(n) && n > 0 ? n : (fallback || 0); }
  function clean(value) { return String(value == null ? "" : value).trim(); }
  function html(value) { return typeof escapeHtml === "function" ? escapeHtml(value) : clean(value).replace(/[&<>\"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; }); }
  function fmt(value) { return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR"); }
  function money(value) { return "\u20A9 " + fmt(value || 0); }
  function rr(row) { return row && row.__raw ? row.__raw : (row && row.row && row.row.__raw ? row.row.__raw : row); }
  function cellList(row) { return (rr(row) && rr(row).__cells) || (row && row.__cells) || []; }
  function cell(row, index) { var list = cellList(row); return clean(list[index]); }
  function pickSafe(row, keys) { try { return typeof pick === "function" ? pick(rr(row), keys) : ""; } catch (err) { return ""; } }
  function dateKeySafe(date) { return typeof dateKey === "function" ? dateKey(date) : [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-"); }
  function parseDateSafe(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    var text = clean(value);
    var m = text.match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return null;
  }
  function rowDate(row) {
    var raw = rr(row);
    if (typeof robustReceiptDate === "function") {
      try { var d = robustReceiptDate(raw); if (d) return d; } catch (err) {}
    }
    if (typeof findReceiptDate === "function") {
      try { var f = findReceiptDate(raw); if (f) return f; } catch (err2) {}
    }
    return parseDateSafe(pickSafe(raw, ["\uC811\uC218\uC77C\uC790", "\uC77C\uC790", "date"])) || parseDateSafe(cell(raw, 0));
  }
  function countableReceipt(row) {
    var raw = rr(row);
    if (typeof isCountableReceiptRow === "function") {
      try { return isCountableReceiptRow(raw); } catch (err) {}
    }
    var d = rowDate(raw);
    var receipt = clean(pickSafe(raw, ["\uC811\uC218\uBC88\uD638", "\uBC88\uD638", "receiptNo"])) || cell(raw, 3) || cell(raw, 1);
    return !!d && !!receipt && !/^\d?$/.test(receipt.replace(/\s/g, ""));
  }
  function historyEntries() { return (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; }); }
  function summaryEntries() { return (state.uploads || []).filter(function (entry) { return entry.kind === "summary"; }); }
  function receiptItems(entries) {
    var out = [];
    if (typeof collectDatedReceiptRows === "function") {
      try { out = collectDatedReceiptRows(entries || []); } catch (err) { out = []; }
    }
    if (!out.length) {
      (entries || []).forEach(function (entry) {
        (entry.rows || []).forEach(function (row, index) {
          var d = rowDate(row);
          if (d && countableReceipt(row)) out.push({ entry: entry, row: rr(row), date: d, index: index });
        });
      });
    }
    return out.map(function (item) {
      var d = item.date || rowDate(item.row);
      return { entry: item.entry, row: rr(item.row), date: d, index: item.index };
    }).filter(function (item) { return item.date && countableReceipt(item.row); });
  }
  function allHistoryItems() {
    var rows = receiptItems(historyEntries());
    if (!rows.length) rows = receiptItems(summaryEntries());
    return rows;
  }
  function dailySelectionV7() {
    var now = new Date();
    return { year: toNum(id("dailyYearSelect") && id("dailyYearSelect").value, now.getFullYear()), month: toNum(id("dailyMonthSelect") && id("dailyMonthSelect").value, now.getMonth() + 1), week: toNum(id("dailyWeekSelect") && id("dailyWeekSelect").value, 1) };
  }
  function ensureDailyWeekOptionsV7() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var weekSelect = id("dailyWeekSelect");
    if (!weekSelect) return;
    var current = toNum(weekSelect.value, 1);
    var opts = [1, 2, 3, 4, 5].map(function (week) { return '<option value="' + week + '"' + (week === current ? ' selected' : '') + '>' + week + '\uC8FC</option>'; }).join("");
    if (weekSelect.innerHTML !== opts) weekSelect.innerHTML = opts;
  }
  function weekDatesV7(year, month, week) {
    if (typeof claimSummaryWeekGroups === "function") {
      var groups = claimSummaryWeekGroups(year, month) || [];
      return groups[Math.max(0, week - 1)] || [];
    }
    var days = [];
    var last = new Date(year, month, 0).getDate();
    for (var day = 1; day <= last; day += 1) {
      var d = new Date(year, month - 1, day);
      if (d.getDay() !== 0 && d.getDay() !== 6) days.push(d);
    }
    return days.slice((week - 1) * 5, week * 5);
  }
  function selectedEndDate(sel) {
    var days = weekDatesV7(sel.year, sel.month, sel.week);
    return days.length ? days[days.length - 1] : new Date(sel.year, sel.month - 1, 1);
  }
  function itemsBeforeSelectedMonth(sel) {
    return allHistoryItems().filter(function (item) { return item.date.getFullYear() === sel.year && item.date.getMonth() + 1 < sel.month; });
  }
  function itemsThroughSelectedWeek(sel) {
    var end = dateKeySafe(selectedEndDate(sel));
    return allHistoryItems().filter(function (item) { return item.date.getFullYear() === sel.year && item.date.getMonth() + 1 === sel.month && dateKeySafe(item.date) <= end; });
  }
  function itemsForSelectedWeek(sel) {
    var set = new Set(weekDatesV7(sel.year, sel.month, sel.week).map(dateKeySafe));
    return allHistoryItems().filter(function (item) { return item.date.getFullYear() === sel.year && item.date.getMonth() + 1 === sel.month && set.has(dateKeySafe(item.date)); });
  }
  function entryFromItems(kind, items, label) {
    return { kind: kind, label: label || kind, fileName: label || kind, rows: (items || []).map(function (item) { return rr(item.row || item); }), selected: true, excluded: 0 };
  }
  function categoryFor(row) {
    try { if (typeof receiptClaimCategory === "function") return receiptClaimCategory(rr(row)); } catch (err) {}
    var pending = clean(pickSafe(row, ["\uBBF8\uACB0\uAD6C\uBD84", "\uC2DC\uACF5\uBBF8\uACB0"])) || cell(row, 13);
    if (pending === "0") return "\uC2DC\uACF5\uBBF8\uACB0";
    var type = clean(pickSafe(row, ["\uC720\uD615", "type"])) || cell(row, 11);
    if (/\uAC10\uC131|\uCDE8\uAE09/.test(type)) return "\uAC10\uC131/\uCDE8\uAE09";
    return "\uACE0\uAC1D\uBD88\uB9CC";
  }
  function targetWrap(category, value, kind) {
    if (typeof fixedSummaryTargets === "function" && typeof targetCell === "function") {
      var targets = fixedSummaryTargets(category);
      if (targets && kind === "total") return targetCell(value, targets.total, true);
      if (targets && kind === "avg") return targetCell(value, targets.avg, true);
    }
    return value;
  }
  function patchPriorMonthsV7(rows, items, meta) {
    if (!rows || !rows.length || !meta) return;
    var byCat = new Map(rows.map(function (row) { return [row.category, row]; }));
    var counts = {};
    items.forEach(function (item) {
      var m = item.date.getMonth() + 1;
      if (m >= meta.currentMonth) return;
      var cat = categoryFor(item.row);
      counts[cat] = counts[cat] || {};
      counts[cat][m] = (counts[cat][m] || 0) + 1;
    });
    ["\uC2DC\uACF5\uBBF8\uACB0", "\uACE0\uAC1D\uBD88\uB9CC", "\uAC10\uC131/\uCDE8\uAE09"].forEach(function (cat) {
      var row = byCat.get(cat);
      if (!row) return;
      for (var m = 1; m < meta.currentMonth; m += 1) {
        if (counts[cat] && counts[cat][m] != null) row["m" + m] = counts[cat][m];
      }
    });
    var totalRow = byCat.get("\uACC4");
    if (totalRow) {
      for (var month = 1; month < meta.currentMonth; month += 1) {
        var sum = ["\uC2DC\uACF5\uBBF8\uACB0", "\uACE0\uAC1D\uBD88\uB9CC", "\uAC10\uC131/\uCDE8\uAE09"].reduce(function (acc, cat) { return acc + ((counts[cat] && counts[cat][month]) || 0); }, 0);
        totalRow["m" + month] = sum;
      }
    }
    rows.forEach(function (row) {
      if (row.category === "PPM") return;
      var total = 0;
      var active = 0;
      for (var m2 = 1; m2 <= 12; m2 += 1) {
        var key = m2 === meta.currentMonth ? meta.monthTotalKey : "m" + m2;
        var split = typeof splitSummaryValue === "function" ? splitSummaryValue(row[key]) : { main: Number(row[key] || 0), hasValue: Number(row[key] || 0) > 0 };
        total += Number(split.main || 0);
        if (Number(split.main || 0) > 0) active += 1;
      }
      row.total = targetWrap(row.category, total, "total");
      row.avg = targetWrap(row.category, active ? Math.round(total / active) : 0, "avg");
    });
  }
  function amountFromReceipt(row) {
    var direct = Number(pickSafe(row, ["\uAE08\uC561", "\uC2E4\uD328\uBE44\uC6A9", "amount"]).toString().replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(direct) && direct > 0) return direct;
    var list = cellList(row);
    for (var i = list.length - 1; i >= 0; i -= 1) {
      var n = Number(clean(list[i]).replace(/[^0-9.-]/g, ""));
      if (Number.isFinite(n) && n > 0) return n;
    }
    return 0;
  }
  function codeFromReceipt(row) { return clean(pickSafe(row, ["\uBD80\uD488\uCF54\uB4DC", "\uC81C\uD488\uCF54\uB4DC", "code"])) || cell(row, 5) || cell(row, 3); }
  function colorFromReceipt(row) { return clean(pickSafe(row, ["\uC0C9\uC0C1", "color"])) || cell(row, 6); }
  function pendingReceipt(row) { return categoryFor(row) === "\uC2DC\uACF5\uBBF8\uACB0"; }
  function topDailyItems(items) {
    var source = items.filter(function (item) { return pendingReceipt(item.row); });
    if (!source.length) source = items.slice().sort(function (a, b) { return amountFromReceipt(b.row) - amountFromReceipt(a.row); }).slice(0, 1);
    var map = new Map();
    source.forEach(function (item) {
      var code = codeFromReceipt(item.row);
      if (!code) return;
      var color = colorFromReceipt(item.row);
      var key = code + (color ? " / " + color : "");
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(function (pair) { return { label: pair[0], count: pair[1] }; }).sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); }).slice(0, 5);
  }
  function renderDailyCardsV7(items) {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var box = id("dailyReceiptCards");
    if (!box) return;
    var amount = (items || []).reduce(function (sum, item) { return sum + amountFromReceipt(item.row); }, 0);
    var top = topDailyItems(items || []);
    var first = top[0] || { label: "-", count: 0 };
    box.innerHTML = '<article class="daily-receipt-card"><span>' + TXT.dailyCount + '</span><strong>' + fmt((items || []).length) + '</strong><em>' + TXT.caseUnit + '</em><small>' + TXT.selectedWeek + '</small></article>' +
      '<article class="daily-receipt-card"><span>' + TXT.loss + '</span><strong>' + fmt(amount) + '</strong><em>' + TXT.won + '</em><small>' + TXT.amountBase + '</small></article>' +
      '<article class="daily-receipt-card"><span>' + TXT.mainItem + '</span><strong class="purple">' + html(first.label) + '</strong><em>' + fmt(first.count) + TXT.caseUnit + '</em><small>' + TXT.itemTop + '</small><div class="daily-receipt-tags">' + top.map(function (item) { return '<span>' + html(item.label) + ' ' + fmt(item.count) + TXT.caseUnit + '</span>'; }).join("") + '</div></article>';
  }
  function refreshDailyV7() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    ensureDailyWeekOptionsV7();
    var sel = dailySelectionV7();
    var before = itemsBeforeSelectedMonth(sel);
    var current = itemsThroughSelectedWeek(sel);
    var weekItems = itemsForSelectedWeek(sel);
    if (typeof deriveClaimSummaryForView === "function") {
      var end = selectedEndDate(sel);
      var previousBuild = typeof buildClaimSummaryMeta === "function" ? buildClaimSummaryMeta : null;
      try {
        if (previousBuild) buildClaimSummaryMeta = function () { return previousBuild(end); };
        state.summary = deriveClaimSummaryForView([entryFromItems("receiptHistory", before, "history-v7")], [entryFromItems("summary", current, "current-v7")]);
        state.summaryMeta = previousBuild ? previousBuild(end) : state.summaryMeta;
        patchPriorMonthsV7(state.summary, before.concat(current), state.summaryMeta);
      } catch (err) {}
      finally { if (previousBuild) buildClaimSummaryMeta = previousBuild; }
    }
    if (typeof deriveDetailsFromReceiptEntries === "function") {
      try { state.details = deriveDetailsFromReceiptEntries([entryFromItems("summary", weekItems, "detail-v7")]); } catch (err2) {}
    }
    if (typeof renderSummary === "function") renderSummary();
    if (typeof renderDetails === "function") renderDetails();
    renderDailyCardsV7(weekItems);
  }
  function scheduleDailyV7() { setTimeout(refreshDailyV7, 60); setTimeout(refreshDailyV7, 220); }

  function shortYear(year) { return String(year).slice(-2); }
  function entryYearV7(entry) {
    if (typeof entryYear === "function") { try { var y = entryYear(entry); if (y) return shortYear(y); } catch (err) {} }
    var text = [entry && entry.groupTitle, entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.sourceUrl, entry && entry.groupKey].join(" ");
    var m = text.match(/20(\d{2})|(\d{2})\s*\uB144|existing-(\d{2})/);
    return m ? (m[1] || m[2] || m[3]) : "";
  }
  function entryMonthV7(entry) {
    if (typeof monthNumber === "function") { try { var m1 = monthNumber([entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" ")); if (m1 && m1 <= 12) return m1; } catch (err) {} }
    var text = [entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" ");
    var m = text.match(/(\d{1,2})\s*\uC6D4/);
    return m ? Number(m[1]) : 0;
  }
  function selectedWeeklyV7() {
    var now = new Date();
    return { year: toNum(id("weeklyYearSelect") && id("weeklyYearSelect").value, now.getFullYear()), month: toNum(id("weeklyMonthSelect") && id("weeklyMonthSelect").value, now.getMonth() + 1) };
  }
  function costEntriesForYear(year) { return (state.uploads || []).filter(function (entry) { return entry.kind === "cost" && entryYearV7(entry) === shortYear(year); }); }
  function selectedCostBundleV7() {
    var sel = selectedWeeklyV7();
    var all = costEntriesForYear(sel.year);
    var exact = all.filter(function (entry) { return entryMonthV7(entry) === sel.month; });
    if (exact.length) return { year: sel.year, month: sel.month, entries: exact, fallback: false };
    var months = Array.from(new Set(all.map(entryMonthV7).filter(Boolean))).sort(function (a, b) { return a - b; });
    var prior = months.filter(function (m) { return m <= sel.month; }).pop() || months[months.length - 1] || 0;
    return { year: sel.year, month: prior || sel.month, entries: all.filter(function (entry) { return entryMonthV7(entry) === prior; }), fallback: !!prior && prior !== sel.month };
  }
  function goodDeadlineMeta(meta) {
    if (!meta) return false;
    var item = clean(meta.item);
    if (!item || /^item|code$/i.test(item) || item === "\uC81C\uD488\uCF54\uB4DC" || item === "\uBD80\uD488\uCF54\uB4DC") return false;
    if (typeof isMonthlyDeadlineDataRow === "function") { try { if (!isMonthlyDeadlineDataRow(meta)) return false; } catch (err) {} }
    return true;
  }
  function weekFromMetaV7(meta, index) {
    var raw = rr(meta && meta.row);
    var fields = [meta && meta.week, meta && meta.deadlineWeek, raw && raw.deadlineWeek, raw && raw.week, raw && raw["Q"], raw && raw["\uB4F1\uB85D\uC77C"], raw && raw["\uC8FC\uCC28"], raw && raw["\uC8FC"], cell(raw, 16), cell(raw, 15), cell(raw, 17), cell(raw, 18)].map(clean);
    for (var i = 0; i < fields.length; i += 1) {
      var text = fields[i];
      var m = text.match(/([1-5])\s*\uC8FC|^([1-5])$/);
      if (m) return (m[1] || m[2]) + "\uC8FC";
    }
    var joined = fields.join(" ");
    var d = parseDateSafe(joined);
    if (d) {
      var groups = weekDatesV7(d.getFullYear(), d.getMonth() + 1, 1).length && (typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(d.getFullYear(), d.getMonth() + 1) : []);
      for (var g = 0; g < groups.length; g += 1) if (groups[g].some(function (day) { return dateKeySafe(day) === dateKeySafe(d); })) return (g + 1) + "\uC8FC";
    }
    return ((index % 5) + 1) + "\uC8FC";
  }
  var previousMonthlyStatusRowsV7 = typeof monthlyStatusRows === "function" ? monthlyStatusRows : null;
  monthlyStatusRows = function () {
    var bundle = selectedCostBundleV7();
    if (bundle.entries.length && typeof monthlyDeadlineRowMeta === "function") {
      return bundle.entries.flatMap(function (entry) {
        return (entry.rows || []).map(function (row, index) {
          var meta = monthlyDeadlineRowMeta(entry, row, index);
          meta.__entry = entry;
          meta.__index = index;
          meta.__effectiveYear = bundle.year;
          meta.__effectiveMonth = bundle.month;
          return { __deadlineMeta: meta };
        }).filter(function (row) { return goodDeadlineMeta(row.__deadlineMeta); });
      });
    }
    return previousMonthlyStatusRowsV7 ? previousMonthlyStatusRowsV7() : [];
  };
  var previousWeeklyDashboardMetasV7 = typeof weeklyDashboardMetas === "function" ? weeklyDashboardMetas : null;
  weeklyDashboardMetas = function (rows) {
    if ((rows || []).some(function (row) { return row && row.__deadlineMeta; })) {
      return (rows || []).map(function (row, index) {
        var meta = row.__deadlineMeta;
        var line = typeof lineFromDeadline === "function" ? lineFromDeadline(meta) : (typeof monthlyLineLabel === "function" ? monthlyLineLabel(meta) : clean(meta.cause) || "\uBBF8\uBD84\uB958");
        var baseAmount = Number(meta.amount || 0) - (meta.penaltyEligible === false ? PENALTY : 0);
        var cause = clean(meta.cause);
        return { row: meta.row, sourceMeta: meta, week: weekFromMetaV7(meta, index), receiptNo: clean(meta.receiptNo) || "deadline_" + index, amount: baseAmount, line: line, type: clean(meta.type) || "\uBBF8\uBD84\uB958", item: clean(meta.item) || "\uBBF8\uBD84\uB958", color: clean(meta.color), quantity: Number(meta.quantity || 1) || 1, cause: cause, excludedCause: typeof isExcludedWeeklyCause === "function" ? isExcludedWeeklyCause(cause) : /^(VN|\.)$/i.test(cause) };
      }).filter(function (meta) { return meta.week && meta.item && !meta.excludedCause; });
    }
    return previousWeeklyDashboardMetasV7 ? previousWeeklyDashboardMetasV7(rows) : [];
  };
  function renderWeeklyFallbackV7() {
    var holder = id("weeklyDefectContent");
    if (!holder) return;
    var rows = monthlyStatusRows();
    if (!rows.length) {
      holder.innerHTML = '<div class="weekly-empty">' + TXT.noWeekly + '</div>';
      return;
    }
    if (typeof renderWeeklyDefect === "function") renderWeeklyDefect();
  }
  function scheduleWeeklyV7() { setTimeout(renderWeeklyFallbackV7, 70); setTimeout(renderWeeklyFallbackV7, 260); }

  function cardCountV7(entry) { return typeof entryCount === "function" ? entryCount(entry) : (entry.rows || []).length; }
  function cardAmountV7(entry) { return typeof entryAmount === "function" ? entryAmount(entry) : Number(entry.defectAmount || 0) + Math.max(0, cardCountV7(entry) - Number(entry.excluded || 0)) * PENALTY; }
  function jsQuote(value) { return clean(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'"); }
  function ensureClaimAccumCssV7() {
    if (id("claimAccumV7Style")) return;
    var style = document.createElement("style");
    style.id = "claimAccumV7Style";
    style.textContent = ".claim-accum-card-grid{display:flex!important;gap:12px!important;overflow-x:auto!important;align-items:stretch!important}.claim-accum-card-grid .file-card{flex:0 0 185px!important;max-width:185px!important;min-height:150px}.claim-accum-card-grid .aggregate-card{flex-basis:190px!important}.claim-accum-title-btn{border:0;background:transparent;color:#1f6fe5;font:900 24px 'Malgun Gothic','Segoe UI',Arial,sans-serif;cursor:pointer}.claim-accum-header{display:flex;gap:12px;align-items:center;margin:8px 0 12px}.claim-accum-controls{display:flex;gap:8px;align-items:center}.is-hidden{display:none!important}";
    document.head.appendChild(style);
  }
  function renderClaimAccumV7() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var panel = id("defectCloseDashboardBody");
    if (!panel) return;
    ensureClaimAccumCssV7();
    var current = Number((id("claimAccumYearSelect") || {}).value) || window.__claimAccumYearV7 || new Date().getFullYear();
    window.__claimAccumYearV7 = current;
    var entries = costEntriesForYear(current).sort(function (a, b) { return entryMonthV7(a) - entryMonthV7(b); });
    var totalCount = entries.reduce(function (sum, entry) { return sum + cardCountV7(entry); }, 0);
    var totalAmount = entries.reduce(function (sum, entry) { return sum + cardAmountV7(entry); }, 0);
    var totalExcluded = entries.reduce(function (sum, entry) { return sum + Number(entry.excluded || 0); }, 0);
    var years = [2025, 2026, 2027].map(function (year) { return '<option value="' + year + '"' + (year === current ? ' selected' : '') + '>' + year + '\uB144</option>'; }).join("");
    var cards = entries.map(function (entry) {
      var count = cardCountV7(entry);
      var eid = jsQuote(entry.id);
      var title = (entryMonthV7(entry) || "") + TXT.month;
      return '<article class="file-card"><div class="topline"><span class="name">' + html(title) + '</span><div class="card-actions"><input type="checkbox" ' + (entry.selected ? 'checked' : '') + ' onclick="event.stopPropagation();toggleUpload(\'' + eid + '\', this.checked)" /><button class="delete-btn" type="button" onclick="event.stopPropagation();deleteUpload(\'' + eid + '\')">' + TXT.deleteText + '</button></div></div><div class="meta">' + TXT.qualityCost + '</div><div class="count">' + fmt(count) + TXT.caseUnit + '</div><div class="meta">' + html(entry.sourceSheet || entry.label || "") + '</div><div class="amount-line">' + money(cardAmountV7(entry)) + '</div><div class="exclude-row" onclick="event.stopPropagation();"><span>' + TXT.penaltyExcluded + '</span><input type="number" min="0" max="' + count + '" value="' + Number(entry.excluded || 0) + '" onchange="setExcluded(\'' + eid + '\', this.value);setTimeout(window.renderClaimAccumV7,180)" /><span>' + TXT.caseUnit + '</span></div></article>';
    }).join("");
    panel.innerHTML = '<section class="sheet-section"><div class="claim-accum-header"><button id="claimAccumToggle" class="claim-accum-title-btn" type="button" aria-expanded="false">&gt; ' + TXT.claimAccum + '</button><div class="claim-accum-controls"><label>' + TXT.year + ' <select id="claimAccumYearSelect">' + years + '</select></label><button type="button" onclick="selectCheckedOnly()">' + TXT.selectedSum + '</button><button type="button" onclick="clearSelection()">' + TXT.unselectMonth + '</button></div></div><div id="claimAccumBody" class="dashboard-group-body is-hidden"><div class="claim-accum-card-grid"><article class="file-card aggregate-card active"><div class="topline"><span class="name">' + TXT.total + '</span></div><div class="meta">' + shortYear(current) + TXT.deadlineData + '</div><div class="count">' + fmt(totalCount) + TXT.caseUnit + '</div><div class="amount-line">' + money(totalAmount) + '</div><div class="meta">' + TXT.penaltyExcluded + ' ' + fmt(totalExcluded) + TXT.caseUnit + '</div></article>' + cards + '</div></div></section>';
    var sel = id("claimAccumYearSelect");
    if (sel) sel.addEventListener("change", function () { window.__claimAccumYearV7 = Number(sel.value) || current; setTimeout(renderClaimAccumV7, 60); });
    var btn = id("claimAccumToggle");
    var body = id("claimAccumBody");
    if (btn && body) btn.addEventListener("click", function () { var collapsed = body.classList.toggle("is-hidden"); btn.setAttribute("aria-expanded", String(!collapsed)); btn.innerHTML = (collapsed ? "&gt; " : "\u2228 ") + TXT.claimAccum; });
  }
  window.renderClaimAccumV7 = renderClaimAccumV7;

  document.addEventListener("change", function (event) {
    var targetId = event.target && event.target.id;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(targetId) >= 0) scheduleDailyV7();
    if (["weeklyYearSelect", "weeklyMonthSelect"].indexOf(targetId) >= 0) scheduleWeeklyV7();
    if (targetId === "claimAccumYearSelect") setTimeout(renderClaimAccumV7, 160);
  }, true);
  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="daily"]')) scheduleDailyV7();
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="weekly"]')) scheduleWeeklyV7();
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="claimAccum"]')) { setTimeout(renderClaimAccumV7, 180); setTimeout(renderClaimAccumV7, 420); }
  }, true);
  var previousRenderAllV7 = typeof renderAll === "function" ? renderAll : null;
  if (previousRenderAllV7 && !window.__finalStableRouting20260702V7) {
    window.__finalStableRouting20260702V7 = true;
    renderAll = function (message) {
      previousRenderAllV7(message);
      scheduleDailyV7();
      if (document.querySelector('[data-dashboard-panel="weekly"].active, #weeklyDashboardPanel.active')) scheduleWeeklyV7();
      if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) { setTimeout(renderClaimAccumV7, 180); setTimeout(renderClaimAccumV7, 420); }
    };
  }
  function bootV7() {
    ensureDailyWeekOptionsV7();
    scheduleDailyV7();
    if (document.querySelector('[data-dashboard-panel="weekly"].active, #weeklyDashboardPanel.active')) scheduleWeeklyV7();
    if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) { setTimeout(renderClaimAccumV7, 180); setTimeout(renderClaimAccumV7, 420); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootV7);
  else setTimeout(bootV7, 0);
})();
// final-stable-routing-20260702-v7b
(function () {
  var prevMonthlyStatusRowsV7b = typeof monthlyStatusRows === "function" ? monthlyStatusRows : null;
  if (prevMonthlyStatusRowsV7b && !window.__finalStableRouting20260702V7bRows) {
    window.__finalStableRouting20260702V7bRows = true;
    monthlyStatusRows = function () {
      var rows = prevMonthlyStatusRowsV7b() || [];
      rows.forEach(function (row) {
        var meta = row && row.__deadlineMeta;
        if (!meta) return;
        var month = Number(meta.__effectiveMonth || meta.month || 0);
        var year = Number(meta.__effectiveYear || 0);
        if (month) row.__sheetTitle = month + "\uC6D4";
        if (year && month) row.__documentTitle = year + "\uB144 " + month + "\uC6D4";
      });
      return rows;
    };
  }
  var prevMonthlyStatusMonthV7b = typeof monthlyStatusMonth === "function" ? monthlyStatusMonth : null;
  if (prevMonthlyStatusMonthV7b && !window.__finalStableRouting20260702V7bMonth) {
    window.__finalStableRouting20260702V7bMonth = true;
    monthlyStatusMonth = function (rows) {
      var metaRow = (rows || []).find(function (row) { return row && row.__deadlineMeta && Number(row.__deadlineMeta.__effectiveMonth); });
      if (metaRow) return Number(metaRow.__deadlineMeta.__effectiveMonth);
      return prevMonthlyStatusMonthV7b(rows);
    };
  }
})();
// final-daily-claim-accum-fix-20260702-v8
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  var PENALTY = typeof penaltyPerClaim === "number" ? penaltyPerClaim : 60000;
  var K = {
    pending: "\uC2DC\uACF5\uBBF8\uACB0",
    complaint: "\uACE0\uAC1D\uBD88\uB9CC",
    sens: "\uAC10\uC131/\uCDE8\uAE09",
    sum: "\uACC4",
    ppm: "PPM",
    claimAccum: "\uD074\uB808\uC784\uB204\uC801\uC790\uB8CC",
    year: "\uB144\uB3C4",
    selectedSum: "\uC120\uD0DD\uC6D4 \uD569\uACC4 \uBCF4\uAE30",
    unselectMonth: "\uC6D4 \uC120\uD0DD \uD574\uC81C",
    total: "\uC885\uD569",
    qualityCost: "\uD488\uC9C8 \uBE44\uC6A9",
    penaltyExcluded: "\uD328\uB110\uD2F0 \uC81C\uC678",
    caseUnit: "\uAC74",
    month: "\uC6D4",
    deleteText: "\uC0AD\uC81C",
    linkOpen: "\uB9C1\uD06C \uC5F4\uAE30"
  };
  function el(id) { return document.getElementById(id); }
  function clean(value) { return String(value == null ? "" : value).trim(); }
  function num(value, fallback) { var n = Number(value); return Number.isFinite(n) && n > 0 ? n : (fallback || 0); }
  function html(value) { return typeof escapeHtml === "function" ? escapeHtml(value) : clean(value).replace(/[&<>\"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; }); }
  function fmt(value) { return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR"); }
  function money(value) { return "\u20A9 " + fmt(value || 0); }
  function raw(row) { return row && row.__raw ? row.__raw : row; }
  function cells(row) { return (raw(row) && raw(row).__cells) || row.__cells || []; }
  function c(row, index) { return clean(cells(row)[index]); }
  function pickSafe(row, keys) { try { return typeof pick === "function" ? pick(raw(row), keys) : ""; } catch (err) { return ""; } }
  function numericSafe(value) { if (typeof numeric === "function") return numeric(value); var n = Number(clean(value).replace(/[^0-9.-]/g, "")); return Number.isFinite(n) ? n : 0; }
  function parseDateA(row) {
    var v = c(row, 0) || pickSafe(row, ["\uC811\uC218\uC77C\uC790", "\uC77C\uC790", "date"]);
    if (v instanceof Date && !Number.isNaN(v.getTime())) return v;
    if (typeof parseDateFromText === "function") { var p = parseDateFromText(v); if (p) return p; }
    var m = clean(v).match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function stamp(date) { return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate(); }
  function receiptNo(row) { return clean(c(row, 3) || pickSafe(row, ["\uC811\uC218\uBC88\uD638", "receiptNo"])); }
  function validReceipt(row) {
    var d = parseDateA(row);
    var r = receiptNo(row);
    if (!d || !r) return false;
    if (/^(\uC811\uC218\uBC88\uD638|NO|No)$/i.test(r)) return false;
    return true;
  }
  function dailySourceEntries() {
    var history = (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; });
    if (history.length) return history;
    return (state.uploads || []).filter(function (entry) { return entry.kind === "summary"; });
  }
  function allReceiptRowsV8() {
    var rows = [];
    dailySourceEntries().forEach(function (entry) {
      (entry.rows || []).forEach(function (row, index) {
        var rr = raw(row);
        var d = parseDateA(rr);
        if (d && validReceipt(rr)) rows.push({ entry: entry, row: rr, date: d, index: index });
      });
    });
    return rows;
  }
  function dailySelectionV8() {
    var now = new Date();
    return { year: num(el("dailyYearSelect") && el("dailyYearSelect").value, now.getFullYear()), month: num(el("dailyMonthSelect") && el("dailyMonthSelect").value, now.getMonth() + 1), week: num(el("dailyWeekSelect") && el("dailyWeekSelect").value, 1) };
  }
  function ensureDailyOptionsV8() {
    var month = el("dailyMonthSelect");
    if (month && month.options.length < 12) {
      var mv = num(month.value, new Date().getMonth() + 1);
      month.innerHTML = Array.from({ length: 12 }, function (_, i) { var m = i + 1; return '<option value="' + m + '"' + (m === mv ? ' selected' : '') + '>' + m + '\uC6D4</option>'; }).join("");
    }
    var week = el("dailyWeekSelect");
    if (week) {
      var wv = num(week.value, 1);
      week.innerHTML = [1, 2, 3, 4, 5].map(function (w) { return '<option value="' + w + '"' + (w === wv ? ' selected' : '') + '>' + w + '\uC8FC</option>'; }).join("");
    }
  }
  function weekGroupsV8(year, month) {
    if (typeof claimSummaryWeekGroups === "function") return claimSummaryWeekGroups(year, month) || [];
    var days = [];
    var last = new Date(year, month, 0).getDate();
    for (var d = 1; d <= last; d += 1) {
      var date = new Date(year, month - 1, d);
      if (date.getDay() !== 0 && date.getDay() !== 6) days.push(date);
    }
    return [days.slice(0, 5), days.slice(5, 10), days.slice(10, 15), days.slice(15, 22), days.slice(22)].filter(function (g) { return g.length; });
  }
  function endDateForSelection(sel) {
    var group = weekGroupsV8(sel.year, sel.month)[Math.max(0, sel.week - 1)] || [];
    return group.length ? group[group.length - 1] : new Date(sel.year, sel.month - 1, 1);
  }
  function catFromCols(row) {
    var pending = clean(c(row, 13) || pickSafe(row, ["\uBBF8\uACB0\uAD6C\uBD84", "\uC2DC\uACF5\uBBF8\uACB0"]));
    if (pending === "0") return K.pending;
    var type = clean(c(row, 11) || pickSafe(row, ["\uC720\uD615", "type"]));
    if (/\uAC10\uC131|\uCDE8\uAE09/.test(type)) return K.sens;
    return K.complaint;
  }
  function amountR(row) { return numericSafe(c(row, 17) || pickSafe(row, ["\uD569\uACC4", "\uAE08\uC561", "amount"])); }
  function codeOf(row) { return clean(c(row, 5) || pickSafe(row, ["\uBD80\uD488\uCF54\uB4DC", "\uC81C\uD488\uCF54\uB4DC", "code"])); }
  function colorOf(row) { return clean(c(row, 6) || pickSafe(row, ["\uC0C9\uC0C1", "color"])); }
  function cellText(main, target, showMain) {
    if (target == null) return main || 0;
    if (showMain) return String(main || 0) + "(" + target + ")";
    return "(" + target + ")";
  }
  function makeSummaryRowsV8(sel) {
    var end = endDateForSelection(sel);
    var meta = typeof buildClaimSummaryMeta === "function" ? buildClaimSummaryMeta(end) : null;
    if (!meta) return null;
    state.summaryMeta = meta;
    var previous = state.summary || [];
    function prevAt(index, field, fallback) { return previous[index] && previous[index][field] != null ? previous[index][field] : fallback; }
    var cats = [K.pending, K.complaint, K.sens];
    var rows = cats.map(function (cat, index) {
      var row = { category: cat, prevTotal: prevAt(index, "prevTotal", 0), prevAvg: prevAt(index, "prevAvg", 0) };
      (typeof summaryDynamicKeys === "function" ? summaryDynamicKeys(meta) : []).forEach(function (key) { if (!(key in row)) row[key] = 0; });
      row.prevTotal = prevAt(index, "prevTotal", row.prevTotal);
      row.prevAvg = prevAt(index, "prevAvg", row.prevAvg);
      return row;
    });
    var byCat = new Map(rows.map(function (row) { return [row.category, row]; }));
    var all = allReceiptRowsV8().filter(function (item) { return item.date.getFullYear() === sel.year; });
    var selectedMonthEnd = stamp(end);
    all.forEach(function (item) {
      var m = item.date.getMonth() + 1;
      var cat = catFromCols(item.row);
      var row = byCat.get(cat);
      if (!row) return;
      if (m < meta.currentMonth) row["m" + m] = (Number(row["m" + m]) || 0) + 1;
      if (m === meta.currentMonth && stamp(item.date) <= selectedMonthEnd) {
        var weekIndex = meta.preWeeks.findIndex(function (week) { return (week.dates || []).some(function (d) { return stamp(d) === stamp(item.date); }); });
        if (weekIndex >= 0) row[meta.preWeeks[weekIndex].key] = (Number(row[meta.preWeeks[weekIndex].key]) || 0) + 1;
        var day = meta.dayColumns.find(function (col) { return stamp(col.date) === stamp(item.date); });
        if (day) row[day.key] = (Number((String(row[day.key]).match(/^-?\d+/) || [0])[0]) || 0) + 1;
        row[meta.monthTotalKey] = (Number((String(row[meta.monthTotalKey]).match(/^-?\d+/) || [0])[0]) || 0) + 1;
      }
    });
    rows.forEach(function (row) {
      var targets = row.category === K.complaint ? { daily: 3, month: 50, future: 50, total: 600, avg: 50 } : { daily: 0, month: 0, future: 0, total: 0, avg: 0 };
      meta.dayColumns.forEach(function (col) { var main = Number(row[col.key] || 0); row[col.key] = cellText(main, targets.daily, stamp(col.date) <= selectedMonthEnd || main > 0); });
      row[meta.monthTotalKey] = cellText(Number(row[meta.monthTotalKey] || 0), targets.month, true);
      meta.postMonths.forEach(function (month) { row["m" + month] = cellText(0, targets.future, false); });
      var total = 0;
      var active = 0;
      for (var m = 1; m <= 12; m += 1) {
        var key = m === meta.currentMonth ? meta.monthTotalKey : "m" + m;
        var main = Number((String(row[key]).match(/^-?\d+/) || [row[key] || 0])[0]) || 0;
        total += main;
        if (main > 0) active += 1;
      }
      row.total = cellText(total, targets.total, true);
      row.avg = cellText(active ? Math.round(total / active) : 0, targets.avg, true);
    });
    var sum = { category: K.sum, prevTotal: rows.reduce(function (s, r) { return s + Number(r.prevTotal || 0); }, 0), prevAvg: rows.reduce(function (s, r) { return s + Number(r.prevAvg || 0); }, 0) };
    (typeof summaryDynamicKeys === "function" ? summaryDynamicKeys(meta) : []).forEach(function (key) {
      if (key === "prevTotal" || key === "prevAvg") return;
      var main = rows.reduce(function (s, row) { return s + (Number((String(row[key]).match(/^-?\d+/) || [row[key] || 0])[0]) || 0); }, 0);
      if (meta.dayColumns.some(function (col) { return col.key === key; })) sum[key] = cellText(main, 3, true);
      else if (key === meta.monthTotalKey) sum[key] = cellText(main, 50, true);
      else if (/^m\d+/.test(key) && meta.postMonths.some(function (m) { return key === "m" + m; })) sum[key] = cellText(0, 50, false);
      else sum[key] = main;
    });
    var totalMain = 0;
    var activeMonths = 0;
    for (var sm = 1; sm <= 12; sm += 1) {
      var sk = sm === meta.currentMonth ? meta.monthTotalKey : "m" + sm;
      var sv = Number((String(sum[sk]).match(/^-?\d+/) || [sum[sk] || 0])[0]) || 0;
      totalMain += sv;
      if (sv > 0) activeMonths += 1;
    }
    sum.total = cellText(totalMain, 600, true);
    sum.avg = cellText(activeMonths ? Math.round(totalMain / activeMonths) : 0, 50, true);
    var ppm = previous.find(function (row) { return row.category === K.ppm; }) || { category: K.ppm, prevTotal: 1011, prevAvg: "", m1: 865, m2: 955, m3: 1139, m4: 1325, m5: 964, m6: 903, m6Total: 903, avg: 1037 };
    return rows.concat([sum, ppm]);
  }
  function selectedWeekItemsV8(sel) {
    var group = weekGroupsV8(sel.year, sel.month)[Math.max(0, sel.week - 1)] || [];
    var days = new Set(group.map(stamp));
    return allReceiptRowsV8().filter(function (item) { return item.date.getFullYear() === sel.year && item.date.getMonth() + 1 === sel.month && days.has(stamp(item.date)); });
  }
  function refreshDailyV8() {
    ensureDailyOptionsV8();
    var sel = dailySelectionV8();
    var rows = makeSummaryRowsV8(sel);
    if (rows) state.summary = rows;
    var weekItems = selectedWeekItemsV8(sel);
    if (typeof deriveDetailsFromReceiptEntries === "function") {
      try { state.details = deriveDetailsFromReceiptEntries([{ kind: "summary", label: "daily-v8", rows: weekItems.map(function (item) { return item.row; }), selected: true, excluded: 0 }]); } catch (err) {}
    }
    if (typeof renderSummary === "function") renderSummary();
    if (typeof renderDetails === "function") renderDetails();
    renderDailyCardsV8(weekItems);
  }
  function renderDailyCardsV8(items) {
    var box = el("dailyReceiptCards");
    if (!box) return;
    var amount = items.reduce(function (s, item) { return s + amountR(item.row); }, 0);
    var pending = items.filter(function (item) { return catFromCols(item.row) === K.pending; });
    var src = pending.length ? pending : items.slice().sort(function (a, b) { return amountR(b.row) - amountR(a.row); }).slice(0, 1);
    var map = new Map();
    src.forEach(function (item) { var code = codeOf(item.row); if (!code) return; var key = code + (colorOf(item.row) ? " / " + colorOf(item.row) : ""); map.set(key, (map.get(key) || 0) + 1); });
    var top = Array.from(map.entries()).map(function (p) { return { label: p[0], count: p[1] }; }).sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); }).slice(0, 5);
    var first = top[0] || { label: "-", count: 0 };
    box.innerHTML = '<article class="daily-receipt-card"><span>\uC811\uC218\uAC74\uC218</span><strong>' + fmt(items.length) + '</strong><em>\uAC74</em><small>\uC120\uD0DD \uC8FC\uCC28 \uC790\uB8CC \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC190\uC2E4\uAE08\uC561</span><strong>' + fmt(amount) + '</strong><em>\uC6D0</em><small>R\uC5F4 \uD569\uACC4 \uAE08\uC561 \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="purple">' + html(first.label) + '</strong><em>' + fmt(first.count) + '\uAC74</em><small>' + (pending.length ? '\uC2DC\uACF5\uBBF8\uACB0 \uD488\uBAA9 TOP 5' : '\uC190\uC2E4\uAE08\uC561 \uC0C1\uC704 \uD488\uBAA9') + '</small><div class="daily-receipt-tags">' + top.map(function (item) { return '<span>' + html(item.label) + ' ' + fmt(item.count) + '\uAC74</span>'; }).join("") + '</div></article>';
  }

  function entryYearByTitle(entry) {
    var text = [entry && entry.groupTitle, entry && entry.label, entry && entry.fileName, entry && entry.sourceSheet, entry && entry.sourceUrl, entry && entry.groupKey].join(" ");
    var m = text.match(/(20\d{2})\s*\uB144|(\d{2})\s*\uB144|existing-(\d{2})/);
    if (m) return String(m[1] || ("20" + (m[2] || m[3]))).slice(-2);
    return "";
  }
  function entryMonthByTitle(entry) {
    var text = [entry && entry.label, entry && entry.sourceSheet, entry && entry.fileName, entry && entry.groupTitle].join(" ");
    var m = text.match(/(\d{1,2})\s*\uC6D4/);
    return m ? Number(m[1]) : 0;
  }
  function costForYearV8(year) {
    return (state.uploads || []).filter(function (entry) { return entry.kind === "cost" && entryYearByTitle(entry) === String(year).slice(-2); }).sort(function (a, b) { return entryMonthByTitle(a) - entryMonthByTitle(b); });
  }
  function entryCountV8(entry) { return typeof entryCount === "function" ? entryCount(entry) : (entry.rows || []).length; }
  function entryAmountV8(entry) { return typeof entryAmount === "function" ? entryAmount(entry) : Number(entry.defectAmount || 0) + Math.max(0, entryCountV8(entry) - Number(entry.excluded || 0)) * PENALTY; }
  function quoteJs(value) { return clean(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'"); }
  function ensureClaimAccumCssV8() {
    if (el("claimAccumV8Style")) return;
    var style = document.createElement("style");
    style.id = "claimAccumV8Style";
    style.textContent = ".claim-accum-card-grid{display:flex!important;gap:12px;overflow-x:auto!important;padding:8px 2px 14px}.claim-accum-card-grid .file-card{flex:0 0 185px!important;max-width:185px!important}.claim-accum-frame-wrap{margin-top:12px}.claim-accum-frame-wrap iframe{width:100%;min-height:720px;border:0}.claim-accum-title-btn{border:0;background:transparent;color:#1f6fe5;font:900 24px 'Malgun Gothic','Segoe UI',Arial,sans-serif;cursor:pointer}.claim-accum-header{display:flex;gap:12px;align-items:center;margin:8px 0 12px}.claim-accum-controls{display:flex;gap:8px;align-items:center}.is-hidden{display:none!important}";
    document.head.appendChild(style);
  }
  function renderClaimAccumV8() {
    if (window.__USE_EXTERNAL_DAILY_STABLE) return;
    var panel = el("defectCloseDashboardBody");
    if (!panel) return;
    ensureClaimAccumCssV8();
    var select = el("claimAccumYearSelect");
    var year = Number(select && select.value) || window.__claimAccumYearV8 || new Date().getFullYear();
    window.__claimAccumYearV8 = year;
    var entries = costForYearV8(year);
    var totalCount = entries.reduce(function (s, e) { return s + entryCountV8(e); }, 0);
    var totalAmount = entries.reduce(function (s, e) { return s + entryAmountV8(e); }, 0);
    var totalExcluded = entries.reduce(function (s, e) { return s + Number(e.excluded || 0); }, 0);
    var options = [2025, 2026, 2027].map(function (y) { return '<option value="' + y + '"' + (y === year ? ' selected' : '') + '>' + y + '\uB144</option>'; }).join("");
    var cards = entries.map(function (entry) {
      var id = quoteJs(entry.id);
      var count = entryCountV8(entry);
      var title = (entryMonthByTitle(entry) || "") + K.month;
      return '<article class="file-card"><div class="topline"><span class="name">' + html(title) + '</span><div class="card-actions"><input type="checkbox" ' + (entry.selected ? 'checked' : '') + ' onclick="event.stopPropagation();toggleUpload(\'' + id + '\', this.checked)" /><button class="delete-btn" type="button" onclick="event.stopPropagation();deleteUpload(\'' + id + '\')">' + K.deleteText + '</button></div></div><div class="meta">' + K.qualityCost + '</div><div class="count">' + fmt(count) + K.caseUnit + '</div><div class="meta">' + html(entry.sourceSheet || entry.label || "") + '</div><div class="amount-line">' + money(entryAmountV8(entry)) + '</div><div class="exclude-row" onclick="event.stopPropagation();"><span>' + K.penaltyExcluded + '</span><input type="number" min="0" max="' + count + '" value="' + Number(entry.excluded || 0) + '" onchange="setExcluded(\'' + id + '\', this.value);setTimeout(window.renderClaimAccumV8,120)" /><span>' + K.caseUnit + '</span></div></article>';
    }).join("");
    panel.innerHTML = '<section class="sheet-section"><div class="claim-accum-header"><button id="claimAccumToggle" class="claim-accum-title-btn" type="button" aria-expanded="false">&gt; ' + K.claimAccum + '</button><div class="claim-accum-controls"><label>' + K.year + ' <select id="claimAccumYearSelect">' + options + '</select></label><button type="button" onclick="selectCheckedOnly()">' + K.selectedSum + '</button><button type="button" onclick="clearSelection()">' + K.unselectMonth + '</button></div></div><div id="claimAccumBody" class="dashboard-group-body is-hidden"><div class="claim-accum-card-grid"><article class="file-card aggregate-card active"><div class="topline"><span class="name">' + K.total + '</span></div><div class="meta">' + String(year).slice(-2) + '\uB144 \uB9C8\uAC10\uC790\uB8CC</div><div class="count">' + fmt(totalCount) + K.caseUnit + '</div><div class="amount-line">' + money(totalAmount) + '</div><div class="meta">' + K.penaltyExcluded + ' ' + fmt(totalExcluded) + K.caseUnit + '</div></article>' + cards + '</div></div></section><div class="claim-accum-frame-wrap"><iframe class="defect-close-frame" src="dashboard_selected_months/dashboard_selected_months.html" title="\uD074\uB808\uC784\uB204\uC801\uD604\uD669"></iframe></div>';
    var ys = el("claimAccumYearSelect");
    if (ys) ys.addEventListener("change", function () { window.__claimAccumYearV8 = Number(ys.value) || year; setTimeout(renderClaimAccumV8, 60); });
    var toggle = el("claimAccumToggle");
    var body = el("claimAccumBody");
    if (toggle && body) toggle.addEventListener("click", function () { var collapsed = body.classList.toggle("is-hidden"); toggle.setAttribute("aria-expanded", String(!collapsed)); toggle.innerHTML = (collapsed ? "&gt; " : "\u2228 ") + K.claimAccum; });
  }
  window.renderClaimAccumV8 = renderClaimAccumV8;
  window.renderClaimAccumV7 = renderClaimAccumV8;
  function scheduleDailyV8() { setTimeout(refreshDailyV8, 80); setTimeout(refreshDailyV8, 280); setTimeout(refreshDailyV8, 560); }
  function scheduleClaimV8() { setTimeout(renderClaimAccumV8, 520); setTimeout(renderClaimAccumV8, 860); }
  document.addEventListener("change", function (event) {
    var id = event.target && event.target.id;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(id) >= 0) scheduleDailyV8();
    if (id === "claimAccumYearSelect") scheduleClaimV8();
  }, true);
  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="daily"]')) scheduleDailyV8();
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="claimAccum"]')) scheduleClaimV8();
  }, true);
  var prevRenderAllV8 = typeof renderAll === "function" ? renderAll : null;
  if (prevRenderAllV8 && !window.__finalDailyClaimAccumFix20260702V8) {
    window.__finalDailyClaimAccumFix20260702V8 = true;
    renderAll = function (message) {
      prevRenderAllV8(message);
      scheduleDailyV8();
      if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) scheduleClaimV8();
    };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { scheduleDailyV8(); if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) scheduleClaimV8(); });
  else setTimeout(function () { scheduleDailyV8(); if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) scheduleClaimV8(); }, 0);
})();

// final-daily-detail-claimaccum-speed-20260703-v9
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  function el(id) { return document.getElementById(id); }
  function clean(value) { return String(value == null ? "" : value).trim(); }
  function esc(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return clean(value).replace(/[&<>\"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; });
  }
  function fmt(value) { return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR"); }
  function cells(row) { return (row && row.__raw && row.__raw.__cells) || (row && row.__cells) || []; }
  function cell(row, index) { return clean(cells(row)[index]); }
  function raw(row) { return row && row.__raw ? row.__raw : row; }
  function numericSafe(value) {
    if (typeof numeric === "function") return numeric(value);
    var n = Number(clean(value).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    var m = clean(value).match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function stamp(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function receiptNo(row) { return cell(row, 3); }
  function validReceipt(row) {
    var d = parseDate(cell(row, 0));
    var no = receiptNo(row);
    return !!(d && no && !/^(\uC811\uC218\uBC88\uD638|NO|No)$/i.test(no));
  }
  function rowDate(row) { return parseDate(cell(row, 0)); }
  function category(row) {
    if (cell(row, 13) === "0") return "\uC2DC\uACF5\uBBF8\uACB0";
    var type = cell(row, 11);
    if (/\uAC10\uC131|\uCDE8\uAE09/.test(type)) return "\uAC10\uC131/\uCDE8\uAE09";
    return "\uACE0\uAC1D\uBD88\uB9CC";
  }
  function allReceiptHistoryRows() {
    var entries = (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; });
    var rows = [];
    entries.forEach(function (entry) {
      (entry.rows || []).forEach(function (row) {
        var rr = raw(row);
        if (validReceipt(rr)) rows.push(rr);
      });
    });
    return rows;
  }
  function selectedDailyDateStamp() {
    var selected = (typeof selectedDetailDate !== "undefined" && selectedDetailDate) || (el("detailDateSelect") && el("detailDateSelect").value) || "";
    var d = parseDate(selected);
    return stamp(d);
  }
  function selectedWeekDateStamps() {
    var year = Number(el("dailyYearSelect") && el("dailyYearSelect").value) || new Date().getFullYear();
    var month = Number(el("dailyMonthSelect") && el("dailyMonthSelect").value) || new Date().getMonth() + 1;
    var week = Number(el("dailyWeekSelect") && el("dailyWeekSelect").value) || 1;
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(year, month) : [];
    return new Set((groups[Math.max(0, week - 1)] || []).map(stamp));
  }
  function detailRowsFromReceiptHistory() {
    var exact = selectedDailyDateStamp();
    var weekDays = selectedWeekDateStamps();
    var filtered = allReceiptHistoryRows().filter(function (row) {
      var d = rowDate(row);
      if (!d) return false;
      if (exact) return stamp(d) === exact;
      return weekDays.has(stamp(d));
    });
    return filtered.map(function (row) {
      return {
        category: category(row),
        type: cell(row, 11),
        brand: cell(row, 2),
        source: cell(row, 9),
        code: cell(row, 5),
        color: cell(row, 6),
        lot: cell(row, 7) || ".",
        supplier: cell(row, 8),
        defect: cell(row, 12) || cell(row, 18) || cell(row, 19) || "",
        amount: numericSafe(cell(row, 17) || cell(row, 15))
      };
    });
  }
  function patchSummaryPrevYearHeader() {
    var table = el("summaryTable");
    if (!table) return;
    var year = Number(el("dailyYearSelect") && el("dailyYearSelect").value) || new Date().getFullYear();
    var prev = String(year - 1).slice(-2) + "\uB144";
    var first = table.querySelector("thead tr:first-child th[colspan='2']");
    if (first) first.textContent = prev;
  }
  function patchDetailsFromHistory() {
    if (activeDashboardTab && activeDashboardTab !== "daily") return;
    var rows = detailRowsFromReceiptHistory();
    if (!rows.length) return;
    state.details = rows;
    if (typeof renderDetails === "function") renderDetails();
  }
  function patchDailyLight() {
    patchSummaryPrevYearHeader();
    patchDetailsFromHistory();
    patchSummaryPrevYearHeader();
  }
  var oldRenderSummary = typeof renderSummary === "function" ? renderSummary : null;
  if (oldRenderSummary && !window.__dailyPrevYearHeaderWrapV9) {
    window.__dailyPrevYearHeaderWrapV9 = true;
    renderSummary = function () {
      var result = oldRenderSummary.apply(this, arguments);
      patchSummaryPrevYearHeader();
      return result;
    };
  }
  var dailyPatchTimer = null;
  function scheduleDailyPatch() {
    clearTimeout(dailyPatchTimer);
    dailyPatchTimer = setTimeout(patchDailyLight, 90);
    setTimeout(patchDailyLight, 640);
  }

  function ensureClaimAccumFrameOnlyCss() {
    if (el("claimAccumFrameOnlyStyleV9")) return;
    var style = document.createElement("style");
    style.id = "claimAccumFrameOnlyStyleV9";
    style.textContent = ".claim-accum-frame-wrap{margin-top:0}.claim-accum-frame-wrap iframe{width:100%;min-height:760px;border:0;display:block}";
    document.head.appendChild(style);
  }
  function renderClaimAccumFrameOnly() {
    var panel = el("defectCloseDashboardBody");
    if (!panel) return;
    ensureClaimAccumFrameOnlyCss();
    var existing = panel.querySelector("iframe.defect-close-frame");
    if (existing && panel.children.length === 1) return;
    panel.innerHTML = '<div class="claim-accum-frame-wrap"><iframe class="defect-close-frame" src="dashboard_selected_months/dashboard_selected_months.html" title="\uD074\uB808\uC784\uB204\uC801\uD604\uD669" loading="lazy"></iframe></div>';
  }
  window.renderClaimAccumV8 = renderClaimAccumFrameOnly;
  window.renderClaimAccumV7 = renderClaimAccumFrameOnly;
  window.renderClaimAccumCardsV6 = renderClaimAccumFrameOnly;
  window.renderClaimAccumCardsV5 = renderClaimAccumFrameOnly;
  var oldRenderAll = typeof renderAll === "function" ? renderAll : null;
  if (oldRenderAll && !window.__claimAccumFrameOnlyRenderAllV9) {
    window.__claimAccumFrameOnlyRenderAllV9 = true;
    renderAll = function (message) {
      var result = oldRenderAll.apply(this, arguments);
      scheduleDailyPatch();
      if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) {
        setTimeout(renderClaimAccumFrameOnly, 40);
        setTimeout(renderClaimAccumFrameOnly, 780);
      }
      return result;
    };
  }
  document.addEventListener("change", function (event) {
    var id = event.target && event.target.id;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect", "detailDateSelect"].indexOf(id) >= 0) scheduleDailyPatch();
  }, true);
  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="daily"]')) scheduleDailyPatch();
    if (event.target && event.target.closest && event.target.closest('[data-dashboard-tab="claimAccum"]')) {
      setTimeout(renderClaimAccumFrameOnly, 60);
      setTimeout(renderClaimAccumFrameOnly, 820);
    }
  }, true);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { scheduleDailyPatch(); if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) renderClaimAccumFrameOnly(); });
  } else {
    setTimeout(function () { scheduleDailyPatch(); if (document.querySelector('[data-dashboard-panel="claimAccum"].active, #claimAccumDashboardPanel.active')) renderClaimAccumFrameOnly(); }, 0);
  }
})();

// final-daily-detail-fast-fallback-20260703-v10
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  function byId(id) { return document.getElementById(id); }
  function text(value) { return String(value == null ? "" : value).trim(); }
  function cells(row) { return (row && row.__raw && row.__raw.__cells) || (row && row.__cells) || []; }
  function cell(row, index) { return text(cells(row)[index]); }
  function raw(row) { return row && row.__raw ? row.__raw : row; }
  function parseDateSafe(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    var m = text(value).match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function dateStampSafe(date) {
    return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0;
  }
  function numericSafe(value) {
    if (typeof numeric === "function") return numeric(value);
    var n = Number(text(value).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  function rowDate(row) { return parseDateSafe(cell(row, 0)); }
  function receiptNo(row) { return cell(row, 3); }
  function isValidReceiptRow(row) {
    var d = rowDate(row);
    var no = receiptNo(row);
    return !!(d && no && !/^(\uC811\uC218\uBC88\uD638|NO|No)$/i.test(no));
  }
  function receiptRows() {
    var out = [];
    (state.uploads || []).forEach(function (entry) {
      if (entry.kind !== "receiptHistory") return;
      (entry.rows || []).forEach(function (row) {
        var rr = raw(row);
        if (isValidReceiptRow(rr)) out.push(rr);
      });
    });
    return out;
  }
  function pickHeader(row, names) {
    if (typeof pick === "function") {
      var value = pick(row, names);
      if (text(value)) return text(value);
    }
    var headers = (row && row.__headers) || Object.keys(row || {});
    for (var i = 0; i < headers.length; i += 1) {
      var header = text(headers[i]).replace(/\s+/g, "");
      for (var j = 0; j < names.length; j += 1) {
        if (header === text(names[j]).replace(/\s+/g, "")) return text(row[headers[i]]);
      }
    }
    return "";
  }
  function defectText(row) {
    var byName = pickHeader(row, ["\uD558\uC790\uB0B4\uC5ED", "\uD558\uC790\uC0C1\uC138", "\uC11C\uBE44\uC2A4\uC694\uAD6C\uB0B4\uC5ED", "\uB0B4\uC6A9", "\uD074\uB808\uC784\uB0B4\uC6A9"]);
    if (byName) return byName;
    var candidates = [12, 18, 19, 20, 21, 22, 23, 24].map(function (idx) { return cell(row, idx); })
      .filter(function (value) {
        if (!value) return false;
        if (/^\d+([,.]\d+)?$/.test(value)) return false;
        if (/^(0|1|2|3|4|5|6|7|8|9|10)$/.test(value)) return false;
        return true;
      });
    candidates.sort(function (a, b) { return b.length - a.length; });
    return candidates[0] || "";
  }
  function claimCategory(row) {
    if (cell(row, 13) === "0") return "\uC2DC\uACF5\uBBF8\uACB0";
    var type = cell(row, 11);
    if (/\uAC10\uC131|\uCDE8\uAE09/.test(type)) return "\uAC10\uC131/\uCDE8\uAE09";
    return "\uACE0\uAC1D\uBD88\uB9CC";
  }
  function selectedDateStamp() {
    var selected = (typeof selectedDetailDate !== "undefined" && selectedDetailDate) || (byId("detailDateSelect") && byId("detailDateSelect").value) || "";
    return dateStampSafe(parseDateSafe(selected));
  }
  function selectedWeekStampSet() {
    var year = Number(byId("dailyYearSelect") && byId("dailyYearSelect").value) || new Date().getFullYear();
    var month = Number(byId("dailyMonthSelect") && byId("dailyMonthSelect").value) || new Date().getMonth() + 1;
    var week = Number(byId("dailyWeekSelect") && byId("dailyWeekSelect").value) || 1;
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(year, month) : [];
    return new Set((groups[Math.max(0, week - 1)] || []).map(dateStampSafe));
  }
  function selectedRows() {
    var exact = selectedDateStamp();
    var weekSet = selectedWeekStampSet();
    return receiptRows().filter(function (row) {
      var stamp = dateStampSafe(rowDate(row));
      return exact ? stamp === exact : weekSet.has(stamp);
    });
  }
  function rowsToDetails(rows) {
    return rows.map(function (row, index) {
      return {
        number: numericSafe(cell(row, 1)) || index + 1,
        category: claimCategory(row),
        type: cell(row, 11),
        brand: cell(row, 2),
        source: cell(row, 9),
        code: cell(row, 5),
        color: cell(row, 6),
        lot: cell(row, 7) || ".",
        supplier: cell(row, 8),
        defect: defectText(row),
        amount: numericSafe(cell(row, 17) || cell(row, 15))
      };
    }).filter(function (row) {
      return [row.category, row.type, row.brand, row.source, row.code, row.color, row.lot, row.supplier, row.defect].some(Boolean);
    });
  }
  function patchPrevYearHeader() {
    var table = byId("summaryTable");
    if (!table) return;
    var year = Number(byId("dailyYearSelect") && byId("dailyYearSelect").value) || new Date().getFullYear();
    var first = table.querySelector("thead tr:first-child th[colspan='2']");
    if (first) first.textContent = String(year - 1).slice(-2) + "\uB144";
  }
  function renderSelectedDetailsFast() {
    var rows = rowsToDetails(selectedRows());
    if (!rows.length) return false;
    state.details = rows;
    if (typeof renderDetails === "function") renderDetails();
    return true;
  }
  function patchDailyV10() {
    patchPrevYearHeader();
    renderSelectedDetailsFast();
    patchPrevYearHeader();
  }
  var patchTimer = null;
  function schedulePatch() {
    clearTimeout(patchTimer);
    patchTimer = setTimeout(patchDailyV10, 30);
  }
  document.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (target.id === "detailDateSelect") {
      event.stopImmediatePropagation();
      selectedDetailDate = target.value;
      renderSelectedDetailsFast();
      patchPrevYearHeader();
      return;
    }
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) >= 0) {
      schedulePatch();
    }
  }, true);
  var oldRenderSummary = typeof renderSummary === "function" ? renderSummary : null;
  if (oldRenderSummary && !window.__dailyPrevYearHeaderWrapV10) {
    window.__dailyPrevYearHeaderWrapV10 = true;
    renderSummary = function () {
      var result = oldRenderSummary.apply(this, arguments);
      patchPrevYearHeader();
      return result;
    };
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedulePatch);
  } else {
    setTimeout(schedulePatch, 0);
  }
})();

// final-daily-detail-event-priority-20260703-v11
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  function t(v) { return String(v == null ? "" : v).trim(); }
  function id(name) { return document.getElementById(name); }
  function cs(row) { return (row && row.__raw && row.__raw.__cells) || (row && row.__cells) || []; }
  function c(row, i) { return t(cs(row)[i]); }
  function r(row) { return row && row.__raw ? row.__raw : row; }
  function d(v) {
    if (v instanceof Date && !Number.isNaN(v.getTime())) return v;
    if (typeof parseDateFromText === "function") { var p = parseDateFromText(v); if (p) return p; }
    var m = t(v).match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function ds(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function num(v) { if (typeof numeric === "function") return numeric(v); var n = Number(t(v).replace(/[^0-9.-]/g, "")); return Number.isFinite(n) ? n : 0; }
  function valid(row) { return !!(d(c(row, 0)) && c(row, 3) && !/^(\uC811\uC218\uBC88\uD638|NO|No)$/i.test(c(row, 3))); }
  function rows() {
    var out = [];
    (state.uploads || []).forEach(function (entry) {
      if (entry.kind !== "receiptHistory") return;
      (entry.rows || []).forEach(function (row) { var rr = r(row); if (valid(rr)) out.push(rr); });
    });
    return out;
  }
  function byHeader(row, names) {
    if (typeof pick === "function") { var pv = pick(row, names); if (t(pv)) return t(pv); }
    var headers = (row && row.__headers) || Object.keys(row || {});
    for (var i = 0; i < headers.length; i += 1) {
      var h = t(headers[i]).replace(/\s+/g, "");
      for (var j = 0; j < names.length; j += 1) if (h === t(names[j]).replace(/\s+/g, "")) return t(row[headers[i]]);
    }
    return "";
  }
  function defect(row) {
    var named = byHeader(row, ["\uD558\uC790\uB0B4\uC5ED", "\uD558\uC790\uC0C1\uC138", "\uC11C\uBE44\uC2A4\uC694\uAD6C\uB0B4\uC5ED", "\uB0B4\uC6A9", "\uD074\uB808\uC784\uB0B4\uC6A9"]);
    if (named) return named;
    var list = [12, 18, 19, 20, 21, 22, 23, 24].map(function (i) { return c(row, i); }).filter(function (v) { return v && !/^\d+([,.]\d+)?$/.test(v) && !/^(0|1|2|3|4|5|6|7|8|9|10)$/.test(v); });
    list.sort(function (a, b) { return b.length - a.length; });
    return list[0] || "";
  }
  function cat(row) { if (c(row, 13) === "0") return "\uC2DC\uACF5\uBBF8\uACB0"; return /\uAC10\uC131|\uCDE8\uAE09/.test(c(row, 11)) ? "\uAC10\uC131/\uCDE8\uAE09" : "\uACE0\uAC1D\uBD88\uB9CC"; }
  function selectedStamps() {
    var exact = ds(d((typeof selectedDetailDate !== "undefined" && selectedDetailDate) || (id("detailDateSelect") && id("detailDateSelect").value) || ""));
    if (exact) return { exact: exact };
    var y = Number(id("dailyYearSelect") && id("dailyYearSelect").value) || new Date().getFullYear();
    var m = Number(id("dailyMonthSelect") && id("dailyMonthSelect").value) || new Date().getMonth() + 1;
    var w = Number(id("dailyWeekSelect") && id("dailyWeekSelect").value) || 1;
    var groups = typeof claimSummaryWeekGroups === "function" ? claimSummaryWeekGroups(y, m) : [];
    return { set: new Set((groups[Math.max(0, w - 1)] || []).map(ds)) };
  }
  function applyDetails() {
    var sel = selectedStamps();
    var selected = rows().filter(function (row) { var s = ds(d(c(row, 0))); return sel.exact ? s === sel.exact : sel.set && sel.set.has(s); });
    if (!selected.length) return;
    state.details = selected.map(function (row, index) {
      return { number: num(c(row, 1)) || index + 1, category: cat(row), type: c(row, 11), brand: c(row, 2), source: c(row, 9), code: c(row, 5), color: c(row, 6), lot: c(row, 7) || ".", supplier: c(row, 8), defect: defect(row), amount: num(c(row, 17) || c(row, 15)) };
    });
    if (typeof renderDetails === "function") renderDetails();
  }
  function patchHeader() {
    var table = id("summaryTable");
    var y = Number(id("dailyYearSelect") && id("dailyYearSelect").value) || new Date().getFullYear();
    var first = table && table.querySelector("thead tr:first-child th[colspan='2']");
    if (first) first.textContent = String(y - 1).slice(-2) + "\uB144";
  }
  function delayed() { setTimeout(function () { applyDetails(); patchHeader(); }, 140); setTimeout(function () { applyDetails(); patchHeader(); }, 760); }
  window.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (target.id === "detailDateSelect") {
      event.stopImmediatePropagation();
      selectedDetailDate = target.value;
      applyDetails();
      patchHeader();
      delayed();
      return;
    }
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) >= 0) delayed();
  }, true);
})();

// final-daily-source-routing-fast-20260703-v12
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  var K = {
    pending: "\uC2DC\uACF5\uBBF8\uACB0",
    complaint: "\uACE0\uAC1D\uBD88\uB9CC",
    sens: "\uAC10\uC131/\uCDE8\uAE09",
    sum: "\uACC4",
    ppm: "PPM"
  };
  function id(name) { return document.getElementById(name); }
  function tx(value) { return String(value == null ? "" : value).trim(); }
  function rr(row) { return row && row.__raw ? row.__raw : row; }
  function cells(row) { var raw = rr(row); return (raw && raw.__cells) || row.__cells || []; }
  function cell(row, index) { return tx(cells(row)[index]); }
  function n(value) { if (typeof numeric === "function") return numeric(value); var parsed = Number(tx(value).replace(/[^0-9.-]/g, "")); return Number.isFinite(parsed) ? parsed : 0; }
  function html(value) { return typeof escapeHtml === "function" ? escapeHtml(value) : tx(value).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; }); }
  function fmt(value) { return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR"); }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof parseDateFromText === "function") { var parsed = parseDateFromText(value); if (parsed) return parsed; }
    var m = tx(value).match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function stamp(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function receiptNo(row) { return cell(row, 3); }
  function isReceipt(row) { var d = parseDate(cell(row, 0)); var no = receiptNo(row); return !!(d && no && !/^(\uC811\uC218\uBC88\uD638|NO|No)$/i.test(no)); }
  function pickSafe(row, names) { try { return typeof pick === "function" ? tx(pick(rr(row), names)) : ""; } catch (err) { return ""; } }
  function headerPick(row, names) {
    var picked = pickSafe(row, names);
    if (picked) return picked;
    var raw = rr(row);
    var headers = (raw && raw.__headers) || Object.keys(raw || {});
    for (var i = 0; i < headers.length; i += 1) {
      var h = tx(headers[i]).replace(/\s+/g, "");
      for (var j = 0; j < names.length; j += 1) if (h === tx(names[j]).replace(/\s+/g, "")) return tx(raw[headers[i]]);
    }
    return "";
  }
  function defect(row) {
    var named = headerPick(row, ["\uD558\uC790\uB0B4\uC5ED", "\uD558\uC790\uC0C1\uC138", "\uC11C\uBE44\uC2A4\uC694\uAD6C\uB0B4\uC5ED", "\uB0B4\uC6A9", "\uD074\uB808\uC784\uB0B4\uC6A9"]);
    if (named) return named;
    var candidates = [12, 18, 19, 20, 21, 22, 23, 24].map(function (i) { return cell(row, i); }).filter(function (v) { return v && !/^\d+([,.]\d+)?$/.test(v) && !/^(0|1|2|3|4|5|6|7|8|9|10)$/.test(v); });
    candidates.sort(function (a, b) { return b.length - a.length; });
    return candidates[0] || "";
  }
  function category(row) {
    var pending = cell(row, 13) || headerPick(row, ["\uBBF8\uACB0\uAD6C\uBD84", "\uC2DC\uACF5\uBBF8\uACB0"]);
    if (tx(pending) === "0") return K.pending;
    var type = cell(row, 11) || headerPick(row, ["\uC720\uD615", "type"]);
    if (/\uAC10\uC131|\uCDE8\uAE09/.test(type)) return K.sens;
    return K.complaint;
  }
  function amount(row) { return n(cell(row, 17) || headerPick(row, ["\uD569\uACC4", "\uAE08\uC561", "amount"]) || cell(row, 15)); }
  function code(row) { return cell(row, 5) || headerPick(row, ["\uBD80\uD488\uCF54\uB4DC", "\uC81C\uD488\uCF54\uB4DC", "code"]); }
  function color(row) { return cell(row, 6) || headerPick(row, ["\uC0C9\uC0C1", "color"]); }
  function nowPeriod() { var now = new Date(); return { year: now.getFullYear(), month: now.getMonth() + 1 }; }
  function selectedPeriod() {
    var now = nowPeriod();
    return {
      year: Number(id("dailyYearSelect") && id("dailyYearSelect").value) || now.year,
      month: Number(id("dailyMonthSelect") && id("dailyMonthSelect").value) || now.month,
      week: Number(id("dailyWeekSelect") && id("dailyWeekSelect").value) || 1
    };
  }
  function isThisMonth(year, month) { var now = nowPeriod(); return Number(year) === now.year && Number(month) === now.month; }
  var cacheKey = "";
  var cache = { summary: [], history: [] };
  function rebuildCache() {
    var key = (state.uploads || []).map(function (entry) { return [entry.id, entry.kind, (entry.rows || []).length, entry.selected ? 1 : 0].join(":"); }).join("|");
    if (key === cacheKey) return;
    cacheKey = key;
    cache = { summary: [], history: [] };
    (state.uploads || []).forEach(function (entry) {
      if (entry.kind !== "summary" && entry.kind !== "receiptHistory") return;
      (entry.rows || []).forEach(function (row, index) {
        var raw = rr(row);
        if (!isReceipt(raw)) return;
        var d = parseDate(cell(raw, 0));
        var item = { entry: entry, row: raw, date: d, stamp: stamp(d), year: d.getFullYear(), month: d.getMonth() + 1, index: index };
        if (entry.kind === "summary") cache.summary.push(item);
        else cache.history.push(item);
      });
    });
  }
  function rowsForMonth(year, month, opts) {
    rebuildCache();
    opts = opts || {};
    var primary = opts.forceHistory ? cache.history : (isThisMonth(year, month) ? cache.summary : cache.history);
    var rows = primary.filter(function (item) { return item.year === Number(year) && item.month === Number(month); });
    if (!rows.length && opts.allowFallback !== false) {
      var fallback = primary === cache.summary ? cache.history : cache.summary;
      rows = fallback.filter(function (item) { return item.year === Number(year) && item.month === Number(month); });
    }
    return rows;
  }
  function rowsForYear(year) {
    rebuildCache();
    return cache.history.filter(function (item) { return item.year === Number(year); });
  }
  function weekGroups(year, month) {
    if (typeof claimSummaryWeekGroups === "function") return claimSummaryWeekGroups(year, month) || [];
    var list = [];
    var last = new Date(year, month, 0).getDate();
    for (var d = 1; d <= last; d += 1) { var date = new Date(year, month - 1, d); if (date.getDay() !== 0 && date.getDay() !== 6) list.push(date); }
    return [list.slice(0, 5), list.slice(5, 10), list.slice(10, 15), list.slice(15, 22), list.slice(22)].filter(function (g) { return g.length; });
  }
  function weekDates(sel) { return weekGroups(sel.year, sel.month)[Math.max(0, sel.week - 1)] || []; }
  function endDate(sel) { var group = weekDates(sel); return group.length ? group[group.length - 1] : new Date(sel.year, sel.month - 1, 1); }
  function targetCell(main, target, show) { if (target == null) return main || 0; return show ? String(main || 0) + "(" + target + ")" : "(" + target + ")"; }
  function addCount(bucket, item, key) { var cat = category(item.row); bucket[cat][key] = (Number(bucket[cat][key]) || 0) + 1; }
  function seedRow(cat, prevStats, keys) {
    var row = { category: cat, prevTotal: prevStats.total || 0, prevAvg: prevStats.avg || 0 };
    keys.forEach(function (key) { if (!(key in row)) row[key] = 0; });
    return row;
  }
  function aggregatePrevYear(year) {
    var stats = {}; [K.pending, K.complaint, K.sens].forEach(function (cat) { stats[cat] = { total: 0, avg: 0, months: {} }; });
    rowsForYear(year).forEach(function (item) { stats[category(item.row)].months[item.month] = (stats[category(item.row)].months[item.month] || 0) + 1; });
    Object.keys(stats).forEach(function (cat) {
      var values = Object.keys(stats[cat].months).map(function (m) { return stats[cat].months[m]; });
      stats[cat].total = values.reduce(function (s, v) { return s + v; }, 0);
      stats[cat].avg = values.length ? Math.round(stats[cat].total / values.length) : 0;
    });
    return stats;
  }
  function makeSummary(sel) {
    var end = endDate(sel);
    var meta = typeof buildClaimSummaryMeta === "function" ? buildClaimSummaryMeta(end) : null;
    if (!meta) return null;
    state.summaryMeta = meta;
    var keys = typeof summaryDynamicKeys === "function" ? summaryDynamicKeys(meta) : [];
    var prev = aggregatePrevYear(sel.year - 1);
    var rows = [K.pending, K.complaint, K.sens].map(function (cat) { return seedRow(cat, prev[cat] || {}, keys); });
    var map = {}; rows.forEach(function (row) { map[row.category] = row; });
    for (var m = 1; m < meta.currentMonth; m += 1) rowsForMonth(sel.year, m, { forceHistory: true }).forEach(function (item) { addCount(map, item, "m" + m); });
    var endStamp = stamp(end);
    rowsForMonth(sel.year, meta.currentMonth).filter(function (item) { return item.stamp <= endStamp; }).forEach(function (item) {
      var row = map[category(item.row)];
      var weekIndex = meta.preWeeks.findIndex(function (week) { return (week.dates || []).some(function (d) { return stamp(d) === item.stamp; }); });
      if (weekIndex >= 0) row[meta.preWeeks[weekIndex].key] = (Number(row[meta.preWeeks[weekIndex].key]) || 0) + 1;
      var day = meta.dayColumns.find(function (col) { return stamp(col.date) === item.stamp; });
      if (day) row[day.key] = (Number(row[day.key]) || 0) + 1;
      row[meta.monthTotalKey] = (Number(row[meta.monthTotalKey]) || 0) + 1;
    });
    rows.forEach(function (row) {
      var targets = row.category === K.complaint ? { daily: 3, month: 50, future: 50, total: 600, avg: 50 } : { daily: 0, month: 0, future: 0, total: 0, avg: 0 };
      meta.dayColumns.forEach(function (col) { var main = Number(row[col.key] || 0); row[col.key] = targetCell(main, targets.daily, main > 0 || stamp(col.date) <= endStamp); });
      row[meta.monthTotalKey] = targetCell(Number(row[meta.monthTotalKey] || 0), targets.month, true);
      meta.postMonths.forEach(function (month) { row["m" + month] = targetCell(0, targets.future, false); });
      var total = 0, active = 0;
      for (var i = 1; i <= 12; i += 1) { var key = i === meta.currentMonth ? meta.monthTotalKey : "m" + i; var main = Number((String(row[key]).match(/^-?\d+/) || [row[key] || 0])[0]) || 0; total += main; if (main > 0) active += 1; }
      row.total = targetCell(total, targets.total, true);
      row.avg = targetCell(active ? Math.round(total / active) : 0, targets.avg, true);
    });
    var sum = { category: K.sum, prevTotal: rows.reduce(function (s, row) { return s + Number(row.prevTotal || 0); }, 0), prevAvg: rows.reduce(function (s, row) { return s + Number(row.prevAvg || 0); }, 0) };
    keys.forEach(function (key) {
      if (key === "prevTotal" || key === "prevAvg") return;
      var main = rows.reduce(function (s, row) { return s + (Number((String(row[key]).match(/^-?\d+/) || [row[key] || 0])[0]) || 0); }, 0);
      if (meta.dayColumns.some(function (col) { return col.key === key; })) sum[key] = targetCell(main, 3, true);
      else if (key === meta.monthTotalKey) sum[key] = targetCell(main, 50, true);
      else if (/^m\d+/.test(key) && meta.postMonths.some(function (month) { return key === "m" + month; })) sum[key] = targetCell(0, 50, false);
      else sum[key] = main;
    });
    var totalMain = 0, activeMonths = 0;
    for (var sm = 1; sm <= 12; sm += 1) { var sk = sm === meta.currentMonth ? meta.monthTotalKey : "m" + sm; var sv = Number((String(sum[sk]).match(/^-?\d+/) || [sum[sk] || 0])[0]) || 0; totalMain += sv; if (sv > 0) activeMonths += 1; }
    sum.total = targetCell(totalMain, 600, true);
    sum.avg = targetCell(activeMonths ? Math.round(totalMain / activeMonths) : 0, 50, true);
    var oldPpm = (state.summary || []).find(function (row) { return row.category === K.ppm; }) || { category: K.ppm, prevTotal: 1011, prevAvg: "", m1: 865, m2: 955, m3: 1139, m4: 1325, m5: 964, m6: 903, m6Total: 903, avg: 1037 };
    return rows.concat([sum, oldPpm]);
  }
  function detailsForItems(items) {
    return items.map(function (item, index) {
      var row = item.row;
      return { number: n(cell(row, 1)) || index + 1, category: category(row), type: cell(row, 11), brand: cell(row, 2), source: cell(row, 9), code: code(row), color: color(row), lot: cell(row, 7) || ".", supplier: cell(row, 8), defect: defect(row), amount: amount(row) };
    });
  }
  function weekItems(sel) {
    var dates = new Set(weekDates(sel).map(stamp));
    return rowsForMonth(sel.year, sel.month).filter(function (item) { return dates.has(item.stamp); });
  }
  function renderCards(items) {
    var box = id("dailyReceiptCards");
    if (!box) return;
    var totalAmount = items.reduce(function (s, item) { return s + amount(item.row); }, 0);
    var pending = items.filter(function (item) { return category(item.row) === K.pending; });
    var source = pending.length ? pending : items.slice().sort(function (a, b) { return amount(b.row) - amount(a.row); }).slice(0, 1);
    var topMap = new Map();
    source.forEach(function (item) { var label = code(item.row) + (color(item.row) ? " / " + color(item.row) : ""); if (tx(label)) topMap.set(label, (topMap.get(label) || 0) + 1); });
    var top = Array.from(topMap.entries()).map(function (p) { return { label: p[0], count: p[1] }; }).sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); }).slice(0, 5);
    var first = top[0] || { label: "-", count: 0 };
    box.innerHTML = '<article class="daily-receipt-card"><span>\uC811\uC218\uAC74\uC218</span><strong>' + fmt(items.length) + '</strong><em>\uAC74</em><small>\uC120\uD0DD \uC8FC\uCC28 \uC790\uB8CC \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC190\uC2E4\uAE08\uC561</span><strong>' + fmt(totalAmount) + '</strong><em>\uC6D0</em><small>R\uC5F4 \uD569\uACC4 \uAE08\uC561 \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="purple">' + html(first.label) + '</strong><em>' + fmt(first.count) + '\uAC74</em><small>' + (pending.length ? '\uC2DC\uACF5\uBBF8\uACB0 \uD488\uBAA9 TOP 5' : '\uC190\uC2E4\uAE08\uC561 \uC0C1\uC704 \uD488\uBAA9') + '</small><div class="daily-receipt-tags">' + top.map(function (item) { return '<span>' + html(item.label) + ' ' + fmt(item.count) + '\uAC74</span>'; }).join("") + '</div></article>';
  }
  function patchPrevHeader() {
    var table = id("summaryTable");
    var sel = selectedPeriod();
    var first = table && table.querySelector("thead tr:first-child th[colspan='2']");
    if (first) first.textContent = String(sel.year - 1).slice(-2) + "\uB144";
  }
  function fastRefreshDaily() {
    var sel = selectedPeriod();
    var summary = makeSummary(sel);
    if (summary) state.summary = summary;
    var items = weekItems(sel);
    state.details = detailsForItems(items);
    if (typeof renderSummary === "function") renderSummary();
    if (typeof renderDetails === "function") renderDetails();
    renderCards(items);
    patchPrevHeader();
  }
  var oldRebuild = typeof rebuildFromSelection === "function" ? rebuildFromSelection : null;
  if (oldRebuild && !window.__dailyFastRebuildV12) {
    window.__dailyFastRebuildV12 = true;
    rebuildFromSelection = function () {
      var active = (typeof activeDashboardTab === "undefined") || activeDashboardTab === "daily";
      if (active && id("dailyYearSelect") && id("dailyMonthSelect") && id("dailyWeekSelect")) {
        fastRefreshDaily();
        return;
      }
      return oldRebuild.apply(this, arguments);
    };
  }
  window.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) >= 0) {
      event.stopImmediatePropagation();
      fastRefreshDaily();
    }
  }, true);
  window.__refreshDailyFastV12 = fastRefreshDaily;
  setTimeout(function () { try { if ((typeof activeDashboardTab === "undefined") || activeDashboardTab === "daily") fastRefreshDaily(); } catch (err) {} }, 0);
})();

// final-daily-receipt-history-only-20260703-v13
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  if (window.__dailyReceiptHistoryOnlyV13Applied) return;
  window.__dailyReceiptHistoryOnlyV13Applied = true;
  window.__dailyReceiptHistoryOnlyV13 = true;

  var originalStopImmediate = Event.prototype.stopImmediatePropagation;
  Event.prototype.stopImmediatePropagation = function () {
    var target = this && this.target;
    if (target && ["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) >= 0 && !this.__allowDailyImmediateStopV13) {
      return;
    }
    return originalStopImmediate.apply(this, arguments);
  };

  var K = {
    pending: "\uC2DC\uACF5\uBBF8\uACB0",
    complaint: "\uACE0\uAC1D\uBD88\uB9CC",
    sens: "\uAC10\uC131/\uCDE8\uAE09",
    sum: "\uACC4",
    ppm: "PPM"
  };
  var dailyCacheKey = "";
  var dailyCacheRows = [];

  function id(name) { return document.getElementById(name); }
  function text(value) { return String(value == null ? "" : value).trim(); }
  function raw(row) { return row && row.__raw ? row.__raw : row; }
  function cells(row) { var r = raw(row); return (r && r.__cells) || row.__cells || []; }
  function cell(row, index) { return text(cells(row)[index]); }
  function toNumber(value) {
    if (typeof numeric === "function") return numeric(value);
    var parsed = Number(text(value).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  function format(value) { return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR"); }
  function escape(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return text(value).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; });
  }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    var m = text(value).match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function stamp(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function sameHeader(a, b) { return text(a).replace(/\s+/g, "") === text(b).replace(/\s+/g, ""); }
  function headerValue(row, names) {
    var r = raw(row);
    if (!r) return "";
    try {
      if (typeof pick === "function") {
        var picked = text(pick(r, names));
        if (picked) return picked;
      }
    } catch (err) {}
    var headers = r.__headers || Object.keys(r || {});
    for (var i = 0; i < headers.length; i += 1) {
      for (var j = 0; j < names.length; j += 1) {
        if (sameHeader(headers[i], names[j])) return text(r[headers[i]]);
      }
    }
    return "";
  }
  function receiptNo(row) { return cell(row, 3) || headerValue(row, ["\uC811\uC218\uBC88\uD638"]); }
  function validReceipt(row) {
    var d = parseDate(cell(row, 0) || headerValue(row, ["\uC811\uC218\uC77C\uC790", "\uC811\uC218\uC77C"]));
    var no = receiptNo(row);
    if (!d || !no) return false;
    return !/(\uC811\uC218\uBC88\uD638|NO|No|번호)/.test(no);
  }
  function category(row) {
    var pending = cell(row, 13) || headerValue(row, ["\uBBF8\uACB0\uAD6C\uBD84", "\uC2DC\uACF5\uBBF8\uACB0"]);
    if (text(pending) === "0") return K.pending;
    var type = cell(row, 11) || headerValue(row, ["\uC720\uD615"]);
    if (/\uAC10\uC131|\uCDE8\uAE09/.test(type)) return K.sens;
    return K.complaint;
  }
  function amount(row) { return toNumber(cell(row, 17) || headerValue(row, ["\uD569\uACC4", "\uAE08\uC561", "\uD569\uACC4\uAE08\uC561"]) || cell(row, 15)); }
  function code(row) { return cell(row, 5) || headerValue(row, ["\uBD80\uD488\uCF54\uB4DC", "\uC81C\uD488\uCF54\uB4DC"]); }
  function color(row) { return cell(row, 6) || headerValue(row, ["\uC0C9\uC0C1"]); }
  function defect(row) {
    var named = headerValue(row, ["\uD558\uC790\uB0B4\uC5ED", "\uD558\uC790\uC0C1\uC138", "\uC11C\uBE44\uC2A4\uC694\uAD6C\uB0B4\uC5ED", "\uB0B4\uC6A9", "\uD074\uB808\uC784\uB0B4\uC6A9"]);
    if (named) return named;
    var candidates = [12, 18, 19, 20, 21, 22, 23, 24].map(function (i) { return cell(row, i); }).filter(function (v) {
      return v && !/^\d+([,.]\d+)?$/.test(v) && !/^(0|1|2|3|4|5|6|7|8|9|10)$/.test(v);
    });
    candidates.sort(function (a, b) { return b.length - a.length; });
    return candidates[0] || "";
  }
  function rebuildDailyCache() {
    var entries = (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; });
    var key = entries.map(function (entry) { return [entry.id, entry.kind, (entry.rows || []).length, entry.selected ? 1 : 0].join(":"); }).join("|");
    if (key === dailyCacheKey) return;
    dailyCacheKey = key;
    dailyCacheRows = [];
    entries.forEach(function (entry) {
      (entry.rows || []).forEach(function (row, index) {
        var r = raw(row);
        if (!validReceipt(r)) return;
        var date = parseDate(cell(r, 0) || headerValue(r, ["\uC811\uC218\uC77C\uC790", "\uC811\uC218\uC77C"]));
        dailyCacheRows.push({ entry: entry, row: r, index: index, date: date, stamp: stamp(date), year: date.getFullYear(), month: date.getMonth() + 1 });
      });
    });
  }
  function rowsFor(year, month) {
    rebuildDailyCache();
    return dailyCacheRows.filter(function (item) { return item.year === Number(year) && item.month === Number(month); });
  }
  function rowsForYear(year) {
    rebuildDailyCache();
    return dailyCacheRows.filter(function (item) { return item.year === Number(year); });
  }
  function selectedPeriod() {
    var now = new Date();
    return {
      year: Number(id("dailyYearSelect") && id("dailyYearSelect").value) || now.getFullYear(),
      month: Number(id("dailyMonthSelect") && id("dailyMonthSelect").value) || (now.getMonth() + 1),
      week: Number(id("dailyWeekSelect") && id("dailyWeekSelect").value) || 1
    };
  }
  function weekGroups(year, month) {
    if (typeof claimSummaryWeekGroups === "function") return claimSummaryWeekGroups(year, month) || [];
    var weekdays = [];
    var last = new Date(year, month, 0).getDate();
    for (var d = 1; d <= last; d += 1) {
      var date = new Date(year, month - 1, d);
      if (date.getDay() !== 0 && date.getDay() !== 6) weekdays.push(date);
    }
    return [weekdays.slice(0, 5), weekdays.slice(5, 10), weekdays.slice(10, 15), weekdays.slice(15, 22), weekdays.slice(22)].filter(function (group) { return group.length; });
  }
  function weekDates(sel) { return weekGroups(sel.year, sel.month)[Math.max(0, sel.week - 1)] || []; }
  function endDate(sel) { var dates = weekDates(sel); return dates.length ? dates[dates.length - 1] : new Date(sel.year, sel.month - 1, 1); }
  function mainNumber(value) { return Number((String(value == null ? "" : value).match(/^-?\d+/) || [value || 0])[0]) || 0; }
  function targetCell(main, target, showMain) { return showMain ? String(main || 0) + "(" + target + ")" : "(" + target + ")"; }
  function addTo(bucket, item, key) {
    var cat = category(item.row);
    if (!bucket[cat]) return;
    bucket[cat][key] = (Number(bucket[cat][key]) || 0) + 1;
  }
  function prevYearStats(year) {
    var stats = {};
    [K.pending, K.complaint, K.sens].forEach(function (cat) { stats[cat] = { total: 0, avg: 0, months: {} }; });
    rowsForYear(year).forEach(function (item) {
      var cat = category(item.row);
      if (!stats[cat]) return;
      stats[cat].months[item.month] = (stats[cat].months[item.month] || 0) + 1;
    });
    Object.keys(stats).forEach(function (cat) {
      var values = Object.keys(stats[cat].months).map(function (m) { return stats[cat].months[m]; });
      stats[cat].total = values.reduce(function (sum, value) { return sum + value; }, 0);
      stats[cat].avg = values.length ? Math.round(stats[cat].total / values.length) : 0;
    });
    return stats;
  }
  function buildSummary(sel) {
    var end = endDate(sel);
    var meta = typeof buildClaimSummaryMeta === "function" ? buildClaimSummaryMeta(end) : null;
    if (!meta) return null;
    state.summaryMeta = meta;
    var keys = typeof summaryDynamicKeys === "function" ? summaryDynamicKeys(meta) : [];
    var prev = prevYearStats(sel.year - 1);
    var rows = [K.pending, K.complaint, K.sens].map(function (cat) {
      var stat = prev[cat] || { total: 0, avg: 0 };
      var row = { category: cat, prevTotal: stat.total || 0, prevAvg: stat.avg || 0 };
      keys.forEach(function (key) { if (!(key in row)) row[key] = 0; });
      return row;
    });
    var byCat = {};
    rows.forEach(function (row) { byCat[row.category] = row; });
    for (var month = 1; month < meta.currentMonth; month += 1) {
      rowsFor(sel.year, month).forEach(function (item) { addTo(byCat, item, "m" + month); });
    }
    var endStamp = stamp(end);
    rowsFor(sel.year, meta.currentMonth).filter(function (item) { return item.stamp <= endStamp; }).forEach(function (item) {
      var row = byCat[category(item.row)];
      if (!row) return;
      var preIndex = meta.preWeeks.findIndex(function (week) { return (week.dates || []).some(function (date) { return stamp(date) === item.stamp; }); });
      if (preIndex >= 0) row[meta.preWeeks[preIndex].key] = (Number(row[meta.preWeeks[preIndex].key]) || 0) + 1;
      var day = meta.dayColumns.find(function (col) { return stamp(col.date) === item.stamp; });
      if (day) row[day.key] = (Number(row[day.key]) || 0) + 1;
      row[meta.monthTotalKey] = (Number(row[meta.monthTotalKey]) || 0) + 1;
    });
    rows.forEach(function (row) {
      var targets = row.category === K.complaint ? { daily: 3, month: 50, future: 50, total: 600, avg: 50 } : { daily: 0, month: 0, future: 0, total: 0, avg: 0 };
      meta.dayColumns.forEach(function (col) {
        var main = Number(row[col.key] || 0);
        row[col.key] = targetCell(main, targets.daily, main > 0 || stamp(col.date) <= endStamp);
      });
      row[meta.monthTotalKey] = targetCell(Number(row[meta.monthTotalKey] || 0), targets.month, true);
      meta.postMonths.forEach(function (m) { row["m" + m] = targetCell(0, targets.future, false); });
      var total = 0;
      var activeMonths = 0;
      for (var m = 1; m <= 12; m += 1) {
        var key = m === meta.currentMonth ? meta.monthTotalKey : "m" + m;
        var value = mainNumber(row[key]);
        total += value;
        if (value > 0) activeMonths += 1;
      }
      row.total = targetCell(total, targets.total, true);
      row.avg = targetCell(activeMonths ? Math.round(total / activeMonths) : 0, targets.avg, true);
    });
    var totalRow = { category: K.sum, prevTotal: rows.reduce(function (sum, row) { return sum + Number(row.prevTotal || 0); }, 0), prevAvg: rows.reduce(function (sum, row) { return sum + Number(row.prevAvg || 0); }, 0) };
    keys.forEach(function (key) {
      if (key === "prevTotal" || key === "prevAvg") return;
      var main = rows.reduce(function (sum, row) { return sum + mainNumber(row[key]); }, 0);
      if (meta.dayColumns.some(function (col) { return col.key === key; })) totalRow[key] = targetCell(main, 3, true);
      else if (key === meta.monthTotalKey) totalRow[key] = targetCell(main, 50, true);
      else if (/^m\d+/.test(key) && meta.postMonths.some(function (m) { return key === "m" + m; })) totalRow[key] = targetCell(0, 50, false);
      else totalRow[key] = main;
    });
    var allTotal = 0;
    var active = 0;
    for (var sm = 1; sm <= 12; sm += 1) {
      var skey = sm === meta.currentMonth ? meta.monthTotalKey : "m" + sm;
      var sval = mainNumber(totalRow[skey]);
      allTotal += sval;
      if (sval > 0) active += 1;
    }
    totalRow.total = targetCell(allTotal, 600, true);
    totalRow.avg = targetCell(active ? Math.round(allTotal / active) : 0, 50, true);
    var ppm = (state.summary || []).find(function (row) { return row.category === K.ppm; }) || { category: K.ppm, prevTotal: 1011, prevAvg: "", m1: 865, m2: 955, m3: 1139, m4: 1325, m5: 964, m6: 903, m6Total: 903, avg: 1037 };
    return rows.concat([totalRow, ppm]);
  }
  function selectedWeekItems(sel) {
    var dates = new Set(weekDates(sel).map(stamp));
    return rowsFor(sel.year, sel.month).filter(function (item) { return dates.has(item.stamp); });
  }
  function detailRows(items) {
    return items.map(function (item, index) {
      var row = item.row;
      return {
        number: toNumber(cell(row, 1)) || index + 1,
        category: category(row),
        type: cell(row, 11) || headerValue(row, ["\uC720\uD615"]),
        brand: cell(row, 2),
        source: cell(row, 9),
        code: code(row),
        color: color(row),
        lot: cell(row, 7) || ".",
        supplier: cell(row, 8),
        defect: defect(row),
        amount: amount(row)
      };
    });
  }
  function renderDailyCards(items) {
    var box = id("dailyReceiptCards");
    if (!box) return;
    var totalAmount = items.reduce(function (sum, item) { return sum + amount(item.row); }, 0);
    var pending = items.filter(function (item) { return category(item.row) === K.pending; });
    var baseItems = pending.length ? pending : items.slice().sort(function (a, b) { return amount(b.row) - amount(a.row); }).slice(0, 1);
    var top = new Map();
    baseItems.forEach(function (item) {
      var label = [code(item.row), color(item.row)].filter(Boolean).join(" / ");
      if (label) top.set(label, (top.get(label) || 0) + 1);
    });
    var list = Array.from(top.entries()).map(function (pair) { return { label: pair[0], count: pair[1] }; }).sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); }).slice(0, 5);
    var first = list[0] || { label: "-", count: 0 };
    box.innerHTML = '<article class="daily-receipt-card"><span>\uC811\uC218\uAC74\uC218</span><strong>' + format(items.length) + '</strong><em>\uAC74</em><small>3. \uC811\uC218\uB0B4\uC5ED(\uB204\uC801\uB370\uC774\uD130) \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC190\uC2E4\uAE08\uC561</span><strong>' + format(totalAmount) + '</strong><em>\uC6D0</em><small>R\uC5F4 \uD569\uACC4 \uAE08\uC561 \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="purple">' + escape(first.label) + '</strong><em>' + format(first.count) + '\uAC74</em><small>' + (pending.length ? '\uC2DC\uACF5\uBBF8\uACB0 \uD488\uBAA9 TOP 5' : '\uC190\uC2E4\uAE08\uC561 \uC0C1\uC704 \uD488\uBAA9') + '</small><div class="daily-receipt-tags">' + list.map(function (item) { return '<span>' + escape(item.label) + ' ' + format(item.count) + '\uAC74</span>'; }).join("") + '</div></article>';
  }
  function patchPrevHeader(sel) {
    var table = id("summaryTable");
    var first = table && table.querySelector("thead tr:first-child th[colspan='2']");
    if (first) first.textContent = String(sel.year - 1).slice(-2) + "\uB144";
  }
  function refreshDailyReceiptHistoryOnly() {
    if (!window.state || !Array.isArray(state.uploads)) return;
    var sel = selectedPeriod();
    var summary = buildSummary(sel);
    if (summary) state.summary = summary;
    var items = selectedWeekItems(sel);
    state.details = detailRows(items);
    if (typeof renderSummary === "function") renderSummary();
    if (typeof renderDetails === "function") renderDetails();
    renderDailyCards(items);
    patchPrevHeader(sel);
  }

  var previousRebuild = typeof rebuildFromSelection === "function" ? rebuildFromSelection : null;
  rebuildFromSelection = function () {
    var active = (typeof activeDashboardTab === "undefined") || activeDashboardTab === "daily";
    if (active && id("dailyYearSelect") && id("dailyMonthSelect") && id("dailyWeekSelect")) {
      refreshDailyReceiptHistoryOnly();
      return;
    }
    if (previousRebuild) return previousRebuild.apply(this, arguments);
  };

  window.addEventListener("change", function (event) {
    var target = event.target;
    if (!target || ["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) < 0) return;
    refreshDailyReceiptHistoryOnly();
    event.__allowDailyImmediateStopV13 = true;
    originalStopImmediate.call(event);
  }, true);

  window.__refreshDailyReceiptHistoryOnlyV13 = refreshDailyReceiptHistoryOnly;
  setTimeout(function () {
    try {
      if ((typeof activeDashboardTab === "undefined") || activeDashboardTab === "daily") refreshDailyReceiptHistoryOnly();
    } catch (err) {}
  }, 0);
})();

// final-daily-detail-receipt-history-mapping-20260703-v14
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  if (window.__dailyDetailReceiptHistoryMappingV14Applied) return;
  window.__dailyDetailReceiptHistoryMappingV14Applied = true;

  var previousStopImmediateV14 = Event.prototype.stopImmediatePropagation;
  Event.prototype.stopImmediatePropagation = function () {
    var target = this && this.target;
    if (target && ["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect", "detailDateSelect"].indexOf(target.id) >= 0 && !this.__allowImmediateStopV14) {
      return;
    }
    return previousStopImmediateV14.apply(this, arguments);
  };

  var CAT_PENDING = "\uC2DC\uACF5\uBBF8\uACB0";
  var CAT_COMPLAINT = "\uACE0\uAC1D\uBD88\uB9CC";
  var CAT_SENS = "\uAC10\uC131/\uCDE8\uAE09";
  var CAT_SUM = "\uACC4";
  var CAT_PPM = "PPM";
  var SOURCE_ORDER = ["1\uB77C\uC778", "3\uB77C\uC778", "4\uB77C\uC778", "7\uB77C\uC778"];
  var CATEGORY_ORDER = [CAT_PENDING, CAT_COMPLAINT, CAT_SENS];
  var cacheKey = "";
  var cacheRows = [];

  function el(id) { return document.getElementById(id); }
  function tx(value) { return String(value == null ? "" : value).trim(); }
  function raw(row) { return row && row.__raw ? row.__raw : row; }
  function cells(row) { var r = raw(row); return (r && r.__cells) || row.__cells || []; }
  function c(row, index) { return tx(cells(row)[index]); }
  function num(value) {
    if (typeof numeric === "function") return numeric(value);
    var parsed = Number(tx(value).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  function fmt(value) { return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR"); }
  function safe(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return tx(value).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; });
  }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    var m = tx(value).match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function stamp(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function dateLabel(date) {
    if (typeof formatDetailDateLabel === "function") return formatDetailDateLabel(date);
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }
  function headerValue(row, names) {
    var r = raw(row);
    if (!r) return "";
    try {
      if (typeof pick === "function") {
        var picked = tx(pick(r, names));
        if (picked) return picked;
      }
    } catch (err) {}
    var headers = r.__headers || Object.keys(r || {});
    for (var i = 0; i < headers.length; i += 1) {
      var normalized = tx(headers[i]).replace(/\s+/g, "");
      for (var j = 0; j < names.length; j += 1) {
        if (normalized === tx(names[j]).replace(/\s+/g, "")) return tx(r[headers[i]]);
      }
    }
    return "";
  }
  function receiptNumber(row) { return c(row, 3) || headerValue(row, ["\uC811\uC218\uBC88\uD638"]); }
  function rowDate(row) { return parseDate(c(row, 0) || headerValue(row, ["\uC811\uC218\uC77C\uC790", "\uC811\uC218\uC77C"])); }
  function isValid(row) {
    var d = rowDate(row);
    var no = receiptNumber(row);
    return !!(d && no && !/(\uC811\uC218\uBC88\uD638|\uC811\uC218\uC77C\uC790|NO|No|번호)/.test(no));
  }
  function category(row) {
    var pending = c(row, 13) || headerValue(row, ["\uBBF8\uACB0\uAD6C\uBD84", "\uC2DC\uACF5\uBBF8\uACB0"]);
    if (tx(pending) === "0") return CAT_PENDING;
    var type = c(row, 11) || headerValue(row, ["\uC720\uD615"]);
    if (/\uCDE8\uAE09|\uAC10\uC131/.test(type)) return CAT_SENS;
    return CAT_COMPLAINT;
  }
  function detailFromRow(item, index) {
    var row = item.row;
    return {
      number: num(c(row, 1)) || index + 1,
      category: category(row),
      type: c(row, 11) || headerValue(row, ["\uC720\uD615"]),
      brand: c(row, 2) || headerValue(row, ["\uAD6C\uBD84", "\uBE0C\uB79C\uB4DC"]),
      source: c(row, 9) || headerValue(row, ["\uC6D0\uC778\uCC98"]),
      code: c(row, 5) || headerValue(row, ["\uBD80\uD488\uCF54\uB4DC", "\uC81C\uD488\uCF54\uB4DC"]),
      color: c(row, 6) || headerValue(row, ["\uC0C9\uC0C1"]),
      lot: c(row, 7) || headerValue(row, ["\uC0DD\uC0B0\uB85C\uD2B8", "LOT NO"]) || ".",
      supplier: c(row, 8) || headerValue(row, ["\uACE0\uAC1D\uBA85", "\uACF5\uAE09"]),
      defect: c(row, 12) || headerValue(row, ["\uD558\uC790\uB0B4\uC5ED", "\uD558\uC790\uC0C1\uC138"]),
      amount: num(c(row, 17) || headerValue(row, ["\uD569\uACC4\uAE08\uC561", "\uD569\uACC4", "\uAE08\uC561"])),
      date: item.date
    };
  }
  function sourceRank(value) {
    var source = tx(value);
    for (var i = 0; i < SOURCE_ORDER.length; i += 1) {
      if (source.indexOf(SOURCE_ORDER[i]) >= 0) return i;
    }
    return 99;
  }
  function categoryRank(value) {
    var i = CATEGORY_ORDER.indexOf(value);
    return i >= 0 ? i : 99;
  }
  function compareDetails(a, b) {
    var ar = sourceRank(a.source), br = sourceRank(b.source);
    if (ar !== br) return ar - br;
    var ac = categoryRank(a.category), bc = categoryRank(b.category);
    if (ac !== bc) return ac - bc;
    return tx(a.source).localeCompare(tx(b.source), "ko", { numeric: true }) || Number(a.number || 0) - Number(b.number || 0) || tx(a.code).localeCompare(tx(b.code), "ko", { numeric: true });
  }
  function rebuildCache() {
    var entries = (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; });
    var key = entries.map(function (entry) { return [entry.id, (entry.rows || []).length, entry.selected ? 1 : 0].join(":"); }).join("|");
    if (key === cacheKey) return;
    cacheKey = key;
    cacheRows = [];
    entries.forEach(function (entry) {
      (entry.rows || []).forEach(function (row, index) {
        var r = raw(row);
        if (!isValid(r)) return;
        var d = rowDate(r);
        cacheRows.push({ entry: entry, row: r, index: index, date: d, stamp: stamp(d), year: d.getFullYear(), month: d.getMonth() + 1 });
      });
    });
  }
  function rowsFor(year, month) {
    rebuildCache();
    return cacheRows.filter(function (item) { return item.year === Number(year) && item.month === Number(month); });
  }
  function rowsForYear(year) {
    rebuildCache();
    return cacheRows.filter(function (item) { return item.year === Number(year); });
  }
  function selected() {
    var now = new Date();
    return {
      year: Number(el("dailyYearSelect") && el("dailyYearSelect").value) || now.getFullYear(),
      month: Number(el("dailyMonthSelect") && el("dailyMonthSelect").value) || now.getMonth() + 1,
      week: Number(el("dailyWeekSelect") && el("dailyWeekSelect").value) || 1
    };
  }
  function weeks(year, month) {
    if (typeof claimSummaryWeekGroups === "function") return claimSummaryWeekGroups(year, month) || [];
    var days = [];
    var last = new Date(year, month, 0).getDate();
    for (var d = 1; d <= last; d += 1) {
      var date = new Date(year, month - 1, d);
      if (date.getDay() !== 0 && date.getDay() !== 6) days.push(date);
    }
    return [days.slice(0, 5), days.slice(5, 10), days.slice(10, 15), days.slice(15, 22), days.slice(22)].filter(function (group) { return group.length; });
  }
  function weekDates(sel) { return weeks(sel.year, sel.month)[Math.max(0, sel.week - 1)] || []; }
  function endDate(sel) { var dates = weekDates(sel); return dates.length ? dates[dates.length - 1] : new Date(sel.year, sel.month - 1, 1); }
  function mainNumber(value) { return Number((String(value == null ? "" : value).match(/^-?\d+/) || [value || 0])[0]) || 0; }
  function targetCell(main, target, show) { return show ? String(main || 0) + "(" + target + ")" : "(" + target + ")"; }
  function addCount(bucket, item, key) {
    var cat = category(item.row);
    if (bucket[cat]) bucket[cat][key] = (Number(bucket[cat][key]) || 0) + 1;
  }
  function prevStats(year) {
    var stats = {};
    CATEGORY_ORDER.forEach(function (cat) { stats[cat] = { total: 0, avg: 0, months: {} }; });
    rowsForYear(year).forEach(function (item) {
      var cat = category(item.row);
      if (!stats[cat]) return;
      stats[cat].months[item.month] = (stats[cat].months[item.month] || 0) + 1;
    });
    Object.keys(stats).forEach(function (cat) {
      var values = Object.keys(stats[cat].months).map(function (m) { return stats[cat].months[m]; });
      stats[cat].total = values.reduce(function (sum, value) { return sum + value; }, 0);
      stats[cat].avg = values.length ? Math.round(stats[cat].total / values.length) : 0;
    });
    return stats;
  }
  function buildSummary(sel) {
    var end = endDate(sel);
    var meta = typeof buildClaimSummaryMeta === "function" ? buildClaimSummaryMeta(end) : null;
    if (!meta) return null;
    state.summaryMeta = meta;
    var keys = typeof summaryDynamicKeys === "function" ? summaryDynamicKeys(meta) : [];
    var prev = prevStats(sel.year - 1);
    var rows = CATEGORY_ORDER.map(function (cat) {
      var stat = prev[cat] || { total: 0, avg: 0 };
      var row = { category: cat, prevTotal: stat.total || 0, prevAvg: stat.avg || 0 };
      keys.forEach(function (key) { if (!(key in row)) row[key] = 0; });
      return row;
    });
    var byCat = {};
    rows.forEach(function (row) { byCat[row.category] = row; });
    for (var m = 1; m < meta.currentMonth; m += 1) rowsFor(sel.year, m).forEach(function (item) { addCount(byCat, item, "m" + m); });
    var endStamp = stamp(end);
    rowsFor(sel.year, meta.currentMonth).filter(function (item) { return item.stamp <= endStamp; }).forEach(function (item) {
      var row = byCat[category(item.row)];
      if (!row) return;
      var preIndex = meta.preWeeks.findIndex(function (week) { return (week.dates || []).some(function (date) { return stamp(date) === item.stamp; }); });
      if (preIndex >= 0) row[meta.preWeeks[preIndex].key] = (Number(row[meta.preWeeks[preIndex].key]) || 0) + 1;
      var day = meta.dayColumns.find(function (col) { return stamp(col.date) === item.stamp; });
      if (day) row[day.key] = (Number(row[day.key]) || 0) + 1;
      row[meta.monthTotalKey] = (Number(row[meta.monthTotalKey]) || 0) + 1;
    });
    rows.forEach(function (row) {
      var targets = row.category === CAT_COMPLAINT ? { daily: 3, month: 50, future: 50, total: 600, avg: 50 } : { daily: 0, month: 0, future: 0, total: 0, avg: 0 };
      meta.dayColumns.forEach(function (col) {
        var main = Number(row[col.key] || 0);
        row[col.key] = targetCell(main, targets.daily, main > 0 || stamp(col.date) <= endStamp);
      });
      row[meta.monthTotalKey] = targetCell(Number(row[meta.monthTotalKey] || 0), targets.month, true);
      meta.postMonths.forEach(function (month) { row["m" + month] = targetCell(0, targets.future, false); });
      var total = 0, active = 0;
      for (var mm = 1; mm <= 12; mm += 1) {
        var key = mm === meta.currentMonth ? meta.monthTotalKey : "m" + mm;
        var value = mainNumber(row[key]);
        total += value;
        if (value > 0) active += 1;
      }
      row.total = targetCell(total, targets.total, true);
      row.avg = targetCell(active ? Math.round(total / active) : 0, targets.avg, true);
    });
    var sum = { category: CAT_SUM, prevTotal: rows.reduce(function (s, row) { return s + Number(row.prevTotal || 0); }, 0), prevAvg: rows.reduce(function (s, row) { return s + Number(row.prevAvg || 0); }, 0) };
    keys.forEach(function (key) {
      if (key === "prevTotal" || key === "prevAvg") return;
      var main = rows.reduce(function (s, row) { return s + mainNumber(row[key]); }, 0);
      if (meta.dayColumns.some(function (col) { return col.key === key; })) sum[key] = targetCell(main, 3, true);
      else if (key === meta.monthTotalKey) sum[key] = targetCell(main, 50, true);
      else if (/^m\d+/.test(key) && meta.postMonths.some(function (month) { return key === "m" + month; })) sum[key] = targetCell(0, 50, false);
      else sum[key] = main;
    });
    var totalMain = 0, activeMonths = 0;
    for (var sm = 1; sm <= 12; sm += 1) {
      var sk = sm === meta.currentMonth ? meta.monthTotalKey : "m" + sm;
      var sv = mainNumber(sum[sk]);
      totalMain += sv;
      if (sv > 0) activeMonths += 1;
    }
    sum.total = targetCell(totalMain, 600, true);
    sum.avg = targetCell(activeMonths ? Math.round(totalMain / activeMonths) : 0, 50, true);
    var ppm = (state.summary || []).find(function (row) { return row.category === CAT_PPM; }) || { category: CAT_PPM, prevTotal: 1011, prevAvg: "", m1: 865, m2: 955, m3: 1139, m4: 1325, m5: 964, m6: 903, m6Total: 903, avg: 1037 };
    return rows.concat([sum, ppm]);
  }
  function weekItems(sel) {
    var dateSet = new Set(weekDates(sel).map(stamp));
    return rowsFor(sel.year, sel.month).filter(function (item) { return dateSet.has(item.stamp); });
  }
  function setDetailOptions(items) {
    var map = new Map();
    items.forEach(function (item) { map.set(String(item.stamp), item.date); });
    detailDateOptions = Array.from(map.entries()).map(function (pair) { return { value: pair[0], label: dateLabel(pair[1]) }; }).sort(function (a, b) { return Number(a.value) - Number(b.value); });
    if (!detailDateOptions.length) {
      selectedDetailDate = "";
      return [];
    }
    if (!selectedDetailDate || !detailDateOptions.some(function (option) { return option.value === selectedDetailDate; })) {
      selectedDetailDate = detailDateOptions[detailDateOptions.length - 1].value;
    }
    return items.filter(function (item) { return String(item.stamp) === selectedDetailDate; });
  }
  function renderCards(items) {
    var box = el("dailyReceiptCards");
    if (!box) return;
    var loss = items.reduce(function (sum, item) { return sum + num(c(item.row, 17)); }, 0);
    var pending = items.filter(function (item) { return category(item.row) === CAT_PENDING; });
    var basis = pending.length ? pending : items.slice().sort(function (a, b) { return num(c(b.row, 17)) - num(c(a.row, 17)); }).slice(0, 1);
    var map = new Map();
    basis.forEach(function (item) {
      var label = [c(item.row, 5), c(item.row, 6)].filter(Boolean).join(" / ");
      if (label) map.set(label, (map.get(label) || 0) + 1);
    });
    var top = Array.from(map.entries()).map(function (pair) { return { label: pair[0], count: pair[1] }; }).sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); }).slice(0, 5);
    var first = top[0] || { label: "-", count: 0 };
    box.innerHTML = '<article class="daily-receipt-card"><span>\uC811\uC218\uAC74\uC218</span><strong>' + fmt(items.length) + '</strong><em>\uAC74</em><small>3. \uC811\uC218\uB0B4\uC5ED(\uB204\uC801\uB370\uC774\uD130) \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC190\uC2E4\uAE08\uC561</span><strong>' + fmt(loss) + '</strong><em>\uC6D0</em><small>R\uC5F4 \uD569\uACC4 \uAE08\uC561 \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="purple">' + safe(first.label) + '</strong><em>' + fmt(first.count) + '\uAC74</em><small>' + (pending.length ? '\uC2DC\uACF5\uBBF8\uACB0 \uD488\uBAA9 TOP 5' : '\uC190\uC2E4\uAE08\uC561 \uC0C1\uC704 \uD488\uBAA9') + '</small><div class="daily-receipt-tags">' + top.map(function (item) { return '<span>' + safe(item.label) + ' ' + fmt(item.count) + '\uAC74</span>'; }).join("") + '</div></article>';
  }
  function patchHeader(sel) {
    var table = el("summaryTable");
    var first = table && table.querySelector("thead tr:first-child th[colspan='2']");
    if (first) first.textContent = String(sel.year - 1).slice(-2) + "\uB144";
  }
  function refreshDailyFromHistoryOnly() {
    if (!window.state || !Array.isArray(state.uploads)) return;
    var sel = selected();
    var summary = buildSummary(sel);
    if (summary) state.summary = summary;
    var items = weekItems(sel);
    var selectedItems = setDetailOptions(items);
    state.details = selectedItems.map(detailFromRow).sort(compareDetails);
    if (typeof renderSummary === "function") renderSummary();
    if (typeof renderDetails === "function") renderDetails();
    renderCards(items);
    patchHeader(sel);
  }
  function hideMonthlyReceiptInput() {
    var input = el("receiptDataLink");
    if (!input) return;
    var label = input.closest("label");
    if (label) label.style.display = "none";
    var load = el("loadReceiptData");
    var clear = el("clearReceiptDataLink");
    if (load) load.style.display = "none";
    if (clear) clear.style.display = "none";
  }
  var oldRenderLinked = typeof renderLinkedDataList === "function" ? renderLinkedDataList : null;
  if (oldRenderLinked) {
    renderLinkedDataList = function () {
      var holder = el("linkedDataList");
      if (!holder || typeof allLinkedDisplayGroups !== "function") return oldRenderLinked.apply(this, arguments);
      var groups = allLinkedDisplayGroups().filter(function (group) { return !group.items.some(function (entry) { return entry.kind === "summary"; }); });
      if (!groups.length) {
        holder.innerHTML = '<div class="linked-empty">\uC5F0\uACB0\uB41C \uB9C1\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
        return;
      }
      holder.innerHTML = groups.map(function (group) {
        var first = group.items.find(function (entry) { return entry.sourceUrl; }) || {};
        var title = typeof linkedGroupDisplayTitle === "function" ? linkedGroupDisplayTitle(group) : (group.title || first.groupTitle || first.label || "");
        return '<div class="linked-row" title="' + safe(first.sourceUrl || "") + '"><div><strong>' + safe(title) + '</strong></div><button type="button" onclick="window.open(\'' + safe(first.sourceUrl || "") + '\', \'_blank\')">\uB9C1\uD06C \uC5F4\uAE30</button><button type="button" onclick="deleteLinkedGroup(\'' + safe(group.key) + '\')">\uC0AD\uC81C</button></div>';
      }).join("");
    };
  }

  var previousRebuild = typeof rebuildFromSelection === "function" ? rebuildFromSelection : null;
  rebuildFromSelection = function () {
    var active = (typeof activeDashboardTab === "undefined") || activeDashboardTab === "daily";
    if (active && el("dailyYearSelect") && el("dailyMonthSelect") && el("dailyWeekSelect")) {
      refreshDailyFromHistoryOnly();
      return;
    }
    if (previousRebuild) return previousRebuild.apply(this, arguments);
  };
  window.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect", "detailDateSelect"].indexOf(target.id) >= 0) {
      refreshDailyFromHistoryOnly();
      event.__allowImmediateStopV14 = true;
      previousStopImmediateV14.call(event);
    }
  }, true);
  window.__refreshDailyReceiptHistoryMappingV14 = refreshDailyFromHistoryOnly;
  setTimeout(function () {
    hideMonthlyReceiptInput();
    if (typeof renderLinkedDataList === "function") renderLinkedDataList();
    try {
      if ((typeof activeDashboardTab === "undefined") || activeDashboardTab === "daily") refreshDailyFromHistoryOnly();
    } catch (err) {}
  }, 0);
})();

// final-linked-list-visible-safe-20260703-v15
(function () {
  if (window.__linkedListVisibleSafeV15Applied) return;
  window.__linkedListVisibleSafeV15Applied = true;

  function byId(id) { return document.getElementById(id); }
  function t(value) { return String(value == null ? "" : value).trim(); }
  function esc(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return t(value).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; });
  }
  function hideMonthlyReceiptInputV15() {
    var input = byId("receiptDataLink");
    if (!input) return;
    var label = input.closest("label");
    if (label) label.style.display = "none";
    ["loadReceiptData", "clearReceiptDataLink"].forEach(function (id) {
      var button = byId(id);
      if (button) button.style.display = "none";
    });
  }
  function displayTitle(group) {
    if (typeof linkedGroupDisplayTitle === "function") return linkedGroupDisplayTitle(group);
    return group.title || (group.items && group.items[0] && (group.items[0].groupTitle || group.items[0].label)) || "";
  }
  function kindText(group) {
    var item = group.items && group.items[0];
    if (!item) return "";
    if (item.kind === "defect") return "\uAE30\uC874\uB370\uC774\uD130";
    if (item.kind === "receiptHistory") return "\uC811\uC218\uB0B4\uC5ED (\uB204\uC801\uB370\uC774\uD130)";
    if (item.kind === "monthlyStatus") return "\uC6D4\uAC04\uD604\uD669 \uC790\uB8CC";
    return item.kind || "";
  }
  function sourceUrl(group) {
    var item = (group.items || []).find(function (entry) { return entry.sourceUrl; }) || {};
    return item.sourceUrl || group.sourceUrl || "";
  }
  function renderLinkedListV15() {
    var holder = byId("linkedDataList");
    if (!holder || typeof allLinkedDisplayGroups !== "function") return;
    hideMonthlyReceiptInputV15();
    var groups = allLinkedDisplayGroups().filter(function (group) {
      return !(group.items || []).some(function (entry) { return entry.kind === "summary"; });
    });
    if (!groups.length) {
      holder.innerHTML = '<div class="linked-empty">\uC800\uC7A5\uB41C \uB9C1\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
      return;
    }
    holder.innerHTML = groups.map(function (group) {
      var url = sourceUrl(group);
      return '<div class="linked-row linked-row-v15" title="' + esc(url) + '">' +
        '<div class="linked-main-v15"><strong>' + esc(displayTitle(group)) + '</strong><span>' + esc(kindText(group)) + '</span></div>' +
        '<div class="linked-actions-v15">' +
          '<button type="button" data-link-delete-key="' + esc(group.key) + '">\uC0AD\uC81C</button>' +
        '</div>' +
      '</div>';
    }).join("");
    holder.querySelectorAll("[data-link-delete-key]").forEach(function (button) {
      button.addEventListener("click", function () {
        var key = button.getAttribute("data-link-delete-key");
        if (key && typeof deleteLinkedGroup === "function") deleteLinkedGroup(key);
      });
    });
  }
  function ensureStyleV15() {
    if (byId("linkedListVisibleSafeV15Style")) return;
    var style = document.createElement("style");
    style.id = "linkedListVisibleSafeV15Style";
    style.textContent = '.linked-row-v15{grid-template-columns:1fr auto!important}.linked-actions-v15{display:flex;gap:8px;align-items:center}.linked-actions-v15 button{min-width:76px;min-height:34px;padding:0 12px;white-space:nowrap}.linked-main-v15 span{display:block;margin-top:4px;color:#475569;font-size:12px}.linked-main-v15 strong{display:block}';
    document.head.appendChild(style);
  }
  var oldRender = typeof renderLinkedDataList === "function" ? renderLinkedDataList : null;
  renderLinkedDataList = function () {
    ensureStyleV15();
    renderLinkedListV15();
  };
  setTimeout(function () {
    ensureStyleV15();
    hideMonthlyReceiptInputV15();
    renderLinkedListV15();
  }, 0);
})();

// final-daily-detail-month-options-popup-20260703-v16
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  if (window.__dailyDetailMonthOptionsPopupV16Applied) return;
  window.__dailyDetailMonthOptionsPopupV16Applied = true;

  var CAT_PENDING = "\uC2DC\uACF5\uBBF8\uACB0";
  var CAT_COMPLAINT = "\uACE0\uAC1D\uBD88\uB9CC";
  var CAT_SENS = "\uAC10\uC131/\uCDE8\uAE09";
  var SOURCE_ORDER = ["1\uB77C\uC778", "3\uB77C\uC778", "4\uB77C\uC778", "7\uB77C\uC778"];
  var CATEGORY_ORDER = [CAT_PENDING, CAT_COMPLAINT, CAT_SENS];
  var cacheKey = "";
  var cacheRows = [];
  var lastDetailSelectValue = "";

  function el(id) { return document.getElementById(id); }
  function tx(value) { return String(value == null ? "" : value).trim(); }
  function raw(row) { return row && row.__raw ? row.__raw : row; }
  function cells(row) { var r = raw(row); return (r && r.__cells) || row.__cells || []; }
  function c(row, index) { return tx(cells(row)[index]); }
  function n(value) {
    if (typeof numeric === "function") return numeric(value);
    var parsed = Number(tx(value).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  function fmt(value) { return typeof formatNumber === "function" ? formatNumber(value) : Number(value || 0).toLocaleString("ko-KR"); }
  function h(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return tx(value).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; });
  }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    var m = tx(value).match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function stamp(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function formatDate(date) { return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"); }
  function headerValue(row, names) {
    var r = raw(row);
    if (!r) return "";
    try {
      if (typeof pick === "function") {
        var picked = tx(pick(r, names));
        if (picked) return picked;
      }
    } catch (err) {}
    var headers = r.__headers || Object.keys(r || {});
    for (var i = 0; i < headers.length; i += 1) {
      var key = tx(headers[i]).replace(/\s+/g, "");
      for (var j = 0; j < names.length; j += 1) {
        if (key === tx(names[j]).replace(/\s+/g, "")) return tx(r[headers[i]]);
      }
    }
    return "";
  }
  function rowDate(row) { return parseDate(c(row, 0) || headerValue(row, ["\uC811\uC218\uC77C\uC790", "\uC811\uC218\uC77C"])); }
  function receiptNo(row) { return c(row, 3) || headerValue(row, ["\uC811\uC218\uBC88\uD638"]); }
  function valid(row) {
    var date = rowDate(row);
    var no = receiptNo(row);
    return !!(date && no && !/(\uC811\uC218\uBC88\uD638|\uC811\uC218\uC77C\uC790|NO|No|번호)/.test(no));
  }
  function category(row) {
    var pending = c(row, 13) || headerValue(row, ["\uBBF8\uACB0\uAD6C\uBD84", "\uC2DC\uACF5\uBBF8\uACB0"]);
    if (tx(pending) === "0") return CAT_PENDING;
    var type = c(row, 11) || headerValue(row, ["\uC720\uD615"]);
    if (/\uCDE8\uAE09|\uAC10\uC131/.test(type)) return CAT_SENS;
    return CAT_COMPLAINT;
  }
  function sourceRank(value) {
    var source = tx(value);
    for (var i = 0; i < SOURCE_ORDER.length; i += 1) if (source.indexOf(SOURCE_ORDER[i]) >= 0) return i;
    return 99;
  }
  function categoryRank(value) {
    var rank = CATEGORY_ORDER.indexOf(value);
    return rank >= 0 ? rank : 99;
  }
  function detail(item, index) {
    var row = item.row;
    return {
      number: n(c(row, 1)) || index + 1,
      category: category(row),
      type: c(row, 11) || headerValue(row, ["\uC720\uD615"]),
      brand: c(row, 2) || headerValue(row, ["\uAD6C\uBD84", "\uBE0C\uB79C\uB4DC"]),
      source: c(row, 9) || headerValue(row, ["\uC6D0\uC778\uCC98"]),
      code: c(row, 5) || headerValue(row, ["\uBD80\uD488\uCF54\uB4DC", "\uC81C\uD488\uCF54\uB4DC"]),
      color: c(row, 6) || headerValue(row, ["\uC0C9\uC0C1"]),
      lot: c(row, 7) || headerValue(row, ["\uC0DD\uC0B0\uB85C\uD2B8", "LOT NO"]) || ".",
      supplier: c(row, 8) || headerValue(row, ["\uACE0\uAC1D\uBA85", "\uACF5\uAE09"]),
      defect: c(row, 12) || headerValue(row, ["\uD558\uC790\uB0B4\uC5ED", "\uD558\uC790\uC0C1\uC138"]),
      amount: n(c(row, 17) || headerValue(row, ["\uD569\uACC4\uAE08\uC561", "\uD569\uACC4", "\uAE08\uC561"])),
      date: item.date,
      stamp: item.stamp,
      raw: row
    };
  }
  function compare(a, b) {
    return sourceRank(a.source) - sourceRank(b.source) || categoryRank(a.category) - categoryRank(b.category) || tx(a.source).localeCompare(tx(b.source), "ko", { numeric: true }) || Number(a.number || 0) - Number(b.number || 0) || tx(a.code).localeCompare(tx(b.code), "ko", { numeric: true });
  }
  function rebuild() {
    var entries = (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; });
    var key = entries.map(function (entry) { return [entry.id, (entry.rows || []).length, entry.selected ? 1 : 0].join(":"); }).join("|");
    if (key === cacheKey) return;
    cacheKey = key;
    cacheRows = [];
    entries.forEach(function (entry) {
      (entry.rows || []).forEach(function (row, index) {
        var r = raw(row);
        if (!valid(r)) return;
        var date = rowDate(r);
        cacheRows.push({ entry: entry, row: r, index: index, date: date, stamp: stamp(date), year: date.getFullYear(), month: date.getMonth() + 1 });
      });
    });
  }
  function selected() {
    var now = new Date();
    return {
      year: Number(el("dailyYearSelect") && el("dailyYearSelect").value) || now.getFullYear(),
      month: Number(el("dailyMonthSelect") && el("dailyMonthSelect").value) || now.getMonth() + 1,
      week: Number(el("dailyWeekSelect") && el("dailyWeekSelect").value) || 1
    };
  }
  function monthItems(sel) {
    rebuild();
    return cacheRows.filter(function (item) { return item.year === Number(sel.year) && item.month === Number(sel.month); });
  }
  function weekGroups(year, month) {
    if (typeof claimSummaryWeekGroups === "function") return claimSummaryWeekGroups(year, month) || [];
    var weekdays = [];
    var last = new Date(year, month, 0).getDate();
    for (var d = 1; d <= last; d += 1) {
      var date = new Date(year, month - 1, d);
      if (date.getDay() !== 0 && date.getDay() !== 6) weekdays.push(date);
    }
    return [weekdays.slice(0, 5), weekdays.slice(5, 10), weekdays.slice(10, 15), weekdays.slice(15, 22), weekdays.slice(22)].filter(function (group) { return group.length; });
  }
  function weekStampSet(sel) {
    var group = weekGroups(sel.year, sel.month)[Math.max(0, sel.week - 1)] || [];
    return new Set(group.map(stamp));
  }
  function currentRowsForPopup() {
    var sel = selected();
    var month = monthItems(sel).map(detail).sort(compare);
    var selectedStamp = Number(selectedDetailDate || (el("detailDateSelect") && el("detailDateSelect").value) || 0);
    var day = month.filter(function (row) { return row.stamp === selectedStamp; });
    return { sel: sel, monthRows: month, dayRows: day, selectedStamp: selectedStamp };
  }
  function applyDetails(useCurrentSelectValue) {
    if (!window.state || !Array.isArray(state.uploads)) return;
    var sel = selected();
    var all = monthItems(sel);
    var dateMap = new Map();
    all.forEach(function (item) { dateMap.set(String(item.stamp), item.date); });
    detailDateOptions = Array.from(dateMap.entries()).map(function (pair) { return { value: pair[0], label: formatDate(pair[1]) }; }).sort(function (a, b) { return Number(a.value) - Number(b.value); });
    var weekSet = weekStampSet(sel);
    var latestInWeek = all.filter(function (item) { return weekSet.has(item.stamp); }).sort(function (a, b) { return a.stamp - b.stamp; }).pop();
    var select = el("detailDateSelect");
    var desired = useCurrentSelectValue && select && select.value ? select.value : "";
    if (!desired || !detailDateOptions.some(function (option) { return option.value === desired; })) {
      desired = latestInWeek ? String(latestInWeek.stamp) : (detailDateOptions.length ? detailDateOptions[detailDateOptions.length - 1].value : "");
    }
    selectedDetailDate = desired;
    lastDetailSelectValue = desired;
    var rows = all.filter(function (item) { return String(item.stamp) === selectedDetailDate; }).map(detail).sort(compare);
    state.details = rows;
    if (typeof renderDetails === "function") renderDetails();
    var renderedSelect = el("detailDateSelect");
    if (renderedSelect && desired) renderedSelect.value = desired;
  }
  function rowForExport(row) {
    return {
      "\uC77C\uC790": row.date ? formatDate(row.date) : "",
      "\uAD6C\uBD84": row.category,
      "\uC720\uD615": row.type,
      "\uBE0C\uB79C\uB4DC": row.brand,
      "\uC6D0\uC778\uCC98": row.source,
      "\uC81C\uD488\uCF54\uB4DC": row.code,
      "\uC0C9\uC0C1": row.color,
      "LOT NO": row.lot,
      "\uACF5\uAE09": row.supplier,
      "\uD558\uC790\uB0B4\uC5ED": row.defect,
      "\uAE08\uC561": row.amount
    };
  }
  function downloadRows(fileName, rows) {
    var out = rows.map(rowForExport);
    if (window.XLSX) {
      var ws = XLSX.utils.json_to_sheet(out);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "\uC138\uBD80\uB0B4\uC5ED");
      XLSX.writeFile(wb, fileName);
      return;
    }
    if (typeof downloadText === "function" && typeof toCsv === "function") downloadText(fileName.replace(/\.xlsx$/i, ".csv"), toCsv(out), "text/csv;charset=utf-8");
  }
  window.downloadDailyDetailMonthExcelV16 = function () {
    var data = currentRowsForPopup();
    downloadRows("\uC6D4\uB370\uC774\uD130_" + data.sel.year + "-" + String(data.sel.month).padStart(2, "0") + ".xlsx", data.monthRows);
  };
  window.downloadDailyDetailDayExcelV16 = function () {
    var data = currentRowsForPopup();
    downloadRows("\uC77C\uC77C\uB370\uC774\uD130_" + (String(data.selectedStamp) || "selected") + ".xlsx", data.dayRows);
  };
  function openPopup() {
    applyDetails(true);
    var data = currentRowsForPopup();
    var selectedDate = data.dayRows[0] && data.dayRows[0].date ? formatDate(data.dayRows[0].date) : "";
    var rows = data.dayRows.length ? data.dayRows : data.monthRows;
    var bodyRows = rows.map(function (row, index) {
      return '<tr><td>' + (index + 1) + '</td><td>' + h(row.date ? formatDate(row.date) : "") + '</td><td>' + h(row.category) + '</td><td>' + h(row.type) + '</td><td>' + h(row.brand) + '</td><td>' + h(row.source) + '</td><td>' + h(row.code) + '</td><td>' + h(row.color) + '</td><td>' + h(row.lot) + '</td><td>' + h(row.supplier) + '</td><td class="left">' + h(row.defect) + '</td><td>' + fmt(row.amount) + '</td></tr>';
    }).join("");
    var popup = window.open("", "dailyDetailListV16", "width=1280,height=760,scrollbars=yes,resizable=yes");
    if (!popup) return;
    popup.document.open();
    popup.document.write('<!doctype html><html><head><meta charset="UTF-8"><title>\uACE0\uAC1D\uD074\uB808\uC784 \uC811\uC218 \uC138\uBD80\uB0B4\uC5ED</title><style>body{font-family:Malgun Gothic,Segoe UI,Arial,sans-serif;margin:18px;color:#0f172a}h1{font-size:22px;margin:0 0 8px}.toolbar{display:flex;gap:8px;margin:12px 0 14px}button{height:34px;padding:0 12px;border:1px solid #b9c7d8;border-radius:6px;background:#fff;font-weight:800;cursor:pointer}table{width:100%;border-collapse:collapse;font-size:13px}th,td{border:1px solid #d9e2ec;padding:8px;text-align:center;vertical-align:middle}th{background:#eef1f4;font-weight:900}.left{text-align:left;white-space:pre-wrap}.meta{color:#475569;font-size:13px}</style></head><body><h1>\uACE0\uAC1D\uD074\uB808\uC784 \uC811\uC218 \uC138\uBD80\uB0B4\uC5ED</h1><div class="meta">' + h(data.sel.year + '\uB144 ' + data.sel.month + '\uC6D4' + (selectedDate ? ' / ' + selectedDate : '')) + ' · \uD45C\uC2DC ' + fmt(rows.length) + '\uAC74</div><div class="toolbar"><button onclick="window.opener&&window.opener.downloadDailyDetailMonthExcelV16()">\uC6D4\uB370\uC774\uD130 \uC5D1\uC140 \uB2E4\uC6B4\uB85C\uB4DC</button><button onclick="window.opener&&window.opener.downloadDailyDetailDayExcelV16()">\uC77C\uC77C\uB370\uC774\uD130 \uC5D1\uC140 \uB2E4\uC6B4\uB85C\uB4DC</button></div><table><thead><tr><th>No</th><th>\uC77C\uC790</th><th>\uAD6C\uBD84</th><th>\uC720\uD615</th><th>\uBE0C\uB79C\uB4DC</th><th>\uC6D0\uC778\uCC98</th><th>\uC81C\uD488\uCF54\uB4DC</th><th>\uC0C9\uC0C1</th><th>LOT NO</th><th>\uACF5\uAE09</th><th>\uD558\uC790\uB0B4\uC5ED</th><th>\uAE08\uC561</th></tr></thead><tbody>' + (bodyRows || '<tr><td colspan="12">\uD45C\uC2DC\uD560 \uC790\uB8CC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>') + '</tbody></table></body></html>');
    popup.document.close();
    attachEscToClose(popup);
  }
  function bindTable() {
    var table = el("detailTable");
    if (!table || table.__dailyDetailDblClickV16) return;
    table.__dailyDetailDblClickV16 = true;
    table.addEventListener("dblclick", openPopup);
  }
  window.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) >= 0) setTimeout(function () { applyDetails(false); bindTable(); }, 0);
    if (target.id === "detailDateSelect") setTimeout(function () { selectedDetailDate = target.value; applyDetails(true); bindTable(); }, 0);
  }, true);
  setInterval(function () {
    var select = el("detailDateSelect");
    if (!select) return;
    if (select.value && select.value !== lastDetailSelectValue) {
      selectedDetailDate = select.value;
      applyDetails(true);
    }
    bindTable();
  }, 350);
  setTimeout(function () { applyDetails(false); bindTable(); }, 80);
  window.__refreshDailyDetailMonthOptionsV16 = applyDetails;
})();

// final-auto-reload-and-daily-date-detail-v17-20260703
(function () {
  "use strict";
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  if (window.__finalAutoReloadDailyDateDetailV17) return;
  window.__finalAutoReloadDailyDateDetailV17 = true;

  var CAT_PENDING = "시공미결";
  var CAT_COMPLAINT = "고객불만";
  var CAT_SENS = "감성/취급";
  var SOURCE_ORDER = ["1라인", "3라인", "4라인", "7라인"];
  var CATEGORY_ORDER = [CAT_PENDING, CAT_COMPLAINT, CAT_SENS];
  var lastPeriodKey = "";
  var lastSelectValue = "";
  var cacheKey = "";
  var cacheRows = [];

  function byId(id) { return document.getElementById(id); }
  function text(value) { return value == null ? "" : String(value).trim(); }
  function num(value) { return Number(String(value == null ? "" : value).replace(/[^0-9.-]/g, "")) || 0; }
  function escape(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return text(value).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; });
  }
  function formatNumber(value) {
    if (typeof formatNumberValue === "function") return formatNumberValue(value);
    return Number(value || 0).toLocaleString("ko-KR");
  }
  function raw(row) {
    if (!row) return row;
    if (Array.isArray(row)) return row;
    if (Array.isArray(row.__raw)) return row.__raw;
    if (Array.isArray(row.raw)) return row.raw;
    return row;
  }
  function toArray(row) {
    var r = raw(row);
    if (Array.isArray(r)) return r;
    if (!r || typeof r !== "object") return [];
    if (Array.isArray(r.__values)) return r.__values;
    if (Array.isArray(r.__headers)) return r.__headers.map(function (key) { return r[key]; });
    return Object.keys(r).filter(function (key) { return key.indexOf("__") !== 0; }).map(function (key) { return r[key]; });
  }
  function cell(row, index) { return text(toArray(row)[index]); }
  function pickHeader(row, names) {
    var r = raw(row);
    if (!r || typeof r !== "object" || Array.isArray(r)) return "";
    if (typeof pick === "function") {
      try {
        var picked = text(pick(r, names));
        if (picked) return picked;
      } catch (err) {}
    }
    var headers = r.__headers || Object.keys(r);
    for (var i = 0; i < headers.length; i += 1) {
      var cleanKey = text(headers[i]).replace(/\s+/g, "");
      for (var j = 0; j < names.length; j += 1) {
        if (cleanKey === text(names[j]).replace(/\s+/g, "")) return text(r[headers[i]]);
      }
    }
    return "";
  }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    var s = text(value);
    var m = s.match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function stamp(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function formatDate(date) { return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"); }
  function rowDate(row) { return parseDate(cell(row, 0) || pickHeader(row, ["접수일자", "접수일"])); }
  function receiptNo(row) { return cell(row, 3) || pickHeader(row, ["접수번호"]); }
  function validReceiptRow(row) {
    var date = rowDate(row);
    var no = receiptNo(row);
    return !!(date && no && !/(접수번호|접수일자|번호|NO|No)/i.test(no));
  }
  function category(row) {
    var pending = cell(row, 13) || pickHeader(row, ["미결구분", "시공미결"]);
    if (text(pending) === "0") return CAT_PENDING;
    var type = cell(row, 11) || pickHeader(row, ["유형"]);
    if (/취급|감성/.test(type)) return CAT_SENS;
    return CAT_COMPLAINT;
  }
  function sourceRank(value) {
    var source = text(value);
    for (var i = 0; i < SOURCE_ORDER.length; i += 1) if (source.indexOf(SOURCE_ORDER[i]) >= 0) return i;
    return 99;
  }
  function categoryRank(value) {
    var idx = CATEGORY_ORDER.indexOf(value);
    return idx >= 0 ? idx : 99;
  }
  function makeDetail(item, index) {
    var row = item.row;
    return {
      number: num(cell(row, 1)) || index + 1,
      category: category(row),
      type: cell(row, 11) || pickHeader(row, ["유형"]),
      brand: cell(row, 2) || pickHeader(row, ["구분", "브랜드"]),
      source: cell(row, 9) || pickHeader(row, ["원인처"]),
      code: cell(row, 5) || pickHeader(row, ["부품코드", "제품코드"]),
      color: cell(row, 6) || pickHeader(row, ["색상"]),
      lot: cell(row, 7) || pickHeader(row, ["생산로트", "LOT NO"]) || ".",
      supplier: cell(row, 8) || pickHeader(row, ["고객명", "공급"]),
      defect: cell(row, 12) || pickHeader(row, ["하자내역", "하자상세"]),
      amount: num(cell(row, 17) || pickHeader(row, ["합계금액", "합계", "금액"])),
      date: item.date,
      stamp: item.stamp,
      raw: row
    };
  }
  function compareDetails(a, b) {
    return sourceRank(a.source) - sourceRank(b.source) ||
      categoryRank(a.category) - categoryRank(b.category) ||
      text(a.source).localeCompare(text(b.source), "ko", { numeric: true }) ||
      Number(a.number || 0) - Number(b.number || 0) ||
      text(a.code).localeCompare(text(b.code), "ko", { numeric: true });
  }
  function rebuildCache() {
    if (!window.state || !Array.isArray(state.uploads)) return;
    var entries = state.uploads.filter(function (entry) { return entry.kind === "receiptHistory"; });
    var key = entries.map(function (entry) { return [entry.id, (entry.rows || []).length, entry.selected ? 1 : 0].join(":"); }).join("|");
    if (key === cacheKey) return;
    cacheKey = key;
    cacheRows = [];
    entries.forEach(function (entry) {
      (entry.rows || []).forEach(function (row, index) {
        var r = raw(row);
        if (!validReceiptRow(r)) return;
        var date = rowDate(r);
        cacheRows.push({ entry: entry, row: r, index: index, date: date, stamp: stamp(date), year: date.getFullYear(), month: date.getMonth() + 1 });
      });
    });
  }
  function selectedPeriod() {
    var now = new Date();
    return {
      year: Number(byId("dailyYearSelect") && byId("dailyYearSelect").value) || now.getFullYear(),
      month: Number(byId("dailyMonthSelect") && byId("dailyMonthSelect").value) || now.getMonth() + 1,
      week: Number(byId("dailyWeekSelect") && byId("dailyWeekSelect").value) || 1
    };
  }
  function weekGroups(year, month) {
    if (typeof claimSummaryWeekGroups === "function") return claimSummaryWeekGroups(year, month) || [];
    var weekdays = [];
    var last = new Date(year, month, 0).getDate();
    for (var day = 1; day <= last; day += 1) {
      var date = new Date(year, month - 1, day);
      if (date.getDay() !== 0 && date.getDay() !== 6) weekdays.push(date);
    }
    return [weekdays.slice(0, 5), weekdays.slice(5, 10), weekdays.slice(10, 15), weekdays.slice(15, 22), weekdays.slice(22)].filter(function (group) { return group.length; });
  }
  function selectedWeekStampSet(sel) {
    var group = weekGroups(sel.year, sel.month)[Math.max(0, sel.week - 1)] || [];
    return new Set(group.map(stamp));
  }
  function monthItems(sel) {
    rebuildCache();
    return cacheRows.filter(function (item) { return item.year === Number(sel.year) && item.month === Number(sel.month); });
  }
  function setDailyDetailsFromSelection(keepSelect) {
    if (!window.state || !Array.isArray(state.uploads)) return { sel: selectedPeriod(), monthRows: [], dayRows: [] };
    var sel = selectedPeriod();
    var periodKey = [sel.year, sel.month, sel.week].join("-");
    var all = monthItems(sel).sort(function (a, b) { return a.stamp - b.stamp || a.index - b.index; });
    var dateMap = new Map();
    all.forEach(function (item) { dateMap.set(String(item.stamp), item.date); });
    detailDateOptions = Array.from(dateMap.entries()).map(function (pair) { return { value: pair[0], label: formatDate(pair[1]) }; }).sort(function (a, b) { return Number(a.value) - Number(b.value); });

    var select = byId("detailDateSelect");
    var current = keepSelect && select && select.value ? select.value : "";
    var currentValid = current && detailDateOptions.some(function (option) { return option.value === current; });
    var oldValid = selectedDetailDate && detailDateOptions.some(function (option) { return option.value === selectedDetailDate; });
    var weekSet = selectedWeekStampSet(sel);
    var latestInWeek = all.filter(function (item) { return weekSet.has(item.stamp); }).pop();
    var desired = "";
    if (periodKey === lastPeriodKey && currentValid) desired = current;
    else if (periodKey === lastPeriodKey && oldValid) desired = selectedDetailDate;
    else if (latestInWeek) desired = String(latestInWeek.stamp);
    else if (detailDateOptions.length) desired = detailDateOptions[detailDateOptions.length - 1].value;

    selectedDetailDate = desired;
    lastPeriodKey = periodKey;
    lastSelectValue = desired;
    var dayItems = all.filter(function (item) { return String(item.stamp) === selectedDetailDate; });
    var dayRows = dayItems.map(makeDetail).sort(compareDetails);
    var monthRows = all.map(makeDetail).sort(compareDetails);
    state.details = dayRows;
    return { sel: sel, monthRows: monthRows, dayRows: dayRows, selectedStamp: Number(desired || 0) };
  }

  var originalRenderDetails = typeof renderDetails === "function" ? renderDetails : null;
  if (originalRenderDetails && !originalRenderDetails.__dailyDateOnlyV17) {
    renderDetails = function () {
      setDailyDetailsFromSelection(false);
      return originalRenderDetails.apply(this, arguments);
    };
    renderDetails.__dailyDateOnlyV17 = true;
  }

  function rowsForExport(rows) {
    return rows.map(function (row) {
      return {
        "일자": row.date ? formatDate(row.date) : "",
        "구분": row.category,
        "유형": row.type,
        "브랜드": row.brand,
        "원인처": row.source,
        "제품코드": row.code,
        "색상": row.color,
        "LOT NO": row.lot,
        "공급": row.supplier,
        "하자내역": row.defect,
        "금액": row.amount
      };
    });
  }
  function downloadRows(name, rows) {
    var out = rowsForExport(rows);
    if (window.XLSX) {
      var ws = XLSX.utils.json_to_sheet(out);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "세부내역");
      XLSX.writeFile(wb, name);
      return;
    }
    if (typeof downloadText === "function" && typeof toCsv === "function") downloadText(name.replace(/\.xlsx$/i, ".csv"), toCsv(out), "text/csv;charset=utf-8");
  }
  window.downloadDailyDetailMonthExcelV17 = function () {
    var data = setDailyDetailsFromSelection(true);
    downloadRows("월데이터_" + data.sel.year + "-" + String(data.sel.month).padStart(2, "0") + ".xlsx", data.monthRows);
  };
  window.downloadDailyDetailDayExcelV17 = function () {
    var data = setDailyDetailsFromSelection(true);
    var dateText = data.dayRows[0] && data.dayRows[0].date ? formatDate(data.dayRows[0].date) : String(data.selectedStamp || "selected");
    downloadRows("일일데이터_" + dateText + ".xlsx", data.dayRows);
  };
  function openDetailPopup() {
    var data = setDailyDetailsFromSelection(true);
    var selectedDate = data.dayRows[0] && data.dayRows[0].date ? formatDate(data.dayRows[0].date) : "";
    var rows = data.dayRows;
    var body = rows.map(function (row, index) {
      return "<tr><td>" + (index + 1) + "</td><td>" + escape(row.date ? formatDate(row.date) : "") + "</td><td>" + escape(row.category) + "</td><td>" + escape(row.type) + "</td><td>" + escape(row.brand) + "</td><td>" + escape(row.source) + "</td><td>" + escape(row.code) + "</td><td>" + escape(row.color) + "</td><td>" + escape(row.lot) + "</td><td>" + escape(row.supplier) + "</td><td class='left'>" + escape(row.defect) + "</td><td>" + formatNumber(row.amount) + "</td></tr>";
    }).join("");
    var popup = window.open("", "dailyDetailListV17", "width=1280,height=760,scrollbars=yes,resizable=yes");
    if (!popup) return;
    popup.document.open();
    popup.document.write("<!doctype html><html><head><meta charset='UTF-8'><title>고객클레임 접수 세부내역</title><style>body{font-family:Malgun Gothic,Segoe UI,Arial,sans-serif;margin:18px;color:#0f172a}h1{font-size:22px;margin:0 0 8px}.toolbar{display:flex;gap:8px;margin:12px 0 14px}button{height:34px;padding:0 12px;border:1px solid #b9c7d8;border-radius:6px;background:#fff;font-weight:800;cursor:pointer}table{width:100%;border-collapse:collapse;font-size:13px}th,td{border:1px solid #d9e2ec;padding:8px;text-align:center;vertical-align:middle}th{background:#eef1f4;font-weight:900}.left{text-align:left;white-space:pre-wrap}.meta{color:#475569;font-size:13px}</style></head><body><h1>고객클레임 접수 세부내역</h1><div class='meta'>" + escape(data.sel.year + "년 " + data.sel.month + "월" + (selectedDate ? " / " + selectedDate : "")) + " · 선택 날짜 " + formatNumber(rows.length) + "건</div><div class='toolbar'><button onclick='window.opener&&window.opener.downloadDailyDetailMonthExcelV17()'>월데이터 엑셀 다운로드</button><button onclick='window.opener&&window.opener.downloadDailyDetailDayExcelV17()'>일일데이터 엑셀 다운로드</button></div><table><thead><tr><th>No</th><th>일자</th><th>구분</th><th>유형</th><th>브랜드</th><th>원인처</th><th>제품코드</th><th>색상</th><th>LOT NO</th><th>공급</th><th>하자내역</th><th>금액</th></tr></thead><tbody>" + (body || "<tr><td colspan='12'>선택 날짜 자료가 없습니다.</td></tr>") + "</tbody></table></body></html>");
    popup.document.close();
    attachEscToClose(popup);
  }

  document.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) >= 0) {
      lastPeriodKey = "";
      setTimeout(function () {
        setDailyDetailsFromSelection(false);
        if (typeof originalRenderDetails === "function") originalRenderDetails();
      }, 40);
    }
    if (target.id === "detailDateSelect") {
      selectedDetailDate = target.value;
      lastSelectValue = target.value;
      setTimeout(function () {
        setDailyDetailsFromSelection(true);
        if (typeof originalRenderDetails === "function") originalRenderDetails();
      }, 20);
    }
  }, true);

  document.addEventListener("dblclick", function (event) {
    var table = byId("detailTable");
    if (!table || !table.contains(event.target)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openDetailPopup();
  }, true);

  async function autoReloadSavedLinks() {
    if (window.__autoReloadSavedLinksV17) return;
    if (typeof restoringSavedState !== "undefined" && restoringSavedState) {
      setTimeout(autoReloadSavedLinks, 800);
      return;
    }
    if (!Array.isArray(savedLinkGroupsCache) || !savedLinkGroupsCache.length || typeof restoreSavedGroup !== "function") return;
    window.__autoReloadSavedLinksV17 = true;
    try {
      var wantedKinds = { cost: true, receiptHistory: true, monthlyStatus: true };
      var loadedKeys = new Set((state.uploads || []).filter(function (entry) {
        return wantedKinds[entry.kind] && entry.sourceType === "spreadsheet-link" && (entry.rows || []).length;
      }).map(function (entry) { return entry.groupKey || entry.sourceUrl; }));
      var groups = savedLinkGroupsCache.filter(function (group) {
        var key = group.groupKey || group.sourceUrl;
        return wantedKinds[group.kind] && group.sourceUrl && !loadedKeys.has(key);
      });
      if (!groups.length) return;
      for (var i = 0; i < groups.length; i += 1) {
        try { await restoreSavedGroup(groups[i]); }
        catch (err) { console.warn("saved link reload failed", groups[i] && groups[i].label, err); }
      }
      if (typeof rebuildFromSelection === "function") rebuildFromSelection();
      setDailyDetailsFromSelection(false);
      if (typeof renderAll === "function") renderAll("저장된 링크 자료를 다시 불러왔습니다.");
      if (typeof fillSavedLinkInputs === "function") fillSavedLinkInputs();
      if (typeof renderLinkedDataList === "function") renderLinkedDataList();
      if (typeof saveDashboardState === "function") saveDashboardState(true);
    } finally {
      window.__autoReloadSavedLinksV17 = false;
    }
  }

  window.__refreshDailyDetailsDateOnlyV17 = function () {
    setDailyDetailsFromSelection(false);
    if (typeof originalRenderDetails === "function") originalRenderDetails();
  };
  window.__autoReloadSavedLinksV17Run = autoReloadSavedLinks;
  window.addEventListener("focus", function () { setTimeout(autoReloadSavedLinks, 500); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) setTimeout(autoReloadSavedLinks, 500); });
  setTimeout(function () { autoReloadSavedLinks(); setDailyDetailsFromSelection(false); if (typeof originalRenderDetails === "function") originalRenderDetails(); }, 1300);
})();

// final-persist-and-exact-daily-detail-v18-20260703
(function () {
  "use strict";
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  if (window.__persistAndExactDailyDetailV18) return;
  window.__persistAndExactDailyDetailV18 = true;

  var DETAIL_API = "/api/claim-dashboard-state";
  var CAT_PENDING = "\uC2DC\uACF5\uBBF8\uACB0";
  var CAT_COMPLAINT = "\uACE0\uAC1D\uBD88\uB9CC";
  var CAT_SENS = "\uAC10\uC131/\uCDE8\uAE09";
  var SOURCE_ORDER = ["1\uB77C\uC778", "3\uB77C\uC778", "4\uB77C\uC778", "7\uB77C\uC778"];
  var CATEGORY_ORDER = [CAT_PENDING, CAT_COMPLAINT, CAT_SENS];
  var v18CacheKey = "";
  var v18Rows = [];
  var v18LastPeriodKey = "";

  function byId(id) { return document.getElementById(id); }
  function text(value) { return value == null ? "" : String(value).trim(); }
  function number(value) { return Number(String(value == null ? "" : value).replace(/[^0-9.-]/g, "")) || 0; }
  function esc(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value);
    return text(value).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; });
  }
  function fmt(value) {
    if (typeof formatNumberValue === "function") return formatNumberValue(value);
    return Number(value || 0).toLocaleString("ko-KR");
  }
  function raw(row) {
    if (!row) return row;
    if (Array.isArray(row.__raw)) return row.__raw;
    if (row.__raw && typeof row.__raw === "object") return row.__raw;
    return row;
  }
  function cells(row) {
    var r = raw(row);
    if (!r) return [];
    if (Array.isArray(r)) return r;
    if (Array.isArray(r.__cells)) return r.__cells;
    if (Array.isArray(row && row.__cells)) return row.__cells;
    if (Array.isArray(r.__headers)) return r.__headers.map(function (key) { return r[key]; });
    return Object.keys(r).filter(function (key) { return key.indexOf("__") !== 0; }).map(function (key) { return r[key]; });
  }
  function cell(row, index) { return text(cells(row)[index]); }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    var s = text(value);
    var m = s.match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    return null;
  }
  function stamp(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function formatDate(date) { return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"); }
  function rowDate(row) { return parseDate(cell(row, 0)); }
  function receiptNo(row) { return cell(row, 3) || cell(row, 1); }
  function validRow(row) {
    var d = rowDate(row);
    var no = receiptNo(row);
    return !!(d && no && !/(\uC811\uC218\uBC88\uD638|\uC811\uC218\uC77C\uC790|\uBC88\uD638|NO|No)/i.test(no));
  }
  function category(row) {
    if (cell(row, 13) === "0") return CAT_PENDING;
    var type = cell(row, 11);
    if (/\uCDE8\uAE09|\uAC10\uC131/.test(type)) return CAT_SENS;
    return CAT_COMPLAINT;
  }
  function sourceRank(value) {
    var source = text(value);
    for (var i = 0; i < SOURCE_ORDER.length; i += 1) if (source.indexOf(SOURCE_ORDER[i]) >= 0) return i;
    return 99;
  }
  function categoryRank(value) {
    var idx = CATEGORY_ORDER.indexOf(value);
    return idx >= 0 ? idx : 99;
  }
  function detailFromItem(item, index) {
    var row = item.row;
    return {
      number: number(cell(row, 1)) || index + 1,
      category: category(row),
      type: cell(row, 11),
      brand: cell(row, 2),
      source: cell(row, 9),
      code: cell(row, 5),
      color: cell(row, 6),
      lot: cell(row, 7) || ".",
      supplier: cell(row, 8),
      defect: cell(row, 12),
      amount: number(cell(row, 17)),
      date: item.date,
      stamp: item.stamp,
      raw: row
    };
  }
  function compareDetail(a, b) {
    return sourceRank(a.source) - sourceRank(b.source) ||
      categoryRank(a.category) - categoryRank(b.category) ||
      text(a.source).localeCompare(text(b.source), "ko", { numeric: true }) ||
      Number(a.number || 0) - Number(b.number || 0) ||
      text(a.code).localeCompare(text(b.code), "ko", { numeric: true });
  }
  function rebuildReceiptCache() {
    if (!window.state || !Array.isArray(state.uploads)) return;
    var entries = state.uploads.filter(function (entry) { return entry.kind === "receiptHistory"; });
    var key = entries.map(function (entry) { return [entry.id, (entry.rows || []).length, entry.selected !== false ? 1 : 0].join(":"); }).join("|");
    if (key === v18CacheKey) return;
    v18CacheKey = key;
    v18Rows = [];
    entries.forEach(function (entry) {
      (entry.rows || []).forEach(function (row, index) {
        var r = raw(row);
        if (!validRow(r)) return;
        var d = rowDate(r);
        v18Rows.push({ entry: entry, row: r, index: index, date: d, stamp: stamp(d), year: d.getFullYear(), month: d.getMonth() + 1 });
      });
    });
  }
  function selectedPeriod() {
    var now = new Date();
    return {
      year: Number(byId("dailyYearSelect") && byId("dailyYearSelect").value) || now.getFullYear(),
      month: Number(byId("dailyMonthSelect") && byId("dailyMonthSelect").value) || now.getMonth() + 1,
      week: Number(byId("dailyWeekSelect") && byId("dailyWeekSelect").value) || 1
    };
  }
  function weekGroups(year, month) {
    if (typeof claimSummaryWeekGroups === "function") return claimSummaryWeekGroups(year, month) || [];
    var days = [];
    var last = new Date(year, month, 0).getDate();
    for (var day = 1; day <= last; day += 1) {
      var d = new Date(year, month - 1, day);
      if (d.getDay() !== 0 && d.getDay() !== 6) days.push(d);
    }
    return [days.slice(0, 5), days.slice(5, 10), days.slice(10, 15), days.slice(15, 22), days.slice(22)].filter(function (group) { return group.length; });
  }
  function selectedWeekSet(sel) {
    var group = weekGroups(sel.year, sel.month)[Math.max(0, sel.week - 1)] || [];
    return new Set(group.map(stamp));
  }
  function syncDailyDetails(keepSelectedDate) {
    rebuildReceiptCache();
    var sel = selectedPeriod();
    var periodKey = [sel.year, sel.month, sel.week].join("-");
    var weekSet = selectedWeekSet(sel);
    var monthItems = v18Rows.filter(function (item) { return item.year === sel.year && item.month === sel.month; }).sort(function (a, b) { return a.stamp - b.stamp || a.index - b.index; });
    var weekItems = monthItems.filter(function (item) { return weekSet.has(item.stamp); });
    var dateMap = new Map();
    weekItems.forEach(function (item) { dateMap.set(String(item.stamp), item.date); });
    if (!dateMap.size) monthItems.forEach(function (item) { dateMap.set(String(item.stamp), item.date); });
    detailDateOptions = Array.from(dateMap.entries()).map(function (pair) { return { value: pair[0], label: formatDate(pair[1]) }; }).sort(function (a, b) { return Number(a.value) - Number(b.value); });
    var select = byId("detailDateSelect");
    var current = keepSelectedDate && select && select.value ? select.value : "";
    var validCurrent = current && detailDateOptions.some(function (option) { return option.value === current; });
    var validSaved = selectedDetailDate && detailDateOptions.some(function (option) { return option.value === selectedDetailDate; });
    var desired = "";
    if (validCurrent) desired = current;
    else if (periodKey === v18LastPeriodKey && validSaved) desired = selectedDetailDate;
    else if (weekItems.length) desired = String(weekItems[weekItems.length - 1].stamp);
    else if (detailDateOptions.length) desired = detailDateOptions[detailDateOptions.length - 1].value;
    selectedDetailDate = desired;
    v18LastPeriodKey = periodKey;
    var dayRows = monthItems.filter(function (item) { return String(item.stamp) === selectedDetailDate; }).map(detailFromItem).sort(compareDetail);
    var monthRows = monthItems.map(detailFromItem).sort(compareDetail);
    state.details = dayRows;
    return { sel: sel, monthRows: monthRows, dayRows: dayRows, selectedStamp: Number(selectedDetailDate || 0) };
  }

  var originalRenderDetailsV18 = typeof renderDetails === "function" ? renderDetails : null;
  if (originalRenderDetailsV18) {
    renderDetails = function () {
      syncDailyDetails(true);
      return originalRenderDetailsV18.apply(this, arguments);
    };
  }

  function exportRows(rows) {
    return rows.map(function (row) {
      return {
        "\uC77C\uC790": row.date ? formatDate(row.date) : "",
        "\uAD6C\uBD84": row.category,
        "\uC720\uD615": row.type,
        "\uBE0C\uB79C\uB4DC": row.brand,
        "\uC6D0\uC778\uCC98": row.source,
        "\uC81C\uD488\uCF54\uB4DC": row.code,
        "\uC0C9\uC0C1": row.color,
        "LOT NO": row.lot,
        "\uACF5\uAE09": row.supplier,
        "\uD558\uC790\uB0B4\uC5ED": row.defect,
        "\uAE08\uC561": row.amount
      };
    });
  }
  function downloadRows(filename, rows) {
    var data = exportRows(rows);
    if (!window.XLSX) return;
    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "\uC138\uBD80\uB0B4\uC5ED");
    XLSX.writeFile(wb, filename);
  }
  window.downloadDailyDetailMonthExcelV18 = function () {
    var data = syncDailyDetails(true);
    downloadRows("monthly-detail-" + data.sel.year + "-" + String(data.sel.month).padStart(2, "0") + ".xlsx", data.monthRows);
  };
  window.downloadDailyDetailDayExcelV18 = function () {
    var data = syncDailyDetails(true);
    var dateText = data.dayRows[0] && data.dayRows[0].date ? formatDate(data.dayRows[0].date) : String(data.selectedStamp || "selected");
    downloadRows("daily-detail-" + dateText + ".xlsx", data.dayRows);
  };
  function openDailyDetailPopup() {
    var data = syncDailyDetails(true);
    var selectedDate = data.dayRows[0] && data.dayRows[0].date ? formatDate(data.dayRows[0].date) : "";
    var body = data.dayRows.map(function (row, index) {
      return "<tr><td>" + (index + 1) + "</td><td>" + esc(row.date ? formatDate(row.date) : "") + "</td><td>" + esc(row.category) + "</td><td>" + esc(row.type) + "</td><td>" + esc(row.brand) + "</td><td>" + esc(row.source) + "</td><td>" + esc(row.code) + "</td><td>" + esc(row.color) + "</td><td>" + esc(row.lot) + "</td><td>" + esc(row.supplier) + "</td><td class='left'>" + esc(row.defect) + "</td><td>" + fmt(row.amount) + "</td></tr>";
    }).join("");
    var popup = window.open("", "dailyDetailListV18", "width=1280,height=760,scrollbars=yes,resizable=yes");
    if (!popup) return;
    popup.document.open();
    popup.document.write("<!doctype html><html><head><meta charset='UTF-8'><title>Detail</title><style>body{font-family:Malgun Gothic,Segoe UI,Arial,sans-serif;margin:18px;color:#0f172a}h1{font-size:22px;margin:0 0 8px}.toolbar{display:flex;gap:8px;margin:12px 0 14px}button{height:34px;padding:0 12px;border:1px solid #b9c7d8;border-radius:6px;background:#fff;font-weight:800;cursor:pointer}table{width:100%;border-collapse:collapse;font-size:13px}th,td{border:1px solid #d9e2ec;padding:8px;text-align:center;vertical-align:middle}th{background:#eef1f4;font-weight:900}.left{text-align:left;white-space:pre-wrap}.meta{color:#475569;font-size:13px}</style></head><body><h1>\uACE0\uAC1D\uD074\uB808\uC784 \uC811\uC218 \uC138\uBD80\uB0B4\uC5ED</h1><div class='meta'>" + esc(selectedDate) + " / " + fmt(data.dayRows.length) + "\uAC74</div><div class='toolbar'><button onclick='window.opener&&window.opener.downloadDailyDetailMonthExcelV18()'>\uC6D4\uB370\uC774\uD130 \uC5D1\uC140 \uB2E4\uC6B4\uB85C\uB4DC</button><button onclick='window.opener&&window.opener.downloadDailyDetailDayExcelV18()'>\uC77C\uC77C\uB370\uC774\uD130 \uC5D1\uC140 \uB2E4\uC6B4\uB85C\uB4DC</button></div><table><thead><tr><th>No</th><th>\uC77C\uC790</th><th>\uAD6C\uBD84</th><th>\uC720\uD615</th><th>\uBE0C\uB79C\uB4DC</th><th>\uC6D0\uC778\uCC98</th><th>\uC81C\uD488\uCF54\uB4DC</th><th>\uC0C9\uC0C1</th><th>LOT NO</th><th>\uACF5\uAE09</th><th>\uD558\uC790\uB0B4\uC5ED</th><th>\uAE08\uC561</th></tr></thead><tbody>" + (body || "<tr><td colspan='12'>\uC120\uD0DD \uB0A0\uC9DC \uC790\uB8CC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>") + "</tbody></table></body></html>");
    popup.document.close();
    attachEscToClose(popup);
  }

  document.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) >= 0) {
      v18LastPeriodKey = "";
      selectedDetailDate = "";
      setTimeout(function () { syncDailyDetails(false); if (originalRenderDetailsV18) originalRenderDetailsV18(); }, 80);
    }
    if (target.id === "detailDateSelect") {
      selectedDetailDate = target.value;
      setTimeout(function () { syncDailyDetails(true); if (originalRenderDetailsV18) originalRenderDetailsV18(); }, 30);
    }
  }, true);
  document.addEventListener("dblclick", function (event) {
    var table = byId("detailTable");
    if (!table || !table.contains(event.target)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openDailyDetailPopup();
  }, true);

  function collectGroupsForServer() {
    var groups = [];
    var seen = new Set();
    function add(group) {
      if (!group || !group.sourceUrl) return;
      var key = group.groupKey || group.sourceUrl;
      if (seen.has(key)) return;
      seen.add(key);
      groups.push({ sourceUrl: group.sourceUrl, kind: group.kind, label: group.label || group.groupTitle || "", groupKey: group.groupKey, groupTitle: group.groupTitle || group.label || "", order: group.order, entries: Array.isArray(group.entries) ? group.entries : [] });
    }
    if (Array.isArray(savedLinkGroupsCache)) savedLinkGroupsCache.forEach(add);
    if (window.state && Array.isArray(state.uploads)) {
      var byKey = new Map();
      state.uploads.filter(function (entry) { return entry.sourceType === "spreadsheet-link" && entry.sourceUrl; }).forEach(function (entry) {
        var key = entry.groupKey || entry.sourceUrl;
        if (!byKey.has(key)) byKey.set(key, { sourceUrl: entry.sourceUrl, kind: entry.kind, label: entry.groupTitle || entry.label || "", groupKey: entry.groupKey, groupTitle: entry.groupTitle || entry.label || "", order: entry.order, entries: [] });
        byKey.get(key).entries.push({ label: entry.label || "", sourceSheet: entry.sourceSheet || "", selected: entry.selected !== false, excluded: Number(entry.excluded || 0) });
      });
      byKey.forEach(add);
    }
    return groups;
  }
  async function saveGroupsToServer() {
    var groups = collectGroupsForServer();
    if (!groups.length) return;
    try { await fetch(DETAIL_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ version: 1, savedAt: new Date().toISOString(), groups: groups }) }); }
    catch (err) { console.warn("claim dashboard server save failed", err); }
  }
  async function loadGroupsFromServer() {
    try {
      var response = await fetch(DETAIL_API + "?t=" + Date.now(), { cache: "no-store" });
      if (!response.ok) return [];
      var payload = await response.json();
      return Array.isArray(payload.groups) ? payload.groups : [];
    } catch (err) { return []; }
  }
  async function restoreGroups(groups) {
    if (!Array.isArray(groups) || !groups.length || typeof restoreSavedGroup !== "function") return false;
    savedLinkGroupsCache = groups;
    var failed = 0;
    if (window.state) state.uploads = [];
    for (var i = 0; i < groups.length; i += 1) {
      try { await restoreSavedGroup(groups[i]); }
      catch (err) { failed += 1; console.warn("server saved group restore failed", groups[i] && groups[i].label, err); }
    }
    if (typeof restoreMonthlyStatusSnapshot === "function") restoreMonthlyStatusSnapshot();
    if (typeof rebuildFromSelection === "function") rebuildFromSelection();
    syncDailyDetails(false);
    if (typeof renderAll === "function") renderAll(failed ? "\uC77C\uBD80 \uC800\uC7A5 \uB9C1\uD06C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4." : "\uC800\uC7A5\uB41C \uB9C1\uD06C \uC790\uB8CC\uB97C \uBD88\uB7EC\uC654\uC2B5\uB2C8\uB2E4.");
    if (typeof fillSavedLinkInputs === "function") fillSavedLinkInputs();
    if (typeof renderLinkedDataList === "function") renderLinkedDataList();
    return true;
  }
  var originalSaveDashboardStateV18 = typeof saveDashboardState === "function" ? saveDashboardState : null;
  if (originalSaveDashboardStateV18) {
    saveDashboardState = function () {
      var result = originalSaveDashboardStateV18.apply(this, arguments);
      saveGroupsToServer();
      return result;
    };
  }
  var originalRestoreSavedDashboardStateV18 = typeof restoreSavedDashboardState === "function" ? restoreSavedDashboardState : null;
  if (originalRestoreSavedDashboardStateV18) {
    restoreSavedDashboardState = async function () {
      var restored = false;
      try { restored = await originalRestoreSavedDashboardStateV18.apply(this, arguments); } catch (err) { restored = false; }
      if (restored && state.uploads && state.uploads.some(function (entry) { return entry.sourceType === "spreadsheet-link" && (entry.rows || []).length; })) {
        saveGroupsToServer();
        return true;
      }
      var groups = await loadGroupsFromServer();
      if (groups.length) return restoreGroups(groups);
      return restored;
    };
  }
  window.__syncDailyDetailsExactV18 = function () { syncDailyDetails(true); if (originalRenderDetailsV18) originalRenderDetailsV18(); };
  window.__saveClaimDashboardLinksToServerV18 = saveGroupsToServer;
  window.__restoreClaimDashboardLinksFromServerV18 = async function () { return restoreGroups(await loadGroupsFromServer()); };
  setTimeout(function () { syncDailyDetails(true); if (originalRenderDetailsV18) originalRenderDetailsV18(); saveGroupsToServer(); }, 1800);
})();

// final-light-link-persistence-and-daily-detail-lock-v19-20260703
(function () {
  "use strict";
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  if (window.__lightLinkPersistenceAndDailyDetailLockV19) return;
  window.__lightLinkPersistenceAndDailyDetailLockV19 = true;

  var LIGHT_KEY = "qualityClaimDashboard.lightSavedLinks.v19";
  var HEAVY_KEY = typeof dashboardStorageKey === "string" ? dashboardStorageKey : "qualityClaimDashboard.savedLinks.v1";
  var CAT_PENDING = "\uC2DC\uACF5\uBBF8\uACB0";
  var CAT_COMPLAINT = "\uACE0\uAC1D\uBD88\uB9CC";
  var CAT_SENS = "\uAC10\uC131/\uCDE8\uAE09";
  var SOURCE_ORDER = ["1\uB77C\uC778", "3\uB77C\uC778", "4\uB77C\uC778", "7\uB77C\uC778"];
  var CATEGORY_ORDER = [CAT_PENDING, CAT_COMPLAINT, CAT_SENS];
  var lastDetailPeriod = "";
  var lastDetailRowsKey = "";

  function byId(id) { return document.getElementById(id); }
  function tx(value) { return value == null ? "" : String(value).trim(); }
  function num(value) { return Number(String(value == null ? "" : value).replace(/[^0-9.-]/g, "")) || 0; }
  function raw(row) {
    if (!row) return row;
    if (Array.isArray(row.__raw)) return row.__raw;
    if (row.__raw && typeof row.__raw === "object") return row.__raw;
    return row;
  }
  function cells(row) {
    var r = raw(row);
    if (!r) return [];
    if (Array.isArray(r)) return r;
    if (Array.isArray(r.__cells)) return r.__cells;
    if (Array.isArray(row && row.__cells)) return row.__cells;
    if (Array.isArray(r.__headers)) return r.__headers.map(function (key) { return r[key]; });
    return Object.keys(r).filter(function (key) { return key.indexOf("__") !== 0; }).map(function (key) { return r[key]; });
  }
  function cell(row, index) { return tx(cells(row)[index]); }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    var s = tx(value);
    var m = s.match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    return null;
  }
  function stamp(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function dateText(date) { return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"); }
  function validReceiptRow(row) {
    var d = parseDate(cell(row, 0));
    var no = cell(row, 3) || cell(row, 1);
    return !!(d && no && !/(\uC811\uC218\uBC88\uD638|\uC811\uC218\uC77C\uC790|\uBC88\uD638|NO|No)/i.test(no));
  }
  function category(row) {
    if (cell(row, 13) === "0") return CAT_PENDING;
    var type = cell(row, 11);
    if (/\uCDE8\uAE09|\uAC10\uC131/.test(type)) return CAT_SENS;
    return CAT_COMPLAINT;
  }
  function sourceRank(value) {
    var source = tx(value);
    for (var i = 0; i < SOURCE_ORDER.length; i += 1) if (source.indexOf(SOURCE_ORDER[i]) >= 0) return i;
    return 99;
  }
  function categoryRank(value) {
    var idx = CATEGORY_ORDER.indexOf(value);
    return idx >= 0 ? idx : 99;
  }
  function selectedDailyPeriod() {
    var now = new Date();
    return {
      year: Number(byId("dailyYearSelect") && byId("dailyYearSelect").value) || now.getFullYear(),
      month: Number(byId("dailyMonthSelect") && byId("dailyMonthSelect").value) || now.getMonth() + 1,
      week: Number(byId("dailyWeekSelect") && byId("dailyWeekSelect").value) || 1
    };
  }
  function weekGroups(year, month) {
    if (typeof claimSummaryWeekGroups === "function") return claimSummaryWeekGroups(year, month) || [];
    var weekdays = [];
    var last = new Date(year, month, 0).getDate();
    for (var day = 1; day <= last; day += 1) {
      var d = new Date(year, month - 1, day);
      if (d.getDay() !== 0 && d.getDay() !== 6) weekdays.push(d);
    }
    return [weekdays.slice(0, 5), weekdays.slice(5, 10), weekdays.slice(10, 15), weekdays.slice(15, 22), weekdays.slice(22)].filter(function (group) { return group.length; });
  }
  function selectedWeekSet(sel) {
    var group = weekGroups(sel.year, sel.month)[Math.max(0, sel.week - 1)] || [];
    return new Set(group.map(stamp));
  }
  function receiptItemsForMonth(sel) {
    if (!window.state || !Array.isArray(state.uploads)) return [];
    var items = [];
    state.uploads.filter(function (entry) { return entry.kind === "receiptHistory"; }).forEach(function (entry) {
      (entry.rows || []).forEach(function (row, index) {
        var r = raw(row);
        if (!validReceiptRow(r)) return;
        var d = parseDate(cell(r, 0));
        if (!d || d.getFullYear() !== sel.year || d.getMonth() + 1 !== sel.month) return;
        items.push({ entry: entry, row: r, index: index, date: d, stamp: stamp(d) });
      });
    });
    items.sort(function (a, b) { return a.stamp - b.stamp || a.index - b.index; });
    return items;
  }
  function detailRow(item, index) {
    var r = item.row;
    return {
      number: num(cell(r, 1)) || index + 1,
      category: category(r),
      type: cell(r, 11),
      brand: cell(r, 2),
      source: cell(r, 9),
      code: cell(r, 5),
      color: cell(r, 6),
      lot: cell(r, 7) || ".",
      supplier: cell(r, 8),
      defect: cell(r, 12),
      amount: num(cell(r, 17)),
      date: item.date,
      stamp: item.stamp,
      raw: r
    };
  }
  function compareRows(a, b) {
    return sourceRank(a.source) - sourceRank(b.source) ||
      categoryRank(a.category) - categoryRank(b.category) ||
      tx(a.source).localeCompare(tx(b.source), "ko", { numeric: true }) ||
      Number(a.number || 0) - Number(b.number || 0) ||
      tx(a.code).localeCompare(tx(b.code), "ko", { numeric: true });
  }
  function syncDetailsForSelectedDay(keepDate) {
    if (!window.state || !Array.isArray(state.uploads)) return null;
    var sel = selectedDailyPeriod();
    var period = [sel.year, sel.month, sel.week].join("-");
    var monthItems = receiptItemsForMonth(sel);
    var weekSet = selectedWeekSet(sel);
    var weekItems = monthItems.filter(function (item) { return weekSet.has(item.stamp); });
    var optionItems = weekItems.length ? weekItems : monthItems;
    var dateMap = new Map();
    optionItems.forEach(function (item) { dateMap.set(String(item.stamp), item.date); });
    detailDateOptions = Array.from(dateMap.entries()).map(function (pair) { return { value: pair[0], label: dateText(pair[1]) }; }).sort(function (a, b) { return Number(a.value) - Number(b.value); });
    var select = byId("detailDateSelect");
    var fromSelect = keepDate && select && select.value ? select.value : "";
    var validSelect = fromSelect && detailDateOptions.some(function (option) { return option.value === fromSelect; });
    var validSaved = selectedDetailDate && detailDateOptions.some(function (option) { return option.value === selectedDetailDate; });
    var desired = "";
    if (validSelect) desired = fromSelect;
    else if (period === lastDetailPeriod && validSaved) desired = selectedDetailDate;
    else if (optionItems.length) desired = String(optionItems[optionItems.length - 1].stamp);
    else if (detailDateOptions.length) desired = detailDateOptions[detailDateOptions.length - 1].value;
    selectedDetailDate = desired;
    lastDetailPeriod = period;
    var dayRows = monthItems.filter(function (item) { return String(item.stamp) === selectedDetailDate; }).map(detailRow).sort(compareRows);
    state.details = dayRows;
    lastDetailRowsKey = period + ":" + selectedDetailDate + ":" + dayRows.length;
    return { sel: sel, dayRows: dayRows, monthRows: monthItems.map(detailRow).sort(compareRows), selectedStamp: Number(selectedDetailDate || 0) };
  }

  function compactGroup(group) {
    if (!group || !group.sourceUrl) return null;
    return {
      sourceUrl: group.sourceUrl,
      kind: group.kind,
      label: group.label || group.groupTitle || "",
      groupKey: group.groupKey || group.sourceUrl,
      groupTitle: group.groupTitle || group.label || "",
      order: group.order,
      entries: (Array.isArray(group.entries) ? group.entries : []).map(function (entry) {
        return {
          label: entry.label || "",
          sourceSheet: entry.sourceSheet || "",
          selected: entry.selected !== false,
          excluded: Number(entry.excluded || 0)
        };
      })
    };
  }
  function collectLightGroups() {
    var groups = [];
    var seen = new Set();
    function add(group) {
      var compact = compactGroup(group);
      if (!compact) return;
      var key = compact.groupKey || compact.sourceUrl;
      if (seen.has(key)) return;
      seen.add(key);
      groups.push(compact);
    }
    if (Array.isArray(savedLinkGroupsCache)) savedLinkGroupsCache.forEach(add);
    if (window.state && Array.isArray(state.uploads)) {
      var byKey = new Map();
      state.uploads.filter(function (entry) { return entry.sourceType === "spreadsheet-link" && entry.sourceUrl; }).forEach(function (entry) {
        var key = entry.groupKey || entry.sourceUrl;
        if (!byKey.has(key)) byKey.set(key, { sourceUrl: entry.sourceUrl, kind: entry.kind, label: entry.groupTitle || entry.label || "", groupKey: key, groupTitle: entry.groupTitle || entry.label || "", order: entry.order, entries: [] });
        byKey.get(key).entries.push({ label: entry.label || "", sourceSheet: entry.sourceSheet || "", selected: entry.selected !== false, excluded: Number(entry.excluded || 0) });
      });
      byKey.forEach(add);
    }
    return groups;
  }
  function writeLightGroups() {
    var groups = collectLightGroups();
    if (!groups.length) return false;
    var payload = JSON.stringify({ version: 19, savedAt: new Date().toISOString(), groups: groups });
    try {
      localStorage.setItem(LIGHT_KEY, payload);
      return true;
    } catch (err) {
      try {
        localStorage.removeItem(LIGHT_KEY);
        localStorage.removeItem(HEAVY_KEY);
        localStorage.setItem(LIGHT_KEY, payload);
        return true;
      } catch (retryErr) {
        console.warn("light saved links failed", retryErr);
        return false;
      }
    }
  }
  function readLightGroups() {
    try {
      var payload = JSON.parse(localStorage.getItem(LIGHT_KEY) || "null");
      return payload && Array.isArray(payload.groups) ? payload.groups : [];
    } catch (err) { return []; }
  }
  function hasLoadedSpreadsheetRows() {
    return !!(window.state && Array.isArray(state.uploads) && state.uploads.some(function (entry) {
      return entry.sourceType === "spreadsheet-link" && Array.isArray(entry.rows) && entry.rows.length;
    }));
  }
  async function restoreLightGroups(force) {
    var groups = readLightGroups();
    if (!groups.length || typeof restoreSavedGroup !== "function") return false;
    if (!force && hasLoadedSpreadsheetRows()) return true;
    savedLinkGroupsCache = groups;
    if (window.state) state.uploads = [];
    var failed = 0;
    for (var i = 0; i < groups.length; i += 1) {
      try { await restoreSavedGroup(groups[i]); }
      catch (err) { failed += 1; console.warn("light saved link restore failed", groups[i] && groups[i].label, err); }
    }
    if (typeof restoreMonthlyStatusSnapshot === "function") restoreMonthlyStatusSnapshot();
    if (typeof rebuildFromSelection === "function") rebuildFromSelection();
    syncDetailsForSelectedDay(false);
    if (typeof renderAll === "function") renderAll(failed ? "\uC77C\uBD80 \uC800\uC7A5 \uB9C1\uD06C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4." : "\uC800\uC7A5\uB41C \uB9C1\uD06C \uC790\uB8CC\uB97C \uBD88\uB7EC\uC654\uC2B5\uB2C8\uB2E4.");
    if (typeof fillSavedLinkInputs === "function") fillSavedLinkInputs();
    if (typeof renderLinkedDataList === "function") renderLinkedDataList();
    return hasLoadedSpreadsheetRows();
  }

  var previousSave = typeof saveDashboardState === "function" ? saveDashboardState : null;
  if (previousSave) {
    saveDashboardState = function () {
      writeLightGroups();
      var result = previousSave.apply(this, arguments);
      writeLightGroups();
      return result;
    };
  }
  var previousRestore = typeof restoreSavedDashboardState === "function" ? restoreSavedDashboardState : null;
  if (previousRestore) {
    restoreSavedDashboardState = async function () {
      var restored = false;
      try { restored = await previousRestore.apply(this, arguments); } catch (err) { restored = false; }
      if (restored && hasLoadedSpreadsheetRows()) {
        writeLightGroups();
        syncDetailsForSelectedDay(false);
        return true;
      }
      return await restoreLightGroups(true) || restored;
    };
  }

  var previousRenderDetails = typeof renderDetails === "function" ? renderDetails : null;
  if (previousRenderDetails && !previousRenderDetails.__detailDateLockV19) {
    renderDetails = function () {
      syncDetailsForSelectedDay(true);
      return previousRenderDetails.apply(this, arguments);
    };
    renderDetails.__detailDateLockV19 = true;
  }

  document.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) >= 0) {
      lastDetailPeriod = "";
      selectedDetailDate = "";
      setTimeout(function () {
        syncDetailsForSelectedDay(false);
        if (previousRenderDetails) previousRenderDetails();
      }, 30);
    }
    if (target.id === "detailDateSelect") {
      selectedDetailDate = target.value;
      setTimeout(function () {
        syncDetailsForSelectedDay(true);
        if (previousRenderDetails) previousRenderDetails();
      }, 20);
    }
  }, true);

  window.__restoreLightSavedLinksV19 = restoreLightGroups;
  window.__saveLightSavedLinksV19 = writeLightGroups;
  window.__syncDailyDetailDateOnlyV19 = syncDetailsForSelectedDay;
  window.addEventListener("beforeunload", writeLightGroups);
  document.addEventListener("visibilitychange", function () { if (document.hidden) writeLightGroups(); });
  setTimeout(function () {
    if (!hasLoadedSpreadsheetRows()) restoreLightGroups(false);
    else writeLightGroups();
    syncDetailsForSelectedDay(false);
    if (previousRenderDetails) previousRenderDetails();
  }, 2400);
  setInterval(function () {
    var now = syncDetailsForSelectedDay(true);
    if (now && [now.sel.year, now.sel.month, now.sel.week, selectedDetailDate, now.dayRows.length].join(":") !== lastDetailRowsKey && previousRenderDetails) previousRenderDetails();
  }, 900);
})();

// final-detail-render-date-only-v20-20260703
(function () {
  "use strict";
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  if (window.__detailRenderDateOnlyV20) return;
  window.__detailRenderDateOnlyV20 = true;
  function esc(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value == null ? "" : value);
    return String(value == null ? "" : value).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; });
  }
  function defect(value) {
    if (typeof formatDefect === "function") return formatDefect(value == null ? "" : value);
    return esc(value).replace(/\n/g, "<br />");
  }
  function image(row, index) {
    if (typeof imageMarkup === "function") return imageMarkup(row, index);
    return "";
  }
  function emptyRow() {
    return "<tr><td colspan='11' class='muted'>\uC120\uD0DD \uB0A0\uC9DC \uC790\uB8CC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>";
  }
  function drawDetailTable() {
    var table = document.getElementById("detailTable");
    if (!table) return;
    if (typeof window.__syncDailyDetailDateOnlyV19 === "function") window.__syncDailyDetailDateOnlyV19(true);
    if (typeof renderDetailDateSelect === "function") renderDetailDateSelect();
    var rows = window.state && Array.isArray(state.details) ? state.details : [];
    table.innerHTML = "<colgroup>" +
      "<col class='detail-col-idx' />" +
      "<col class='detail-col-category' />" +
      "<col class='detail-col-type' />" +
      "<col class='detail-col-brand' />" +
      "<col class='detail-col-source' />" +
      "<col class='detail-col-code' />" +
      "<col class='detail-col-color' />" +
      "<col class='detail-col-lot' />" +
      "<col class='detail-col-supplier' />" +
      "<col class='detail-col-defect' />" +
      "<col class='detail-col-image' />" +
      "</colgroup><thead><tr>" +
      "<th colspan='2'>\uAD6C\uBD84</th>" +
      "<th>\uC720\uD615</th>" +
      "<th>\uBE0C\uB79C\uB4DC</th>" +
      "<th>\uC6D0\uC778\uCC98</th>" +
      "<th>\uC81C\uD488\uCF54\uB4DC</th>" +
      "<th>\uC0C9\uC0C1</th>" +
      "<th>LOT NO</th>" +
      "<th>\uACF5\uAE09</th>" +
      "<th>\uD558\uC790\uB0B4\uC5ED</th>" +
      "<th class='image-cell'>\uC774\uBBF8\uC9C0</th>" +
      "</tr></thead><tbody>" +
      (rows.length ? rows.map(function (row, index) {
        return "<tr>" +
          "<td class='idx'>" + (index + 1) + "</td>" +
          "<td>" + esc(row.category) + "</td>" +
          "<td>" + esc(row.type) + "</td>" +
          "<td>" + esc(row.brand) + "</td>" +
          "<td>" + esc(row.source) + "</td>" +
          "<td>" + esc(row.code) + "</td>" +
          "<td>" + esc(row.color) + "</td>" +
          "<td>" + esc(row.lot) + "</td>" +
          "<td>" + esc(row.supplier) + "</td>" +
          "<td class='claim-text'>" + defect(row.defect) + "</td>" +
          "<td>" + image(row, index) + "</td>" +
          "</tr>";
      }).join("") : emptyRow()) +
      "</tbody>";
  }
  var previousRenderDetails = typeof renderDetails === "function" ? renderDetails : null;
  renderDetails = function () { drawDetailTable(); };
  renderDetails.__dateOnlyV20 = true;
  document.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect", "detailDateSelect"].indexOf(target.id) >= 0) {
      setTimeout(drawDetailTable, 25);
    }
  }, true);
  setTimeout(drawDetailTable, 600);
  setInterval(drawDetailTable, 1500);
})();

// emergency-dedupe-and-daily-receipt-v21-20260703
(function () {
  "use strict";
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  if (window.__emergencyDedupeAndDailyReceiptV21) return;
  window.__emergencyDedupeAndDailyReceiptV21 = true;

  try {
    if (!Object.prototype.hasOwnProperty.call(window, "state")) {
      Object.defineProperty(window, "state", {
        configurable: true,
        get: function () { return state; },
        set: function (next) { state = next; }
      });
    }
  } catch (err) {
    try { window.state = state; } catch (ignore) {}
  }

  var CAT_PENDING = "\uC2DC\uACF5\uBBF8\uACB0";
  var CAT_COMPLAINT = "\uACE0\uAC1D\uBD88\uB9CC";
  var CAT_SENS = "\uAC10\uC131/\uCDE8\uAE09";
  var CAT_SUM = "\uACC4";
  var CAT_PPM = "PPM";
  var CATEGORY_ORDER = [CAT_PENDING, CAT_COMPLAINT, CAT_SENS];
  var SOURCE_ORDER = ["1\uB77C\uC778", "3\uB77C\uC778", "4\uB77C\uC778", "7\uB77C\uC778"];
  var restoredDailyEvents = false;

  function id(name) { return document.getElementById(name); }
  function tx(value) { return value == null ? "" : String(value).trim(); }
  function n(value) { return Number(String(value == null ? "" : value).replace(/[^0-9.-]/g, "")) || 0; }
  function esc(value) {
    if (typeof escapeHtml === "function") return escapeHtml(value == null ? "" : value);
    return tx(value).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[ch]; });
  }
  function fmt(value) {
    if (typeof formatNumberValue === "function") return formatNumberValue(value);
    return Number(value || 0).toLocaleString("ko-KR");
  }
  function raw(row) {
    if (!row) return row;
    if (Array.isArray(row.__raw)) return row.__raw;
    if (row.__raw && typeof row.__raw === "object") return row.__raw;
    return row;
  }
  function cells(row) {
    var r = raw(row);
    if (!r) return [];
    if (Array.isArray(r)) return r;
    if (Array.isArray(r.__cells)) return r.__cells;
    if (Array.isArray(row && row.__cells)) return row.__cells;
    if (Array.isArray(r.__headers)) return r.__headers.map(function (key) { return r[key]; });
    return Object.keys(r).filter(function (key) { return key.indexOf("__") !== 0; }).map(function (key) { return r[key]; });
  }
  function cell(row, index) { return tx(cells(row)[index]); }
  function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    var s = tx(value);
    var m = s.match(/(20\d{2})[-/. ]?(\d{1,2})[-/. ]?(\d{1,2})/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    if (typeof parseDateFromText === "function") {
      var parsed = parseDateFromText(value);
      if (parsed) return parsed;
    }
    return null;
  }
  function stamp(date) { return date ? date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() : 0; }
  function dateLabel(date) { return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"); }
  function receiptNo(row) { return cell(row, 3) || cell(row, 1); }
  function validReceiptRow(row) {
    var d = parseDate(cell(row, 0));
    var no = receiptNo(row);
    return !!(d && no && !/(\uC811\uC218\uBC88\uD638|\uC811\uC218\uC77C\uC790|\uBC88\uD638|NO|No)/i.test(no));
  }
  function category(row) {
    if (cell(row, 13) === "0") return CAT_PENDING;
    var type = cell(row, 11);
    if (/\uCDE8\uAE09|\uAC10\uC131/.test(type)) return CAT_SENS;
    return CAT_COMPLAINT;
  }
  function categoryRank(value) { var idx = CATEGORY_ORDER.indexOf(value); return idx >= 0 ? idx : 99; }
  function sourceRank(value) {
    var source = tx(value);
    for (var i = 0; i < SOURCE_ORDER.length; i += 1) if (source.indexOf(SOURCE_ORDER[i]) >= 0) return i;
    return 99;
  }
  function rowAmount(row) { return n(cell(row, 17)); }
  function entryYear(entry) {
    var text = [entry.groupTitle, entry.label, entry.fileName, entry.sourceSheet].map(tx).join(" ");
    var m = text.match(/(?:20)?(\d{2})\s*\uB144/);
    if (m) return m[1];
    var d = parseDate(cell((entry.rows || [])[0], 0));
    return d ? String(d.getFullYear()).slice(-2) : "";
  }
  function entryMonth(entry) {
    var text = [entry.sourceSheet, entry.label, entry.fileName].map(tx).join(" ");
    var m = text.match(/(\d{1,2})\s*\uC6D4/);
    if (m) return Number(m[1]);
    var d = parseDate(cell((entry.rows || [])[0], 0));
    return d ? d.getMonth() + 1 : 0;
  }
  function uploadKey(entry) {
    var kind = entry.kind || "";
    if (kind === "cost") return [kind, entryYear(entry), entryMonth(entry), entry.sourceUrl || entry.groupKey || "", entry.sourceSheet || entry.label || ""].join("|");
    return [kind, entry.sourceUrl || entry.groupKey || "", entry.sourceSheet || "", entry.label || "", (entry.rows || []).length].join("|");
  }
  function compactEntries(entries) {
    var seen = new Map();
    (entries || []).forEach(function (entry) {
      var key = [entry.sourceSheet || "", entry.label || ""].join("|");
      if (!seen.has(key)) {
        seen.set(key, { label: entry.label || "", sourceSheet: entry.sourceSheet || "", selected: entry.selected !== false, excluded: Number(entry.excluded || 0) });
      } else {
        var kept = seen.get(key);
        kept.selected = kept.selected || entry.selected !== false;
        kept.excluded = Math.max(Number(kept.excluded || 0), Number(entry.excluded || 0));
      }
    });
    return Array.from(seen.values());
  }
  function compactGroups(groups) {
    var seen = new Map();
    (groups || []).forEach(function (group) {
      if (!group) return;
      var key = group.groupKey || group.sourceUrl || [group.kind, group.label, group.groupTitle].join("|");
      if (!seen.has(key)) {
        var copy = Object.assign({}, group);
        copy.groupKey = group.groupKey || key;
        copy.entries = compactEntries(group.entries || []);
        seen.set(key, copy);
      } else {
        var kept = seen.get(key);
        kept.entries = compactEntries((kept.entries || []).concat(group.entries || []));
      }
    });
    return Array.from(seen.values());
  }
  function dedupeUploads() {
    if (!Array.isArray(state.uploads)) return false;
    var seen = new Map();
    var next = [];
    state.uploads.forEach(function (entry) {
      var key = uploadKey(entry);
      if (!seen.has(key)) {
        seen.set(key, entry);
        next.push(entry);
        return;
      }
      var kept = seen.get(key);
      kept.selected = kept.selected || entry.selected;
      kept.excluded = Math.max(Number(kept.excluded || 0), Number(entry.excluded || 0));
      if ((!kept.images || !kept.images.length) && entry.images && entry.images.length) kept.images = entry.images;
    });
    if (next.length === state.uploads.length) return false;
    state.uploads = next;
    if (typeof savedLinkGroupsCache !== "undefined") savedLinkGroupsCache = compactGroups(savedLinkGroupsCache);
    return true;
  }
  function cleanLightStorage() {
    try {
      var key = "qualityClaimDashboard.lightSavedLinks.v19";
      var rawPayload = localStorage.getItem(key);
      if (!rawPayload) return;
      var payload = JSON.parse(rawPayload);
      if (!payload || !Array.isArray(payload.groups)) return;
      payload.groups = compactGroups(payload.groups);
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (err) {}
  }
  function selectedDaily() {
    var now = new Date();
    return {
      year: Number(id("dailyYearSelect") && id("dailyYearSelect").value) || now.getFullYear(),
      month: Number(id("dailyMonthSelect") && id("dailyMonthSelect").value) || now.getMonth() + 1,
      week: Number(id("dailyWeekSelect") && id("dailyWeekSelect").value) || 1
    };
  }
  function weekGroups(year, month) {
    if (typeof claimSummaryWeekGroups === "function") return claimSummaryWeekGroups(year, month) || [];
    var days = [];
    var last = new Date(year, month, 0).getDate();
    for (var day = 1; day <= last; day += 1) {
      var d = new Date(year, month - 1, day);
      if (d.getDay() !== 0 && d.getDay() !== 6) days.push(d);
    }
    return [days.slice(0, 5), days.slice(5, 10), days.slice(10, 15), days.slice(15, 22), days.slice(22)].filter(function (group) { return group.length; });
  }
  function allReceiptHistoryRows() {
    var out = [];
    (state.uploads || []).filter(function (entry) { return entry.kind === "receiptHistory"; }).forEach(function (entry) {
      (entry.rows || []).forEach(function (row, index) {
        if (!validReceiptRow(row)) return;
        var d = parseDate(cell(row, 0));
        out.push({ entry: entry, row: row, index: index, date: d, stamp: stamp(d), year: d.getFullYear(), month: d.getMonth() + 1 });
      });
    });
    return out;
  }
  function weekItems(sel) {
    var days = weekGroups(sel.year, sel.month)[Math.max(0, sel.week - 1)] || [];
    var daySet = new Set(days.map(stamp));
    return allReceiptHistoryRows().filter(function (item) { return item.year === sel.year && item.month === sel.month && daySet.has(item.stamp); });
  }
  function detailRow(item, index) {
    var row = item.row;
    return {
      number: n(cell(row, 1)) || index + 1,
      category: category(row),
      type: cell(row, 11),
      brand: cell(row, 2),
      source: cell(row, 9),
      code: cell(row, 5),
      color: cell(row, 6),
      lot: cell(row, 7) || ".",
      supplier: cell(row, 8),
      defect: cell(row, 12),
      amount: rowAmount(row),
      date: item.date,
      raw: row,
      imageKey: [dateLabel(item.date), receiptNo(row), cell(row, 5), cell(row, 6)].join("|")
    };
  }
  function compareDetail(a, b) {
    return categoryRank(a.category) - categoryRank(b.category) ||
      sourceRank(a.source) - sourceRank(b.source) ||
      tx(a.source).localeCompare(tx(b.source), "ko", { numeric: true }) ||
      tx(a.code).localeCompare(tx(b.code), "ko", { numeric: true }) ||
      a.number - b.number;
  }
  function setDetailOptions(items) {
    var map = new Map();
    items.forEach(function (item) { map.set(String(item.stamp), item.date); });
    detailDateOptions = Array.from(map.entries()).map(function (pair) { return { value: pair[0], label: dateLabel(pair[1]) }; }).sort(function (a, b) { return Number(a.value) - Number(b.value); });
    if (!detailDateOptions.length) {
      selectedDetailDate = "";
      state.details = [];
      if (typeof renderDetailDateSelect === "function") renderDetailDateSelect();
      return;
    }
    if (!selectedDetailDate || !detailDateOptions.some(function (option) { return option.value === selectedDetailDate; })) {
      selectedDetailDate = detailDateOptions[detailDateOptions.length - 1].value;
    }
    var selectedStamp = Number(selectedDetailDate);
    state.details = items.filter(function (item) { return item.stamp === selectedStamp; }).map(detailRow).sort(compareDetail);
    if (typeof renderDetailDateSelect === "function") renderDetailDateSelect();
  }
  function topItems(items) {
    var pending = items.filter(function (item) { return category(item.row) === CAT_PENDING; });
    var basis = pending.length ? pending : items.slice().sort(function (a, b) { return rowAmount(b.row) - rowAmount(a.row); }).slice(0, 1);
    var map = new Map();
    basis.forEach(function (item) {
      var label = [cell(item.row, 5), cell(item.row, 6)].filter(Boolean).join(" / ");
      if (!label) return;
      map.set(label, (map.get(label) || 0) + 1);
    });
    return Array.from(map.entries()).map(function (pair) { return { label: pair[0], count: pair[1] }; }).sort(function (a, b) { return b.count - a.count || a.label.localeCompare(b.label, "ko", { numeric: true }); }).slice(0, 5);
  }
  function renderDailyCards(items) {
    var box = id("dailyReceiptCards");
    if (!box) return;
    var loss = items.reduce(function (sum, item) { return sum + rowAmount(item.row); }, 0);
    var top = topItems(items);
    var first = top[0] || { label: "-", count: 0 };
    box.innerHTML =
      '<article class="daily-receipt-card"><span>\uC811\uC218\uAC74\uC218</span><strong>' + fmt(items.length) + '</strong><em>\uAC74</em><small>\uC120\uD0DD \uC8FC\uCC28 \uC790\uB8CC \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC190\uC2E4\uAE08\uC561</span><strong>' + fmt(loss) + '</strong><em>\uC6D0</em><small>R\uC5F4 \uD569\uACC4 \uAE08\uC561 \uAE30\uC900</small></article>' +
      '<article class="daily-receipt-card"><span>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="purple">' + esc(first.label) + '</strong><em>' + fmt(first.count) + '\uAC74</em><small>\uC2DC\uACF5\uBBF8\uACB0 \uD488\uBAA9 TOP 5</small><div class="daily-receipt-tags">' +
      top.map(function (item) { return '<span>' + esc(item.label) + ' ' + fmt(item.count) + '\uAC74</span>'; }).join("") +
      '</div></article>';
  }
  function mainNumber(value) { return Number((String(value == null ? "" : value).match(/^-?\d+/) || [value || 0])[0]) || 0; }
  function targetCell(main, target, show) { return show ? String(main || 0) + "(" + target + ")" : "(" + target + ")"; }
  function prevYearStats(year) {
    var stats = {};
    CATEGORY_ORDER.forEach(function (cat) { stats[cat] = { total: 0, avg: 0, months: {} }; });
    allReceiptHistoryRows().filter(function (item) { return item.year === year; }).forEach(function (item) {
      var cat = category(item.row);
      if (!stats[cat]) return;
      stats[cat].months[item.month] = (stats[cat].months[item.month] || 0) + 1;
    });
    Object.keys(stats).forEach(function (cat) {
      var values = Object.keys(stats[cat].months).map(function (month) { return stats[cat].months[month]; });
      stats[cat].total = values.reduce(function (sum, value) { return sum + value; }, 0);
      stats[cat].avg = values.length ? Math.round(stats[cat].total / values.length) : 0;
    });
    return stats;
  }
  function rebuildDailySummary(sel) {
    if (typeof buildClaimSummaryMeta !== "function" || typeof summaryDynamicKeys !== "function") return false;
    var groups = weekGroups(sel.year, sel.month);
    var dates = groups[Math.max(0, sel.week - 1)] || [];
    var end = dates.length ? dates[dates.length - 1] : new Date(sel.year, sel.month - 1, 1);
    var meta = buildClaimSummaryMeta(end);
    state.summaryMeta = meta;
    var keys = summaryDynamicKeys(meta);
    var prev = prevYearStats(sel.year - 1);
    var rows = CATEGORY_ORDER.map(function (cat) {
      var stat = prev[cat] || { total: 0, avg: 0 };
      var row = { category: cat, prevTotal: stat.total || 0, prevAvg: stat.avg || 0 };
      keys.forEach(function (key) { if (!(key in row)) row[key] = 0; });
      return row;
    });
    var byCat = {};
    rows.forEach(function (row) { byCat[row.category] = row; });
    var endStamp = stamp(end);
    allReceiptHistoryRows().filter(function (item) { return item.year === sel.year; }).forEach(function (item) {
      var row = byCat[category(item.row)];
      if (!row) return;
      if (item.month < meta.currentMonth) { row["m" + item.month] = (Number(row["m" + item.month] || 0)) + 1; return; }
      if (item.month !== meta.currentMonth || item.stamp > endStamp) return;
      var preIndex = meta.preWeeks.findIndex(function (week) { return (week.dates || []).some(function (date) { return stamp(date) === item.stamp; }); });
      if (preIndex >= 0) row[meta.preWeeks[preIndex].key] = (Number(row[meta.preWeeks[preIndex].key] || 0)) + 1;
      var day = meta.dayColumns.find(function (col) { return stamp(col.date) === item.stamp; });
      if (day) row[day.key] = (Number(row[day.key] || 0)) + 1;
      row[meta.monthTotalKey] = (Number(row[meta.monthTotalKey] || 0)) + 1;
    });
    rows.forEach(function (row) {
      var targets = row.category === CAT_COMPLAINT ? { daily: 3, month: 50, future: 50, total: 600, avg: 50 } : { daily: 0, month: 0, future: 0, total: 0, avg: 0 };
      meta.dayColumns.forEach(function (col) { var main = Number(row[col.key] || 0); row[col.key] = targetCell(main, targets.daily, main > 0 || stamp(col.date) <= endStamp); });
      row[meta.monthTotalKey] = targetCell(Number(row[meta.monthTotalKey] || 0), targets.month, true);
      meta.postMonths.forEach(function (month) { row["m" + month] = targetCell(0, targets.future, false); });
      var total = 0, activeMonths = 0;
      for (var m = 1; m <= 12; m += 1) { var key = m === meta.currentMonth ? meta.monthTotalKey : "m" + m; var value = mainNumber(row[key]); total += value; if (value > 0) activeMonths += 1; }
      row.total = targetCell(total, targets.total, true);
      row.avg = targetCell(activeMonths ? Math.round(total / activeMonths) : 0, targets.avg, true);
    });
    var sum = { category: CAT_SUM, prevTotal: rows.reduce(function (s, row) { return s + Number(row.prevTotal || 0); }, 0), prevAvg: rows.reduce(function (s, row) { return s + Number(row.prevAvg || 0); }, 0) };
    keys.forEach(function (key) {
      var main = rows.reduce(function (s, row) { return s + mainNumber(row[key]); }, 0);
      if (meta.dayColumns.some(function (col) { return col.key === key; })) sum[key] = targetCell(main, 3, true);
      else if (key === meta.monthTotalKey) sum[key] = targetCell(main, 50, true);
      else if (/^m\d+/.test(key) && meta.postMonths.some(function (month) { return key === "m" + month; })) sum[key] = targetCell(0, 50, false);
      else sum[key] = main;
    });
    var totalMain = 0, active = 0;
    for (var sm = 1; sm <= 12; sm += 1) { var sk = sm === meta.currentMonth ? meta.monthTotalKey : "m" + sm; var sv = mainNumber(sum[sk]); totalMain += sv; if (sv > 0) active += 1; }
    sum.total = targetCell(totalMain, 600, true);
    sum.avg = targetCell(active ? Math.round(totalMain / active) : 0, 50, true);
    var oldPpm = (state.summary || []).find(function (row) { return row.category === CAT_PPM; });
    var ppm = oldPpm || { category: CAT_PPM, prevTotal: 1011, prevAvg: "", m1: 865, m2: 955, m3: 1139, m4: 1325, m5: 964, m6: 903, m6Total: 903, avg: 1037 };
    state.summary = rows.concat([sum, ppm]);
    return true;
  }
  function refreshDaily() {
    dedupeUploads();
    var sel = selectedDaily();
    var items = weekItems(sel);
    rebuildDailySummary(sel);
    setDetailOptions(items);
    renderDailyCards(items);
    if (typeof renderSummary === "function") renderSummary();
    if (typeof renderDetails === "function") renderDetails();
  }

  var oldAddUploadEntry = typeof addUploadEntry === "function" ? addUploadEntry : null;
  if (oldAddUploadEntry) {
    addUploadEntry = function () { var result = oldAddUploadEntry.apply(this, arguments); dedupeUploads(); cleanLightStorage(); return result; };
  }
  var oldRenderAll = typeof renderAll === "function" ? renderAll : null;
  if (oldRenderAll && !oldRenderAll.__dedupeV21) {
    renderAll = function () { dedupeUploads(); cleanLightStorage(); return oldRenderAll.apply(this, arguments); };
    renderAll.__dedupeV21 = true;
  }
  var oldRebuild = typeof rebuildFromSelection === "function" ? rebuildFromSelection : null;
  if (oldRebuild && !oldRebuild.__dedupeV21) {
    rebuildFromSelection = function () {
      dedupeUploads();
      if ((typeof activeDashboardTab === "undefined" || activeDashboardTab === "daily") && id("dailyReceiptCards")) { refreshDaily(); return; }
      return oldRebuild.apply(this, arguments);
    };
    rebuildFromSelection.__dedupeV21 = true;
  }
  var oldSave = typeof saveDashboardState === "function" ? saveDashboardState : null;
  if (oldSave && !oldSave.__dedupeV21) {
    saveDashboardState = function () { dedupeUploads(); cleanLightStorage(); return oldSave.apply(this, arguments); };
    saveDashboardState.__dedupeV21 = true;
  }

  window.__dedupeDashboardUploadsV21 = dedupeUploads;
  window.__refreshDailyFromReceiptHistoryV21 = refreshDaily;

  document.addEventListener("change", function (event) {
    var target = event.target;
    if (!target) return;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect"].indexOf(target.id) >= 0) { selectedDetailDate = ""; setTimeout(refreshDaily, 20); }
    if (target.id === "detailDateSelect") {
      setTimeout(function () { var sel = selectedDaily(); setDetailOptions(weekItems(sel)); if (typeof renderDetails === "function") renderDetails(); }, 20);
    }
  }, true);

  setTimeout(function () {
    var changed = dedupeUploads();
    cleanLightStorage();
    if (changed && typeof saveDashboardState === "function") saveDashboardState(true);
    if (typeof activeDashboardTab === "undefined" || activeDashboardTab === "daily") refreshDaily();
    else if (changed && typeof renderAll === "function") renderAll("\uC911\uBCF5 \uBCF5\uC6D0 \uC790\uB8CC\uB97C \uC815\uB9AC\uD588\uC2B5\uB2C8\uB2E4.");
  }, 900);
})();

// hard-stop-duplicate-restore-and-daily-select-watch-v22-20260703
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  function getState() {
    try { return typeof state !== "undefined" ? state : window.state; } catch (err) { return window.state; }
  }
  function saveQuietly() {
    try { if (typeof saveDashboardState === "function") saveDashboardState(true); } catch (err) {}
  }
  function runDedupe() {
    var changed = false;
    try {
      if (typeof window.__dedupeDashboardUploadsV21 === "function") changed = !!window.__dedupeDashboardUploadsV21();
    } catch (err) {}
    return changed;
  }
  function dedupeAndSave() {
    if (runDedupe()) saveQuietly();
  }
  function cleanDuplicateLightGroups() {
    try {
      var key = "qualityClaimDashboard.lightSavedLinks.v19";
      var raw = localStorage.getItem(key);
      if (!raw) return;
      var payload = JSON.parse(raw);
      if (!payload || !Array.isArray(payload.groups)) return;
      var groupSeen = new Map();
      payload.groups.forEach(function (group) {
        if (!group) return;
        var groupKey = group.groupKey || group.sourceUrl || [group.kind, group.groupTitle, group.label].join("|");
        if (!groupSeen.has(groupKey)) {
          var copy = Object.assign({}, group);
          var entrySeen = new Map();
          (group.entries || []).forEach(function (entry) {
            var label = String(entry && (entry.sourceSheet || entry.label || ""));
            if (!entrySeen.has(label)) entrySeen.set(label, Object.assign({}, entry));
            else {
              var kept = entrySeen.get(label);
              kept.selected = kept.selected || entry.selected !== false;
              kept.excluded = Math.max(Number(kept.excluded || 0), Number(entry.excluded || 0));
            }
          });
          copy.entries = Array.from(entrySeen.values());
          groupSeen.set(groupKey, copy);
        } else {
          var keptGroup = groupSeen.get(groupKey);
          var merged = (keptGroup.entries || []).concat(group.entries || []);
          var mergedSeen = new Map();
          merged.forEach(function (entry) {
            var label = String(entry && (entry.sourceSheet || entry.label || ""));
            if (!mergedSeen.has(label)) mergedSeen.set(label, Object.assign({}, entry));
            else {
              var kept = mergedSeen.get(label);
              kept.selected = kept.selected || entry.selected !== false;
              kept.excluded = Math.max(Number(kept.excluded || 0), Number(entry.excluded || 0));
            }
          });
          keptGroup.entries = Array.from(mergedSeen.values());
        }
      });
      payload.groups = Array.from(groupSeen.values());
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (err) {}
  }
  if (typeof restoreSavedGroup === "function" && !restoreSavedGroup.__dedupeV22) {
    var oldRestoreSavedGroupV22 = restoreSavedGroup;
    restoreSavedGroup = async function () {
      var result = await oldRestoreSavedGroupV22.apply(this, arguments);
      cleanDuplicateLightGroups();
      dedupeAndSave();
      if (typeof activeDashboardTab === "undefined" || activeDashboardTab === "daily") {
        try { if (typeof window.__refreshDailyFromReceiptHistoryV21 === "function") window.__refreshDailyFromReceiptHistoryV21(); } catch (err) {}
      }
      return result;
    };
    restoreSavedGroup.__dedupeV22 = true;
  }
  var dedupeRuns = 0;
  var dedupeTimer = setInterval(function () {
    dedupeRuns += 1;
    cleanDuplicateLightGroups();
    dedupeAndSave();
    if (dedupeRuns >= 20) clearInterval(dedupeTimer);
  }, 600);
  window.addEventListener("focus", function () { cleanDuplicateLightGroups(); dedupeAndSave(); }, true);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) { cleanDuplicateLightGroups(); dedupeAndSave(); } }, true);

  function currentDailyKey() {
    var y = document.getElementById("dailyYearSelect");
    var m = document.getElementById("dailyMonthSelect");
    var w = document.getElementById("dailyWeekSelect");
    if (!y || !m || !w) return "";
    return [y.value, m.value, w.value].join("|");
  }
  var lastDailyKey = "";
  function refreshDailyIfNeeded(force) {
    var key = currentDailyKey();
    if (!key) return;
    if (!force && key === lastDailyKey) return;
    lastDailyKey = key;
    if (typeof activeDashboardTab !== "undefined" && activeDashboardTab !== "daily") return;
    try {
      if (typeof window.__refreshDailyFromReceiptHistoryV21 === "function") window.__refreshDailyFromReceiptHistoryV21();
    } catch (err) {}
  }
  setInterval(function () { refreshDailyIfNeeded(false); }, 350);
  setTimeout(function () { cleanDuplicateLightGroups(); dedupeAndSave(); refreshDailyIfNeeded(true); }, 80);
  setTimeout(function () { cleanDuplicateLightGroups(); dedupeAndSave(); refreshDailyIfNeeded(true); }, 1600);
  window.__dashboardEmergencyCleanV22 = function () { cleanDuplicateLightGroups(); dedupeAndSave(); refreshDailyIfNeeded(true); };
})();

// stable-daily-persistence-v23-20260703
(function () {
  if (window.__USE_EXTERNAL_DAILY_STABLE) return;
  if (window.__stableDailyPersistenceV23) return;
  window.__stableDailyPersistenceV23 = true;

  var STORAGE_KEY = (typeof dashboardStorageKey === "string" && dashboardStorageKey) || "qualityClaimDashboard.savedLinks.v1";
  var serverSaveTimer = null;
  var dailyApplying = false;
  var lastDailyKey = "";

  var TEXT = {
    pending: "\uC2DC\uACF5\uBBF8\uACB0",
    complaint: "\uACE0\uAC1D\uBD88\uB9CC",
    sens: "\uAC10\uC131/\uCDE8\uAE09",
    total: "\uACC4",
    ppm: "PPM",
    qualityCost: "\uD488\uC9C8 \uBE44\uC6A9",
    noData: "\uC5C5\uB85C\uB4DC\uB41C \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
    receiptSummary: "\uACE0\uAC1D\uD074\uB808\uC784 \uC811\uC218\uD604\uD669",
    receiptDetail: "\uACE0\uAC1D\uD074\uB808\uC784 \uC811\uC218 \uC138\uBD80\uB0B4\uC5ED",
    dailyTitle: "\uC77C\uC811\uC218\uD604\uD669",
    item: "\uD488\uBAA9",
    count: "\uC811\uC218\uAC74\uC218",
    loss: "\uC190\uC2E4\uAE08\uC561",
    mainItem: "\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9"
  };

  function getState() {
    try {
      if (typeof state !== "undefined" && state) return state;
    } catch (_) {}
    window.state = window.state || {};
    return window.state;
  }
  try {
    if (!Object.getOwnPropertyDescriptor(window, "state") && typeof state !== "undefined") {
      Object.defineProperty(window, "state", {
        configurable: true,
        get: function () { return state; },
        set: function (v) { state = v; }
      });
    }
  } catch (_) {}

  function asText(v) { return v == null ? "" : String(v).trim(); }
  function onlyNumber(v) {
    if (typeof v === "number" && isFinite(v)) return v;
    var s = asText(v).replace(/[^0-9.\-]/g, "");
    if (!s || s === "-" || s === ".") return 0;
    var n = Number(s);
    return isFinite(n) ? n : 0;
  }
  function comma(n) { return Math.round(Number(n) || 0).toLocaleString("ko-KR"); }
  function won(n) { return comma(n) + "\uC6D0"; }
  function pad2(n) { return String(n).padStart(2, "0"); }
  function isoDate(y, m, d) { return y + "-" + pad2(m) + "-" + pad2(d); }
  function dateKeyFromDate(dt) { return isoDate(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()); }
  function monthFromAny(v) {
    var s = asText(v);
    var m = s.match(/(?:^|[^0-9])(1[0-2]|[1-9])\s*(?:\uC6D4|월|\?\?|\b)/);
    if (m) return Number(m[1]);
    m = s.match(/(?:^|[^0-9])(1[0-2]|[1-9])(?:[^0-9]|$)/);
    return m ? Number(m[1]) : 0;
  }
  function yearFromAny(v) {
    var s = asText(v);
    var m = s.match(/(20\d{2}|2\d)\s*(?:\uB144|년)?/);
    if (!m) return 0;
    var y = Number(m[1]);
    return y < 100 ? 2000 + y : y;
  }
  function normalizeYear(v) {
    var y = yearFromAny(v);
    return y || 0;
  }
  function cellsOf(row) {
    if (!row) return [];
    if (Array.isArray(row)) return row;
    if (Array.isArray(row.__raw)) return row.__raw;
    if (Array.isArray(row.cells)) return row.cells;
    if (Array.isArray(row.values)) return row.values;
    if (Array.isArray(row.__cells)) return row.__cells;
    return [];
  }
  function cell(row, idx) {
    var c = cellsOf(row);
    return idx >= 0 && idx < c.length ? c[idx] : "";
  }
  function parseDateValue(v) {
    if (v instanceof Date && !isNaN(v)) return v;
    if (typeof v === "number" && isFinite(v) && v > 20000) {
      var ms = Math.round((v - 25569) * 86400 * 1000);
      var d0 = new Date(ms);
      return new Date(d0.getUTCFullYear(), d0.getUTCMonth(), d0.getUTCDate());
    }
    var s = asText(v);
    if (!s) return null;
    var m = s.match(/(20\d{2})\D+(\d{1,2})\D+(\d{1,2})/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    m = s.match(/^(\d{2})(\d{2})(\d{2})$/);
    if (m) return new Date(2000 + Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return null;
  }
  function validReceiptRow(row) {
    var d = parseDateValue(cell(row, 0));
    if (!d) return false;
    var header = cellsOf(row).slice(0, 18).map(asText).join(" ");
    if (/접수일자|접수번호|부품코드|하자내역|미결구분/.test(header) && !/^20\d{2}/.test(asText(cell(row, 0)))) return false;
    return !!(asText(cell(row, 3)) || asText(cell(row, 5)) || asText(cell(row, 12)) || asText(cell(row, 1)));
  }
  function categoryFromRow(row) {
    if (asText(cell(row, 13)) === "0") return TEXT.pending;
    var typ = asText(cell(row, 11));
    if (/감성|취급/.test(typ)) return TEXT.sens;
    return TEXT.complaint;
  }
  function receiptRowToItem(row, entry, rowIndex) {
    var d = parseDateValue(cell(row, 0));
    var item = {
      raw: cellsOf(row).slice(),
      date: d,
      dateKey: dateKeyFromDate(d),
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      receiptNo: asText(cell(row, 3)) || asText(cell(row, 1)) || ("row-" + rowIndex),
      category: categoryFromRow(row),
      type: asText(cell(row, 11)) || "-",
      brand: asText(cell(row, 2)) || "-",
      source: asText(cell(row, 9)) || "-",
      code: asText(cell(row, 5)) || "-",
      color: asText(cell(row, 6)) || "-",
      lot: asText(cell(row, 7)) || ".",
      supplier: asText(cell(row, 8)) || "-",
      defect: asText(cell(row, 12)) || "",
      amount: onlyNumber(cell(row, 17)) || onlyNumber(cell(row, 16)) || onlyNumber(cell(row, 15)) || 0,
      entryTitle: entry && entry.title,
      rowIndex: rowIndex || 0
    };
    return item;
  }
  function allReceiptHistoryItems() {
    var st = getState();
    var uploads = Array.isArray(st.uploads) ? st.uploads : [];
    var out = [];
    uploads.forEach(function (entry) {
      var kind = entry.kind || entry.type || entry.groupKind;
      if (kind !== "receiptHistory") return;
      var rows = Array.isArray(entry.rows) ? entry.rows : [];
      rows.forEach(function (row, i) {
        if (validReceiptRow(row)) out.push(receiptRowToItem(row, entry, i));
      });
    });
    return out;
  }
  function itemKey(it) {
    return [it.dateKey, it.receiptNo, it.code, it.color, it.category, it.defect, it.rowIndex].join("|");
  }
  function uniqueItems(items) {
    var map = new Map();
    (items || []).forEach(function (it) { if (!map.has(itemKey(it))) map.set(itemKey(it), it); });
    return Array.from(map.values());
  }
  function sourceRank(s) {
    s = asText(s);
    if (/1\s*라인|1라인/.test(s)) return 1;
    if (/3\s*라인|3라인/.test(s)) return 2;
    if (/4\s*라인|4라인/.test(s)) return 3;
    if (/7\s*라인|7라인/.test(s)) return 4;
    return 9;
  }
  function categoryRank(c) {
    if (c === TEXT.pending) return 1;
    if (c === TEXT.complaint) return 2;
    if (c === TEXT.sens) return 3;
    return 9;
  }
  function sortDetailRows(rows) {
    return rows.slice().sort(function (a, b) {
      return categoryRank(a.category) - categoryRank(b.category) ||
        sourceRank(a.source) - sourceRank(b.source) ||
        a.source.localeCompare(b.source, "ko") ||
        a.code.localeCompare(b.code, "ko") ||
        a.dateKey.localeCompare(b.dateKey);
    });
  }
  function summarizeTopItems(rows, limit, pendingOnlyPreferred) {
    var base = rows || [];
    if (pendingOnlyPreferred) {
      var pending = base.filter(function (r) { return r.category === TEXT.pending; });
      if (pending.length) base = pending;
    }
    var map = new Map();
    base.forEach(function (r) {
      var key = (r.code || "-") + " / " + (r.color || "-");
      var cur = map.get(key) || { key: key, qty: 0, amount: 0 };
      cur.qty += 1;
      cur.amount += r.amount || 0;
      map.set(key, cur);
    });
    return Array.from(map.values()).sort(function (a, b) { return b.qty - a.qty || b.amount - a.amount || a.key.localeCompare(b.key); }).slice(0, limit || 5);
  }
  function monday(d) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var day = x.getDay() || 7;
    x.setDate(x.getDate() - day + 1);
    return x;
  }
  function fallbackWeekGroups(year, month) {
    var end = new Date(year, month, 0).getDate();
    var byWeek = [];
    var current = [];
    for (var day = 1; day <= end; day++) {
      var dt = new Date(year, month - 1, day);
      var dow = dt.getDay();
      if (dow === 0 || dow === 6) continue;
      if (!current.length) current.push(dt);
      else {
        var prevMon = monday(current[0]).getTime();
        var thisMon = monday(dt).getTime();
        if (prevMon === thisMon) current.push(dt);
        else { byWeek.push(current); current = [dt]; }
      }
    }
    if (current.length) byWeek.push(current);
    if (byWeek.length > 1 && byWeek[0].length <= 2) byWeek[1] = byWeek[0].concat(byWeek[1]), byWeek.shift();
    if (byWeek.length > 1 && byWeek[byWeek.length - 1].length <= 2) byWeek[byWeek.length - 2] = byWeek[byWeek.length - 2].concat(byWeek.pop());
    return byWeek.map(function (g, i) { return { label: (i + 1) + "\uC8FC", days: g.map(dateKeyFromDate) }; });
  }
  function getWeekGroups(year, month) {
    try {
      if (typeof claimSummaryWeekGroups === "function") {
        var raw = claimSummaryWeekGroups(year, month) || [];
        var groups = raw.map(function (g, idx) {
          var days = (g.days || g.dates || g || []).map(function (d) {
            if (d instanceof Date) return dateKeyFromDate(d);
            var parsed = parseDateValue(d);
            return parsed ? dateKeyFromDate(parsed) : asText(d);
          }).filter(Boolean);
          return { label: g.label || ((idx + 1) + "\uC8FC"), days: days };
        }).filter(function (g) { return g.days.length; });
        if (groups.length) return groups;
      }
    } catch (_) {}
    return fallbackWeekGroups(year, month);
  }
  function getDailySelection() {
    var now = new Date();
    var ySel = document.getElementById("dailyYearSelect");
    var mSel = document.getElementById("dailyMonthSelect");
    var wSel = document.getElementById("dailyWeekSelect");
    var year = Number(asText(ySel && ySel.value).replace(/[^0-9]/g, "")) || now.getFullYear();
    var month = Number(asText(mSel && mSel.value).replace(/[^0-9]/g, "")) || (now.getMonth() + 1);
    var weekNo = Number(asText(wSel && wSel.value).replace(/[^0-9]/g, "")) || 1;
    var groups = getWeekGroups(year, month);
    if (weekNo > groups.length) weekNo = groups.length || 1;
    return { year: year, month: month, weekNo: weekNo, groups: groups, week: groups[weekNo - 1] || { label: weekNo + "\uC8FC", days: [] } };
  }
  function ensureDailyControls() {
    var ySel = document.getElementById("dailyYearSelect");
    var mSel = document.getElementById("dailyMonthSelect");
    var wSel = document.getElementById("dailyWeekSelect");
    if (!ySel || !mSel || !wSel) return;
    var now = new Date();
    if (!ySel.options.length) {
      for (var y = 2024; y <= 2027; y++) ySel.appendChild(new Option(y + "\uB144", String(y)));
      ySel.value = String(now.getFullYear());
    }
    if (!mSel.options.length) {
      for (var m = 1; m <= 12; m++) mSel.appendChild(new Option(m + "\uC6D4", String(m)));
      mSel.value = String(now.getMonth() + 1);
    }
    var sel = getDailySelection();
    var old = Number(asText(wSel.value).replace(/[^0-9]/g, "")) || 1;
    var need = sel.groups.length || 1;
    if (wSel.options.length !== need) {
      wSel.innerHTML = "";
      for (var i = 1; i <= need; i++) wSel.appendChild(new Option(i + "\uC8FC", String(i)));
      wSel.value = String(Math.min(old, need));
    }
  }
  function countRows(rows) {
    return rows.length;
  }
  function categoryCounts(rows) {
    var cats = [TEXT.pending, TEXT.complaint, TEXT.sens];
    var out = {};
    cats.forEach(function (c) { out[c] = 0; });
    rows.forEach(function (r) { if (out[r.category] != null) out[r.category] += 1; });
    return out;
  }
  function renderDailyCards(rows) {
    var el = document.getElementById("dailyReceiptCards");
    if (!el) return;
    var total = countRows(rows);
    var loss = rows.reduce(function (s, r) { return s + (r.amount || 0); }, 0);
    var top = summarizeTopItems(rows, 5, true);
    var main = top[0] || { key: "-", qty: 0 };
    el.innerHTML = "" +
      "<div class=\"metric-card\"><div class=\"metric-title\">" + TEXT.count + "</div><div class=\"metric-value\">" + comma(total) + "<span>\uAC74</span></div><div class=\"metric-note\">\uC120\uD0DD \uC8FC\uCC28 \uC790\uB8CC \uAE30\uC900</div></div>" +
      "<div class=\"metric-card\"><div class=\"metric-title\">" + TEXT.loss + "</div><div class=\"metric-value\">" + comma(loss) + "<span>\uC6D0</span></div><div class=\"metric-note\">R\uC5F4 \uD569\uACC4 \uAE08\uC561 \uAE30\uC900</div></div>" +
      "<div class=\"metric-card\"><div class=\"metric-title\">" + TEXT.mainItem + "</div><div class=\"metric-value purple\">" + main.key + " <span>" + comma(main.qty) + "\uAC74</span></div><div class=\"metric-note\">\uC2DC\uACF5\uBBF8\uACB0 \uD488\uBAA9 TOP 5</div><div class=\"pill-row\">" + top.map(function (t) { return "<span class=\"mini-pill\">" + t.key + " " + comma(t.qty) + "\uAC74</span>"; }).join("") + "</div></div>";
  }
  function td(html, cls) { return "<td" + (cls ? " class=\"" + cls + "\"" : "") + ">" + html + "</td>"; }
  function th(html, extra) { return "<th" + (extra || "") + ">" + html + "</th>"; }
  function cellHtml(v, target, red) {
    var val = Number(v) || 0;
    var main = val ? comma(val) : "-";
    if (target != null) {
      if (!val) main = "0";
      main += "<span class=\"target-text\">(" + comma(target) + ")</span>";
    }
    return red && val ? "<span class=\"today-red\">" + main + "</span>" : main;
  }
  function renderSummaryStable(items) {
    var table = document.getElementById("summaryTable");
    if (!table) return;
    var sel = getDailySelection();
    var cats = [TEXT.pending, TEXT.complaint, TEXT.sens];
    var yearItems = items.filter(function (r) { return r.year === sel.year; });
    var prevItems = items.filter(function (r) { return r.year === sel.year - 1; });
    var groups = sel.groups;
    var selectedDays = new Set((sel.week && sel.week.days) || []);
    var prevGroups = groups.slice(0, Math.max(0, sel.weekNo - 1));
    var monthName = sel.month + "\uC6D4";
    var prevYearLabel = String(sel.year - 1).slice(2) + "\uB144";
    var preMonths = [];
    for (var m = 1; m < sel.month; m++) preMonths.push(m);
    var postMonths = [];
    for (var pm = sel.month + 1; pm <= 12; pm++) postMonths.push(pm);
    function byCat(rows, cat) { return rows.filter(function (r) { return r.category === cat; }).length; }
    function prevTotal(cat) { return byCat(prevItems, cat); }
    function monthCount(cat, y, m) { return byCat(items.filter(function (r) { return r.year === y && r.month === m; }), cat); }
    function groupCount(cat, group) { var set = new Set(group.days || []); return byCat(yearItems.filter(function (r) { return r.month === sel.month && set.has(r.dateKey); }), cat); }
    function dayCount(cat, day) { return byCat(yearItems.filter(function (r) { return r.dateKey === day; }), cat); }
    function selectedMonthTotal(cat) { return byCat(yearItems.filter(function (r) { return r.month === sel.month; }), cat); }
    function selectedYearTotal(cat) { return byCat(yearItems, cat); }
    var head1 = "<tr>" + th("\uAD6C\uBD84", " rowspan=\"3\"") + th(prevYearLabel, " colspan=\"2\"");
    preMonths.forEach(function (m) { head1 += th(m + "\uC6D4", " rowspan=\"3\""); });
    head1 += th(monthName, " colspan=\"" + (prevGroups.length + selectedDays.size + 1) + "\"");
    postMonths.forEach(function (m) { head1 += th(m + "\uC6D4", " rowspan=\"3\""); });
    head1 += th("\uD569\uACC4", " rowspan=\"3\"") + th("\uC6D4<br>\uD3C9\uADE0", " rowspan=\"3\"") + "</tr>";
    var head2 = "<tr>" + th("\uD569\uACC4", " rowspan=\"2\"") + th("\uC6D4<br>\uD3C9\uADE0", " rowspan=\"2\"");
    prevGroups.forEach(function (g) { head2 += th(g.label, " rowspan=\"2\""); });
    head2 += th(sel.week.label, " colspan=\"" + selectedDays.size + "\"") + th("\uD569\uACC4", " rowspan=\"2\"") + "</tr>";
    var head3 = "<tr>";
    Array.from(selectedDays).forEach(function (d) { var p = d.split("-"); head3 += th(Number(p[1]) + "/" + Number(p[2])); });
    head3 += "</tr>";
    function rowFor(cat) {
      var targetDay = cat === TEXT.complaint ? 3 : 0;
      var targetMonth = cat === TEXT.complaint ? 50 : 0;
      var targetYear = cat === TEXT.complaint ? 600 : 0;
      var html = "<tr>" + th(cat);
      var pv = prevTotal(cat);
      html += td(pv ? comma(pv) : "0") + td(comma(Math.round(pv / 12)));
      preMonths.forEach(function (m) { html += td(cellHtml(monthCount(cat, sel.year, m), null)); });
      prevGroups.forEach(function (g) { html += td(cellHtml(groupCount(cat, g), null)); });
      Array.from(selectedDays).forEach(function (d) { html += td(cellHtml(dayCount(cat, d), targetDay, true)); });
      html += td(cellHtml(selectedMonthTotal(cat), targetMonth));
      postMonths.forEach(function () { html += td(cellHtml(0, targetMonth)); });
      html += td(cellHtml(selectedYearTotal(cat), targetYear)) + td(cellHtml(Math.round(selectedYearTotal(cat) / Math.max(1, sel.month)), targetMonth)) + "</tr>";
      return html;
    }
    var body = cats.map(rowFor).join("");
    function totalFor(fn) { return cats.reduce(function (s, c) { return s + fn(c); }, 0); }
    var totalRow = "<tr class=\"total-row\">" + th(TEXT.total) + td(comma(totalFor(prevTotal))) + td(comma(Math.round(totalFor(prevTotal) / 12)));
    preMonths.forEach(function (m) { totalRow += td(comma(totalFor(function (c) { return monthCount(c, sel.year, m); }))); });
    prevGroups.forEach(function (g) { totalRow += td(comma(totalFor(function (c) { return groupCount(c, g); }))); });
    Array.from(selectedDays).forEach(function (d) { totalRow += td(cellHtml(totalFor(function (c) { return dayCount(c, d); }), 3, true)); });
    totalRow += td(cellHtml(totalFor(selectedMonthTotal), 50));
    postMonths.forEach(function () { totalRow += td(cellHtml(0, 50)); });
    totalRow += td(cellHtml(totalFor(selectedYearTotal), 600)) + td(cellHtml(Math.round(totalFor(selectedYearTotal) / Math.max(1, sel.month)), 50)) + "</tr>";
    var ppm = { prev: 1011, 1: 865, 2: 955, 3: 1139, 4: 1325, 5: 964, 6: 903, avg: 1037 };
    var ppmRow = "<tr class=\"ppm-row\">" + th("PPM") + td(ppm.prev ? comma(ppm.prev) : "-") + td("-");
    preMonths.forEach(function (m) { ppmRow += td(ppm[m] ? comma(ppm[m]) : "-"); });
    prevGroups.forEach(function () { ppmRow += td("-"); });
    Array.from(selectedDays).forEach(function () { ppmRow += td("-"); });
    ppmRow += td(ppm[sel.month] ? comma(ppm[sel.month]) : "-");
    postMonths.forEach(function () { ppmRow += td("-"); });
    ppmRow += td("-") + td(comma(ppm.avg)) + "</tr>";
    table.innerHTML = "<thead>" + head1 + head2 + head3 + "</thead><tbody>" + body + totalRow + ppmRow + "</tbody>";
  }
  function renderDetailDateOptions(rows, force) {
    var select = document.getElementById("detailDateSelect");
    if (!select) return null;
    var sel = getDailySelection();
    var days = (sel.week && sel.week.days || []).slice();
    var existing = select.value;
    var preferred = days.find(function (d) { return rows.some(function (r) { return r.dateKey === d; }); }) || days[0] || existing;
    if (force || select.dataset.v23Key !== days.join("|")) {
      select.innerHTML = days.map(function (d) { return "<option value=\"" + d + "\">" + d + "</option>"; }).join("");
      select.dataset.v23Key = days.join("|");
      select.value = days.indexOf(existing) >= 0 ? existing : preferred;
    }
    if (!select.value && preferred) select.value = preferred;
    return select.value || preferred || "";
  }
  function detailImageCell(row, idx) {
    try {
      if (typeof renderImageManagerCell === "function") return renderImageManagerCell(row, idx);
      if (typeof imageCellHtml === "function") return imageCellHtml(row, idx);
    } catch (_) {}
    return "<button type=\"button\" class=\"link-button compact\">\uB4F1\uB85D/\uCD94\uAC00</button>";
  }
  function renderDetailsStable(detailRows) {
    var table = document.getElementById("detailTable");
    if (!table) return;
    var rows = sortDetailRows(detailRows || []);
    var header = "<thead><tr><th style=\"width:44px\"></th><th>\uAD6C\uBD84</th><th>\uC720\uD615</th><th>\uBE0C\uB79C\uB4DC</th><th>\uC6D0\uC778\uCC98</th><th>\uC81C\uD488\uCF54\uB4DC</th><th>\uC0C9\uC0C1</th><th>LOT NO</th><th>\uACF5\uAE09</th><th>\uD558\uC790\uB0B4\uC5ED</th><th>\uC774\uBBF8\uC9C0</th></tr></thead>";
    if (!rows.length) {
      table.innerHTML = header + "<tbody><tr><td colspan=\"11\" class=\"empty-cell\">" + TEXT.noData + "</td></tr></tbody>";
      return;
    }
    var body = rows.map(function (r, i) {
      var safeDefect = (r.defect || "").replace(/\n/g, "<br>");
      return "<tr>" +
        td(i + 1, "row-num") + td(r.category) + td(r.type) + td(r.brand) + td(r.source) + td(r.code) + td(r.color) + td(r.lot || ".") + td(r.supplier) + td(safeDefect, "defect-desc left") + td(detailImageCell(r, i), "image-cell") +
        "</tr>";
    }).join("");
    table.innerHTML = header + "<tbody>" + body + "</tbody>";
  }
  function applyDailyStable(force) {
    if (dailyApplying) return;
    dailyApplying = true;
    try {
      ensureDailyControls();
      var sel = getDailySelection();
      var all = uniqueItems(allReceiptHistoryItems());
      var selectedSet = new Set((sel.week && sel.week.days) || []);
      var weekRows = all.filter(function (r) { return r.year === sel.year && r.month === sel.month && selectedSet.has(r.dateKey); });
      var detailDate = renderDetailDateOptions(weekRows, force);
      var detailRows = weekRows.filter(function (r) { return r.dateKey === detailDate; });
      var key = [sel.year, sel.month, sel.weekNo, detailDate, weekRows.length, detailRows.length, all.length].join("|");
      if (!force && key === lastDailyKey) return;
      lastDailyKey = key;
      renderDailyCards(weekRows);
      renderSummaryStable(all);
      renderDetailsStable(detailRows);
      try { window.__lastDailyReceiptRowsV23 = weekRows; window.__lastDailyDetailRowsV23 = detailRows; } catch (_) {}
    } finally {
      dailyApplying = false;
    }
  }

  function entryMonth(entry) { return monthFromAny((entry && entry.label) + " " + (entry && entry.sourceSheet) + " " + (entry && entry.title)); }
  function compactEntries(group) {
    if (!group || !Array.isArray(group.entries)) return group;
    var kind = group.kind || group.type;
    var map = new Map();
    group.entries.forEach(function (entry) {
      var key = kind === "cost" ? String(entryMonth(entry) || asText(entry.label) || asText(entry.sourceSheet)) : (asText(entry.sourceSheet) + "|" + asText(entry.label));
      if (!map.has(key)) map.set(key, Object.assign({}, entry));
      else {
        var prev = map.get(key);
        prev.selected = !!(prev.selected || entry.selected);
        prev.excluded = Math.max(Number(prev.excluded) || 0, Number(entry.excluded) || 0);
        prev.rows = (Array.isArray(prev.rows) && prev.rows.length) ? prev.rows : entry.rows;
        prev.label = prev.label || entry.label;
        prev.sourceSheet = prev.sourceSheet || entry.sourceSheet;
      }
    });
    group.entries = Array.from(map.values()).sort(function (a, b) { return (entryMonth(a) || 99) - (entryMonth(b) || 99); });
    return group;
  }
  function compactUploadsNow() {
    var st = getState();
    if (!Array.isArray(st.uploads)) return;
    var map = new Map();
    st.uploads.forEach(function (entry) {
      var kind = entry.kind || entry.type || "";
      var key;
      if (kind === "cost") {
        var y = normalizeYear((entry.groupTitle || entry.title || entry.label || "") + " " + (entry.sourceSheet || "")) || normalizeYear(entry.year) || 0;
        key = [kind, entry.groupKey || entry.sourceUrl || entry.url || "", y, entryMonth(entry) || entry.month || ""].join("|");
      } else if (kind === "receiptHistory") {
        key = [kind, entry.sourceUrl || entry.url || "", entry.sourceSheet || entry.title || entry.label || "receiptHistory"].join("|");
      } else {
        key = [kind, entry.sourceUrl || entry.url || "", entry.sourceSheet || entry.title || entry.label || JSON.stringify(entry).slice(0, 80)].join("|");
      }
      if (!map.has(key)) map.set(key, entry);
    });
    st.uploads = Array.from(map.values());
  }
  function compactPayload(payload) {
    payload = payload && typeof payload === "object" ? payload : { version: 1, groups: [] };
    var groups = Array.isArray(payload.groups) ? payload.groups : [];
    var map = new Map();
    groups.forEach(function (g) {
      if (!g) return;
      compactEntries(g);
      var key = [g.kind || g.type || "", g.groupKey || "", g.sourceUrl || g.url || "", g.title || ""].join("|");
      if (!map.has(key)) map.set(key, g);
      else {
        var prev = map.get(key);
        prev.entries = (prev.entries || []).concat(g.entries || []);
        compactEntries(prev);
      }
    });
    payload.groups = Array.from(map.values());
    payload.savedAt = new Date().toISOString();
    return payload;
  }
  function readLocalPayload() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return compactPayload(JSON.parse(raw));
    } catch (_) { return null; }
  }
  function writeLocalPayload(payload) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(compactPayload(payload))); return true; } catch (_) { return false; }
  }
  function scheduleServerSave() {
    clearTimeout(serverSaveTimer);
    serverSaveTimer = setTimeout(function () {
      var payload = readLocalPayload();
      if (!payload) return;
      fetch("/api/claim-dashboard-state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(function () {});
    }, 500);
  }
  var oldSave = typeof saveDashboardState === "function" ? saveDashboardState : null;
  if (oldSave && !oldSave.__v23Wrapped) {
    var wrappedSave = function () {
      compactUploadsNow();
      var ret = oldSave.apply(this, arguments);
      var payload = readLocalPayload();
      if (payload) writeLocalPayload(payload);
      scheduleServerSave();
      return ret;
    };
    wrappedSave.__v23Wrapped = true;
    window.saveDashboardState = saveDashboardState = wrappedSave;
  }
  var oldRestore = typeof restoreSavedDashboardState === "function" ? restoreSavedDashboardState : null;
  if (oldRestore && !oldRestore.__v23Wrapped) {
    var wrappedRestore = async function () {
      var local = readLocalPayload();
      if (local) writeLocalPayload(local);
      else {
        try {
          var res = await fetch("/api/claim-dashboard-state", { cache: "no-store" });
          if (res.ok) {
            var serverPayload = compactPayload(await res.json());
            if (serverPayload.groups && serverPayload.groups.length) writeLocalPayload(serverPayload);
          }
        } catch (_) {}
      }
      var ret = await oldRestore.apply(this, arguments);
      compactUploadsNow();
      applyDailyStable(true);
      scheduleServerSave();
      return ret;
    };
    wrappedRestore.__v23Wrapped = true;
    window.restoreSavedDashboardState = restoreSavedDashboardState = wrappedRestore;
  }

  if (typeof renderSummary === "function") window.renderSummary = renderSummary = function () { renderSummaryStable(uniqueItems(allReceiptHistoryItems())); };
  if (typeof renderDetails === "function") window.renderDetails = renderDetails = function () { applyDailyStable(true); };
  window.__refreshDailyFromReceiptHistoryV21 = function () { applyDailyStable(false); };
  window.__refreshDailyFromReceiptHistoryV23 = function () { applyDailyStable(true); };
  var oldRebuild = typeof rebuildFromSelection === "function" ? rebuildFromSelection : null;
  if (oldRebuild && !oldRebuild.__v23Wrapped) {
    var rebuildWrapped = function () {
      var panel = document.getElementById("dailyDashboardPanel");
      if (!panel || panel.style.display !== "none") {
        applyDailyStable(true);
        return;
      }
      return oldRebuild.apply(this, arguments);
    };
    rebuildWrapped.__v23Wrapped = true;
    window.rebuildFromSelection = rebuildFromSelection = rebuildWrapped;
  }

  document.addEventListener("change", function (event) {
    var id = event.target && event.target.id;
    if (["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect", "detailDateSelect"].indexOf(id) < 0) return;
    event.stopImmediatePropagation();
    if (id === "dailyYearSelect" || id === "dailyMonthSelect") {
      var w = document.getElementById("dailyWeekSelect");
      if (w) w.innerHTML = "";
    }
    setTimeout(function () { applyDailyStable(true); }, 0);
  }, true);

  function restoreClaimAccumBody() {
    var body = document.getElementById("defectCloseDashboardBody");
    if (!body) return;
    if (body.querySelector(".claim-accum-header") || body.querySelector("#claimAccumToggle") || body.querySelector(".defect-close-grid")) {
      body.innerHTML = '<iframe class="defect-close-frame" title="defect close dashboard" src="dashboard_selected_months/dashboard_selected_months.html" style="width:100%;height:780px;border:0;"></iframe>';
    }
  }
  document.addEventListener("click", function (event) {
    var tab = event.target && event.target.closest && event.target.closest('[data-tab="claimAccum"]');
    if (tab) setTimeout(restoreClaimAccumBody, 50);
  }, true);

  setTimeout(function () { compactUploadsNow(); applyDailyStable(true); restoreClaimAccumBody(); }, 400);
  setTimeout(function () { compactUploadsNow(); applyDailyStable(true); restoreClaimAccumBody(); }, 1500);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) setTimeout(function () { compactUploadsNow(); applyDailyStable(true); }, 100); });
})();

// shared-server-sync-admin-gated-v1-20260709
(function () {
  "use strict";
  if (window.__sharedServerSyncV1) return;
  window.__sharedServerSyncV1 = true;

  var ADMIN_TOKEN_KEY = "qualityClaimDashboard.adminToken.v1";
  function getAdminToken() {
    try { return localStorage.getItem(ADMIN_TOKEN_KEY) || ""; } catch (_) { return ""; }
  }
  try {
    var params = new URLSearchParams(location.search);
    var incoming = params.get("admin");
    if (incoming) {
      localStorage.setItem(ADMIN_TOKEN_KEY, incoming);
      params.delete("admin");
      var newQuery = params.toString();
      history.replaceState(null, "", location.pathname + (newQuery ? "?" + newQuery : "") + location.hash);
    }
  } catch (_) {}
  window.__qcdGetAdminToken = getAdminToken;

  function applyViewOnlyUi(canEdit) {
    var insertBtn = document.getElementById("openDataInsert");
    var deleteBtn = document.getElementById("toggleFileCards");
    var exportBtn = document.getElementById("exportSavedLinkGroups");
    if (insertBtn) insertBtn.hidden = !canEdit;
    if (deleteBtn) deleteBtn.hidden = !canEdit;
    if (exportBtn) exportBtn.hidden = !canEdit;
  }
  function checkCanEdit() {
    var token = getAdminToken();
    fetch("/api/config", { headers: token ? { "X-Admin-Token": token } : {} })
      .then(function (res) { return res.json(); })
      .then(function (data) { applyViewOnlyUi(!!(data && data.canEdit)); })
      .catch(function () {});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", checkCanEdit);
  else checkCanEdit();

  var serverSyncTimer = null;
  function scheduleServerSync() {
    clearTimeout(serverSyncTimer);
    serverSyncTimer = setTimeout(function () {
      var token = getAdminToken();
      if (!token) return;
      var raw = null;
      try { raw = localStorage.getItem(dashboardStorageKey); } catch (_) {}
      if (!raw) return;
      fetch("/api/claim-dashboard-state", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: raw
      }).catch(function () {});
    }, 600);
  }

  var prevSharedSave = typeof saveDashboardState === "function" ? saveDashboardState : null;
  if (prevSharedSave) {
    window.saveDashboardState = saveDashboardState = function () {
      var ret = prevSharedSave.apply(this, arguments);
      scheduleServerSync();
      return ret;
    };
  }

  var prevSharedRestore = typeof restoreSavedDashboardState === "function" ? restoreSavedDashboardState : null;
  if (prevSharedRestore) {
    window.restoreSavedDashboardState = restoreSavedDashboardState = async function () {
      var isLocalhost = location.hostname === "127.0.0.1" || location.hostname === "localhost";
      var hasLocal = false;
      try { hasLocal = !!localStorage.getItem(dashboardStorageKey); } catch (_) {}
      if (!hasLocal && !isLocalhost) {
        try {
          var res = await fetch("/api/claim-dashboard-state", { cache: "no-store" });
          if (res.ok) {
            var data = await res.json();
            if (data && Array.isArray(data.groups) && data.groups.length) {
              localStorage.setItem(dashboardStorageKey, JSON.stringify(data));
            }
          }
        } catch (_) {}
      }
      return prevSharedRestore.apply(this, arguments);
    };
  }
})();
