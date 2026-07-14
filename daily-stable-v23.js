(function () {
  if (window.__dailyStableStandaloneV23) return;
  window.__dailyStableStandaloneV23 = true;

  var T = {
    pending: "\uC2DC\uACF5\uBBF8\uACB0",
    complaint: "\uACE0\uAC1D\uBD88\uB9CC",
    sens: "\uAC10\uC131/\uCDE8\uAE09",
    noData: "\uC120\uD0DD \uB0A0\uC9DC \uC790\uB8CC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
    uploadedNoData: "\uC5C5\uB85C\uB4DC\uB41C \uB204\uC801\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
  };
  var receiptItems = [];
  var loaded = false;
  var loading = false;
  var lastRenderKey = "";
  var renderGuard = false;
  var stableTimers = [];
  var lastDetailHtml = "";
  var lastCardsHtml = "";
  var lastCardsRows = [];
  var lastSummaryHtml = "";
  var lastDetailPeriodKey = "";
  var loadAttempts = 0;
  var sheetHeaderRow = null;
  var lastWeeklyReceiptHtml = "";
  var forcedInitialWeeklyReceiptPeriod = false;
  var dailySelectedDay = "";
  var dailyReadyResolve = null;
  window.__dailyStableReadyPromise = new Promise(function (resolve) { dailyReadyResolve = resolve; });
  (function claimDailyCardsEarly() {
    var el = document.getElementById("dailyReceiptCards");
    if (el) el.innerHTML = '<div class="weekly-empty-message">누적데이터를 불러오는 중입니다.</div>';
  })();

  function txt(v) { return v == null ? "" : String(v).trim(); }
  function esc(v) {
    return txt(v).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }
  function num(v) {
    if (typeof v === "number" && isFinite(v)) return v;
    var s = txt(v).replace(/[^0-9.-]/g, "");
    var n = Number(s);
    return isFinite(n) ? n : 0;
  }
  function comma(n) { return Math.round(Number(n) || 0).toLocaleString("ko-KR"); }
  function attachEscToClose(win) {
    if (!win) return;
    try {
      win.document.addEventListener("keydown", function (e) { if (e.key === "Escape") win.close(); });
    } catch (_) {}
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function iso(y, m, d) { return y + "-" + pad(m) + "-" + pad(d); }
  function dateKey(d) { return iso(d.getFullYear(), d.getMonth() + 1, d.getDate()); }
  function parseDate(v) {
    if (v instanceof Date && !isNaN(v)) return new Date(v.getFullYear(), v.getMonth(), v.getDate());
    if (typeof v === "number" && isFinite(v) && v > 20000) {
      var base = new Date(Math.round((v - 25569) * 86400 * 1000));
      return new Date(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate());
    }
    var s = txt(v);
    var m = s.match(/(20\d{2})\D+(\d{1,2})\D+(\d{1,2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = s.match(/^(\d{2})(\d{2})(\d{2})$/);
    return m ? new Date(2000 + +m[1], +m[2] - 1, +m[3]) : null;
  }
  function validRow(row) {
    var d = parseDate(row[0]);
    if (!d) return false;
    var joined = row.slice(0, 18).map(txt).join(" ");
    if (/접수일자|접수번호|부품코드|하자내역|미결구분/.test(joined) && !/^20\d{2}/.test(txt(row[0]))) return false;
    return !!(txt(row[3]) || txt(row[5]) || txt(row[12]) || txt(row[1]));
  }
  function category(row) {
    if (txt(row[13]) === "0") return T.pending;
    var type = txt(row[11]);
    return /감성|취급/.test(type) ? T.sens : T.complaint;
  }
  function rowToItem(row, sheet, idx) {
    var d = parseDate(row[0]);
    return {
      raw: row.slice(),
      sheet: sheet,
      rowIndex: idx,
      date: d,
      dateKey: dateKey(d),
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      receiptNo: txt(row[3]) || txt(row[1]) || (sheet + "-" + idx),
      seq: txt(row[4]) || "",
      category: category(row),
      type: txt(row[11]) || "-",
      brand: txt(row[2]) || "-",
      source: txt(row[9]) || "-",
      code: txt(row[5]) || "-",
      color: txt(row[6]) || "-",
      lot: txt(row[7]) || ".",
      supplier: txt(row[8]) || "-",
      packaging: txt(row[10]) || "-",
      defect: txt(row[12]) || "",
      quantity: num(row[14]) || 0,
      amount: num(row[17]) || num(row[16]) || num(row[15]) || 0,
      photoLink: txt(row[18]) || "",
      photoKind: txt(row[19]) || ""
    };
  }
  function unique(items) {
    var map = new Map();
    items.forEach(function (it) {
      var key = [it.dateKey, it.receiptNo, it.code, it.color, it.category, it.defect, it.rowIndex].join("|");
      if (!map.has(key)) map.set(key, it);
    });
    return Array.from(map.values());
  }
  function categoryRank(c) {
    return c === T.pending ? 1 : c === T.complaint ? 2 : c === T.sens ? 3 : 9;
  }
  function validRow(row) {
    var d = parseDate(row[0]);
    if (!d) return false;
    return !!(txt(row[1]) || txt(row[3]) || txt(row[5]) || txt(row[8]) || txt(row[12]));
  }
  function category(row) {
    if (txt(row[13]) === "0") return T.pending;
    var type = txt(row[11]);
    return /\uAC10\uC131|\uCDE8\uAE09/.test(type) ? T.sens : T.complaint;
  }
  function sourceRank(s) {
    var label = sourceGroupLabel(s);
    if (label === "1\uB77C\uC778" || label === "4\uB77C\uC778") return 1;
    if (label === "7\uB77C\uC778") return 2;
    if (label === "\uC678\uC8FC") return 3;
    if (label === "\uAD6C\uB9E4") return 4;
    return 5;
  }
  function sortDetails(rows) {
    return rows.slice().sort(function (a, b) {
      return sourceRank(a.source) - sourceRank(b.source) ||
        categoryRank(a.category) - categoryRank(b.category) ||
        a.source.localeCompare(b.source, "ko") ||
        a.code.localeCompare(b.code, "ko");
    });
  }
  function monday(d) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var day = x.getDay() || 7;
    x.setDate(x.getDate() - day + 1);
    return x;
  }
  function weekGroups(year, month) {
    var end = new Date(year, month, 0).getDate();
    var groups = [];
    var cur = [];
    for (var day = 1; day <= end; day++) {
      var d = new Date(year, month - 1, day);
      var dow = d.getDay();
      if (dow === 0 || dow === 6) continue;
      if (!cur.length || monday(cur[0]).getTime() === monday(d).getTime()) cur.push(d);
      else { groups.push(cur); cur = [d]; }
    }
    if (cur.length) groups.push(cur);
    if (groups.length > 1 && groups[0].length <= 2) groups[1] = groups[0].concat(groups[1]), groups.shift();
    if (groups.length > 1 && groups[groups.length - 1].length <= 2) groups[groups.length - 2] = groups[groups.length - 2].concat(groups.pop());
    return groups.map(function (g, i) { return { label: (i + 1) + "\uC8FC", days: g.map(dateKey) }; });
  }
  function currentWeekNo(year, month, groups, now) {
    if (year !== now.getFullYear() || month !== now.getMonth() + 1) return 1;
    var todayKey = dateKey(now);
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].days.indexOf(todayKey) >= 0) return i + 1;
    }
    return groups.length || 1;
  }
  var forcedInitialPeriod = false;
  function ensureControls() {
    var y = document.getElementById("dailyYearSelect");
    var m = document.getElementById("dailyMonthSelect");
    var w = document.getElementById("dailyWeekSelect");
    if (!y || !m || !w) return null;
    var now = new Date();
    var firstRun = !forcedInitialPeriod;
    forcedInitialPeriod = true;
    if (!y.options.length) for (var yy = 2024; yy <= 2027; yy++) y.appendChild(new Option(yy + "\uB144", String(yy)));
    if (!m.options.length) for (var mm = 1; mm <= 12; mm++) m.appendChild(new Option(mm + "\uC6D4", String(mm)));
    if (firstRun || !y.value) y.value = String(now.getFullYear());
    if (firstRun || !m.value) m.value = String(now.getMonth() + 1);
    var year = +(txt(y.value).replace(/[^0-9]/g, "")) || now.getFullYear();
    var month = +(txt(m.value).replace(/[^0-9]/g, "")) || now.getMonth() + 1;
    var groups = weekGroups(year, month);
    var old = +(txt(w.value).replace(/[^0-9]/g, "")) || 0;
    if (firstRun || w.options.length !== groups.length) {
      w.innerHTML = "";
      groups.forEach(function (_, i) { w.appendChild(new Option((i + 1) + "\uC8FC", String(i + 1))); });
      var defaultWeek = (!firstRun && old) || currentWeekNo(year, month, groups, now);
      w.value = String(Math.min(defaultWeek, groups.length || 1));
    }
    return { year: year, month: month, weekNo: +(txt(w.value).replace(/[^0-9]/g, "")) || 1, groups: groups };
  }
  function selected() {
    var s = ensureControls();
    if (!s) return null;
    s.week = s.groups[s.weekNo - 1] || s.groups[0] || { label: "1\uC8FC", days: [] };
    return s;
  }
  function topItems(rows, limit, pendingPreferred) {
    var base = rows;
    if (pendingPreferred) {
      var p = rows.filter(function (r) { return r.category === T.pending; });
      if (p.length) base = p;
    }
    var map = new Map();
    base.forEach(function (r) {
      var key = (r.code || "-") + " / " + (r.color || "-");
      var cur = map.get(key) || { key: key, qty: 0, amount: 0 };
      cur.qty += 1;
      cur.amount += r.amount || 0;
      map.set(key, cur);
    });
    return Array.from(map.values()).sort(function (a, b) {
      return b.qty - a.qty || b.amount - a.amount || a.key.localeCompare(b.key);
    }).slice(0, limit || 5);
  }
  function dayBreakdown(days, rows) {
    return (days || []).map(function (d) {
      var dayRows = rows.filter(function (r) { return r.dateKey === d; });
      var p = d.split("-");
      return {
        day: d,
        label: (+p[1]) + "/" + (+p[2]),
        count: dayRows.length,
        amount: dayRows.reduce(function (s, r) { return s + (r.amount || 0); }, 0)
      };
    });
  }
  function niceAxisTicks(maxValue, tickCount) {
    tickCount = tickCount || 5;
    var safeMax = Math.max(Number(maxValue) || 0, 1);
    var rawStep = safeMax / tickCount;
    var magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    var norm = rawStep / magnitude;
    var niceNorm = 10;
    if (norm <= 1) niceNorm = 1;
    else if (norm <= 2) niceNorm = 2;
    else if (norm <= 5) niceNorm = 5;
    var step = niceNorm * magnitude;
    var niceMax = Math.ceil(safeMax / step) * step;
    var ticks = [];
    for (var value = 0; value <= niceMax + step / 2; value += step) ticks.push(Math.round(value));
    return { ticks: ticks, niceMax: niceMax || step };
  }
  function dailyBarChartMarkup(points, unit) {
    var width = 640, height = 220, padLeft = 56, padRight = 14, padTop = 26, padBottom = 30;
    var innerW = width - padLeft - padRight;
    var innerH = height - padTop - padBottom;
    var axisData = niceAxisTicks(Math.max.apply(null, points.map(function (p) { return p.value; }).concat([1])));
    var ticks = axisData.ticks, niceMax = axisData.niceMax;
    var slot = points.length ? innerW / points.length : innerW;
    var barWidth = Math.max(8, slot * 0.6);
    var axis = ticks.map(function (tick) {
      var y = padTop + innerH - (tick / niceMax) * innerH;
      return '<line x1="' + padLeft + '" y1="' + y + '" x2="' + (padLeft + innerW) + '" y2="' + y + '" class="weekly-axis-grid"></line>' +
        '<text x="' + (padLeft - 8) + '" y="' + y + '" text-anchor="end" dominant-baseline="middle" class="weekly-axis-label">' + comma(tick) + '</text>';
    }).join('');
    var bars = points.map(function (p, index) {
      var x = padLeft + index * slot + (slot - barWidth) / 2;
      var hoverAttrs = p.day
        ? ' onclick="window.__dailyStableSelectDay&&window.__dailyStableSelectDay(\'' + p.day + '\')" ondblclick="window.__dailyStableOpenDayTypePopup&&window.__dailyStableOpenDayTypePopup(\'' + p.day + '\')"'
        : '';
      var isActive = p.day && p.day === dailySelectedDay;
      var bar = '';
      if (p.value > 0) {
        var barH = niceMax ? (p.value / niceMax) * innerH : 0;
        var y = padTop + innerH - barH;
        bar = '<rect x="' + x + '" y="' + y + '" width="' + barWidth + '" height="' + Math.max(1, barH) + '" rx="3" class="weekly-svg-bar' + (isActive ? " active" : "") + '"></rect>' +
          '<text x="' + (x + barWidth / 2) + '" y="' + (y - 6) + '" text-anchor="middle" class="weekly-svg-bar-value">' + comma(p.value) + unit + '</text>';
      }
      return '<g class="weekly-svg-bar-group"' + hoverAttrs + '>' +
        bar +
        '<text x="' + (x + barWidth / 2) + '" y="' + (height - 8) + '" text-anchor="middle" class="weekly-axis-label">' + esc(p.label) + '</text>' +
      '</g>';
    }).join('');
    return '<div class="weekly-svg-chart"><svg viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none" role="img">' + axis + bars + '</svg></div>';
  }
  function dayTypePieItems(dayRows) {
    var order = [T.pending, T.complaint, T.sens];
    var map = new Map();
    dayRows.forEach(function (r) {
      var key = r.category || T.complaint;
      var cur = map.get(key) || { label: key, value: 0, amount: 0 };
      cur.value += 1;
      cur.amount += r.amount || 0;
      map.set(key, cur);
    });
    return order.map(function (cat) { return map.get(cat) || { label: cat, value: 0, amount: 0 }; });
  }
  function dayPopupTitle(d) {
    var p = d.split("-");
    return (+p[1]) + "월" + (+p[2]) + "일 클레임";
  }
  function openDailyDayTypePopup(d) {
    var dayRows = receiptItems.filter(function (r) { return r.dateKey === d; });
    var items = dayTypePieItems(dayRows);
    var sourceItems = sourcePieItems(dayRows);
    if (typeof window.openTypePiePopup === "function") window.openTypePiePopup(dayPopupTitle(d), items, sourceItems);
  }
  window.__dailyStableOpenDayTypePopup = openDailyDayTypePopup;
  function dailyAmountShort(amount) {
    if (!amount) return "0";
    return "" + Number((amount / 1000000).toFixed(1));
  }
  function dailyAmountAxisFormatter(tick) {
    return Number((tick / 1000000).toFixed(1)) + "백만원";
  }
  function dailyLineChartMarkup(points, unit, labelFormatter, axisFormatter) {
    var width = 640, height = 220, padLeft = 56, padRight = 14, padTop = 26, padBottom = 30;
    var innerW = width - padLeft - padRight;
    var innerH = height - padTop - padBottom;
    var axisData = niceAxisTicks(Math.max.apply(null, points.map(function (p) { return p.value; }).concat([1])));
    var ticks = axisData.ticks, niceMax = axisData.niceMax;
    var step = points.length > 1 ? innerW / (points.length - 1) : 0;
    var allCoords = points.map(function (p, i) {
      return { label: p.label, value: p.value, x: padLeft + i * step, y: padTop + innerH - (niceMax ? (p.value / niceMax) * innerH : 0) };
    });
    var coords = allCoords.filter(function (c) { return c.value > 0; });
    var line = coords.map(function (c) { return c.x + ',' + c.y; }).join(' ');
    var area = coords.length ? (coords[0].x + ',' + (padTop + innerH) + ' ' + line + ' ' + coords[coords.length - 1].x + ',' + (padTop + innerH)) : '';
    var axis = ticks.map(function (tick) {
      var y = padTop + innerH - (tick / niceMax) * innerH;
      var label = axisFormatter ? axisFormatter(tick) : comma(tick);
      return '<line x1="' + padLeft + '" y1="' + y + '" x2="' + (padLeft + innerW) + '" y2="' + y + '" class="weekly-axis-grid"></line>' +
        '<text x="' + (padLeft - 8) + '" y="' + y + '" text-anchor="end" dominant-baseline="middle" class="weekly-axis-label">' + label + '</text>';
    }).join('');
    var xLabels = allCoords.map(function (c) {
      return '<text class="weekly-line-label" x="' + c.x + '" y="' + (height - 8) + '" text-anchor="middle">' + esc(c.label) + '</text>';
    }).join('');
    return '<div class="weekly-line-chart"><svg viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none" role="img">' +
      axis +
      (area ? '<polygon class="weekly-line-area" points="' + area + '"></polygon>' : '') +
      (line ? '<polyline class="weekly-line" points="' + line + '"></polyline>' : '') +
      coords.map(function (c) {
        var label = labelFormatter ? labelFormatter(c.value) : (comma(c.value) + unit);
        return '<g><circle cx="' + c.x + '" cy="' + c.y + '" r="4.5"></circle>' +
          '<text x="' + c.x + '" y="' + (c.y - 10) + '" text-anchor="middle">' + label + '</text></g>';
      }).join('') +
      xLabels +
      '</svg></div>';
  }
  function sourceGroupLabel(source) {
    var s = txt(source);
    if (/^1\s*라인/.test(s)) return "1라인";
    if (/^[34]\s*라인/.test(s)) return "4라인";
    if (/^7\s*라인/.test(s)) return "7라인";
    if (/외주/.test(s)) return "외주";
    if (/구매/.test(s)) return "구매";
    return "기타";
  }
  function sourcePieItems(rows) {
    var order = ["1라인", "4라인", "7라인", "외주", "구매", "기타"];
    var map = new Map();
    rows.forEach(function (r) {
      var label = sourceGroupLabel(r.source);
      var cur = map.get(label) || { label: label, value: 0 };
      cur.value += 1;
      map.set(label, cur);
    });
    return order.map(function (label) { return map.get(label) || { label: label, value: 0 }; }).filter(function (item) { return item.value > 0; }).sort(function (a, b) { return b.value - a.value; });
  }
  var DAILY_PIE_COLOR_MAP = { "1라인": "#1f73e8", "4라인": "#e53935", "7라인": "#23a455", "외주": "#f59f00", "구매": "#7950f2", "기타": "#495057" };
  var DAILY_PIE_FALLBACK_COLORS = ["#1f73e8", "#23a455", "#f59f00", "#7950f2", "#495057"];
  function dailyPieColor(label, index) {
    return DAILY_PIE_COLOR_MAP[label] || DAILY_PIE_FALLBACK_COLORS[index % DAILY_PIE_FALLBACK_COLORS.length];
  }
  function dailyPieMarkup(items) {
    if (!items.length) return '<div class="weekly-empty-message">표시할 데이터가 없습니다.</div>';
    var total = items.reduce(function (s, i) { return s + i.value; }, 0);
    var start = 0;
    var gradient = items.map(function (item, index) {
      var percent = total ? (item.value / total) * 100 : 0;
      var end = start + percent;
      var seg = dailyPieColor(item.label, index) + ' ' + start.toFixed(3) + '% ' + end.toFixed(3) + '%';
      start = end;
      return seg;
    }).join(', ');
    return '<div class="daily-pie-row">' +
      '<div class="daily-donut" style="background:conic-gradient(' + gradient + ')"><b>' + comma(total) + '</b><span>건</span></div>' +
      '<div class="daily-pie-legend">' + items.map(function (item, index) {
        var pct = total ? Math.round(item.value / total * 1000) / 10 : 0;
        return '<div><i style="background:' + dailyPieColor(item.label, index) + '"></i><span>' + esc(item.label) + '</span><em>' + comma(item.value) + '건 (' + pct + '%)</em></div>';
      }).join('') + '</div>' +
    '</div>';
  }
  function selectDailyDay(d) {
    dailySelectedDay = dailySelectedDay === d ? "" : d;
    render(true);
  }
  window.__dailyStableSelectDay = selectDailyDay;
  function renderCards(rows, s) {
    var el = document.getElementById("dailyReceiptCards");
    if (!el) return;
    var validDay = dailySelectedDay && rows.some(function (r) { return r.dateKey === dailySelectedDay; });
    if (dailySelectedDay && !validDay) dailySelectedDay = "";
    var cardsRows = dailySelectedDay ? rows.filter(function (r) { return r.dateKey === dailySelectedDay; }) : rows;
    lastCardsRows = cardsRows;
    var total = cardsRows.length;
    var loss = cardsRows.reduce(function (s, r) { return s + (r.amount || 0); }, 0);
    var top = topItems(cardsRows, 3);
    var main = top[0] || { key: "-", qty: 0 };
    var days = (s && s.week && s.week.days) || [];
    var breakdown = dayBreakdown(days, rows);
    var periodPrefix = dailySelectedDay ? (function () { var p = dailySelectedDay.split("-"); return (+p[1]) + "\uC6D4" + (+p[2]) + "\uC77C"; })() : ((s && s.month) + "\uC6D4" + (s && s.weekNo) + "\uC8FC");
    var html =
      '<div class="weekly-tool">' +
        '<div class="weekly-kpi-grid">' +
          '<div class="weekly-kpi"><span>' + esc(periodPrefix) + ' \uC811\uC218\uAC74\uC218</span><strong>' + comma(total) + '</strong><em>\uAC74</em></div>' +
          '<div class="weekly-kpi"><span>' + esc(periodPrefix) + ' \uC190\uC2E4\uAE08\uC561 <span class="weekly-kpi-note">(\uC81C\uD488\uAC00+\uAC74\uB2F960,000)</span></span><strong>' + comma(loss) + '</strong><em>\uC6D0</em></div>' +
          '<div class="weekly-kpi" data-role="daily-top-items" style="cursor:pointer"><span>' + esc(periodPrefix) + ' \uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</span><strong class="purple">' + esc(main.key) + '</strong><em>' + comma(main.qty) + '\uAC74</em>' +
            '<div class="weekly-kpi-tags">' + top.map(function (t) { return '<button type="button" tabindex="-1">' + esc(t.key) + ' <b>' + comma(t.qty) + '\uAC74</b></button>'; }).join("") + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="weekly-visual-grid">' +
          '<div class="weekly-visual-card"><h3>\uC77C\uBCC4 \uC811\uC218\uAC74\uC218</h3>' + dailyBarChartMarkup(breakdown.map(function (b) { return { label: b.label, value: b.count, day: b.day }; }), '\uAC74') + '</div>' +
          '<div class="weekly-visual-card"><h3>\uC77C\uBCC4 \uC190\uC2E4\uAE08\uC561</h3>' + dailyLineChartMarkup(breakdown.map(function (b) { return { label: b.label, value: b.amount }; }), '\uC6D0', dailyAmountShort, dailyAmountAxisFormatter) + '</div>' +
          '<div class="weekly-visual-card"><h3>\uC6D0\uC778\uCC98\uBCC4 \uC811\uC218\uD604\uD669</h3>' + dailyPieMarkup(sourcePieItems(cardsRows)) + '</div>' +
        '</div>' +
      '</div>';
    if (html !== lastCardsHtml || el.innerHTML !== html) {
      lastCardsHtml = html;
      el.innerHTML = html;
    }
  }
  var DAILY_ITEM_CATEGORY_RANK = { "시공미결": 0, "고객불만": 1, "감성/취급": 2 };
  function dailyItemCategoryRank(category) {
    var rank = DAILY_ITEM_CATEGORY_RANK[category];
    return rank == null ? 3 : rank;
  }
  function dailyTopItemsPopupRows(rows) {
    var itemKey = function (r) { return (r.code || "-") + " / " + (r.color || "-"); };
    var countByItem = new Map();
    rows.forEach(function (r) {
      var key = itemKey(r);
      countByItem.set(key, (countByItem.get(key) || 0) + 1);
    });
    return rows.slice().sort(function (a, b) {
      var ca = countByItem.get(itemKey(a)) || 0;
      var cb = countByItem.get(itemKey(b)) || 0;
      return cb - ca ||
        dailyItemCategoryRank(a.category) - dailyItemCategoryRank(b.category) ||
        String(a.code || "").localeCompare(String(b.code || ""), "ko", { numeric: true }) ||
        String(a.color || "").localeCompare(String(b.color || ""), "ko", { numeric: true }) ||
        String(a.dateKey || "").localeCompare(String(b.dateKey || ""), "ko");
    }).map(function (r) {
      return { dateKey: r.dateKey, brand: r.brand, code: r.code, color: r.color, lot: r.lot, quantity: r.quantity, source: r.source, defect: r.defect, category: r.category };
    });
  }
  function downloadDailyTopItemsExcel() {
    var rows = dailyTopItemsPopupRows(lastCardsRows);
    if (!window.XLSX || !rows.length) return;
    var headers = ["\uC811\uC218\uC77C\uC790", "\uBE0C\uB79C\uB4DC", "\uBD80\uD488\uCF54\uB4DC", "\uC0C9\uC0C1", "\uC0DD\uC0B0\uB85C\uD2B8", "\uC218\uB7C9", "\uC6D0\uC778\uCC98", "\uD558\uC790\uB0B4\uC5ED"];
    var aoa = [headers].concat(rows.map(function (r) {
      return [r.dateKey, r.brand, r.code, r.color, r.lot, r.quantity, r.source, r.defect];
    }));
    var ws = XLSX.utils.aoa_to_sheet(aoa);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "\uC8FC\uC694\uC811\uC218\uD488\uBAA9");
    XLSX.writeFile(wb, "\uC8FC\uC694\uC811\uC218\uD488\uBAA9.xlsx");
  }
  window.__dailyStableDownloadTopItems = downloadDailyTopItemsExcel;
  function openDailyTopItemsPopup() {
    var rows = dailyTopItemsPopupRows(lastCardsRows);
    var bodyRows = rows.map(function (r) {
      var defect = esc(r.defect).replace(/\n/g, "<br>");
      var rowClass = r.category === T.pending ? ' class="pending"' : "";
      return '<tr' + rowClass + '><td>' + esc(r.dateKey) + '</td><td class="left">' + esc(r.brand) + '</td><td class="left">' + esc(r.code) + '</td><td class="left">' + esc(r.color) + '</td><td>' + esc(r.lot) + '</td><td>' + comma(r.quantity) + '</td><td class="left">' + esc(r.source) + '</td><td class="left">' + defect + '</td></tr>';
    }).join("");
    var popup = window.open("", "dailyStableTopItemsV23", "popup=yes,width=1200,height=700,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
    if (!popup) return;
    popup.document.open();
    popup.document.write('<!doctype html><html><head><meta charset="UTF-8"><title>\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9</title><style>' +
      'body{font-family:"Malgun Gothic",Segoe UI,Arial,sans-serif;margin:18px;color:#0f172a;font-size:13px}' +
      'h1{font-size:20px;margin:0 0 8px}' +
      '.meta{color:#475569;font-size:13px;margin-bottom:4px}' +
      '.toolbar{display:flex;align-items:center;gap:14px;margin:12px 0 14px}' +
      'button{height:34px;padding:0 12px;border:1px solid #b9c7d8;border-radius:6px;background:#fff;font-weight:800;cursor:pointer}' +
      '.legend{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;color:#7a2020}' +
      '.legend i{display:inline-block;width:16px;height:16px;border-radius:4px;background:#fdeaea;border:1px solid #f3c3c3}' +
      'table{width:100%;border-collapse:collapse;font-size:13px}' +
      'th,td{border:1px solid #d9e2ec;padding:8px;text-align:center;vertical-align:middle}' +
      'th{background:#eef1f4;font-weight:900}' +
      '.left{text-align:left;white-space:pre-wrap}' +
      'tr.pending td{background:#fdeaea}' +
      '</style></head><body>' +
      '<h1>\uC77C\uC77C\uC811\uC218\uD604\uD669 / \uC8FC\uC694 \uC811\uC218 \uD488\uBAA9 (' + comma(rows.length) + '\uAC74)</h1>' +
      '<div class="meta">\uD45C\uC2DC \uC5F4: \uC811\uC218\uC77C\uC790, \uBE0C\uB79C\uB4DC, \uBD80\uD488\uCF54\uB4DC, \uC0C9\uC0C1, \uC0DD\uC0B0\uB85C\uD2B8, \uC218\uB7C9, \uC6D0\uC778\uCC98, \uD558\uC790\uB0B4\uC5ED \u00B7 \uB3D9\uC77C \uBD80\uD488\uCF54\uB4DC+\uC0C9\uC0C1 \uB9CE\uC740 \uC21C, \uB3D9\uB960 \uC2DC \uC2DC\uACF5\uBBF8\uACB0 > \uACE0\uAC1D\uBD88\uB9CC > \uAC10\uC131/\uCDE8\uAE09 \uC21C \uC815\uB82C</div>' +
      '<div class="toolbar"><button onclick="window.opener&&window.opener.__dailyStableDownloadTopItems()">\uC774\uB825 \uC5D1\uC140 \uB2E4\uC6B4\uB85C\uB4DC</button><span class="legend"><i></i>\uC2DC\uACF5\uBBF8\uACB0</span></div>' +
      '<table><thead><tr><th>\uC811\uC218\uC77C\uC790</th><th>\uBE0C\uB79C\uB4DC</th><th>\uBD80\uD488\uCF54\uB4DC</th><th>\uC0C9\uC0C1</th><th>\uC0DD\uC0B0\uB85C\uD2B8</th><th>\uC218\uB7C9</th><th>\uC6D0\uC778\uCC98</th><th>\uD558\uC790\uB0B4\uC5ED</th></tr></thead><tbody>' +
      (bodyRows || '<tr><td colspan="8">\uD45C\uC2DC\uD560 \uC790\uB8CC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</td></tr>') +
      '</tbody></table></body></html>');
    popup.document.close();
    attachEscToClose(popup);
  }
  document.addEventListener("click", function (event) {
    var target = event.target && event.target.closest ? event.target.closest('[data-role="daily-top-items"]') : null;
    if (!target) return;
    var el = document.getElementById("dailyReceiptCards");
    if (!el || !el.contains(target)) return;
    openDailyTopItemsPopup();
  }, true);
  function chtml(value, target, red) {
    var v = Number(value) || 0;
    var main = comma(v);
    if (target != null) main += '<span class="target-text">(' + comma(target) + ')</span>';
    return red ? '<span class="today-red">' + main + '</span>' : main;
  }
  function renderSummary(all) {
    var table = document.getElementById("summaryTable");
    var s = selected();
    if (!table || !s) return;
    var cats = [T.pending, T.complaint, T.sens];
    var prevYear = s.year - 1;
    var prevItems = all.filter(function (r) { return r.year === prevYear; });
    var yearItems = all.filter(function (r) { return r.year === s.year; });
    var preMonths = [];
    for (var m = 1; m < s.month; m++) preMonths.push(m);
    var postMonths = [];
    for (var pm = s.month + 1; pm <= 12; pm++) postMonths.push(pm);
    var prevGroups = s.groups.slice(0, Math.max(0, s.weekNo - 1));
    var days = (s.week && s.week.days) || [];
    var todayKey = dateKey(new Date());
    function byCat(rows, cat) { return rows.filter(function (r) { return r.category === cat; }).length; }
    function prevTotal(cat) { return byCat(prevItems, cat); }
    function monthCount(cat, year, month) { return byCat(all.filter(function (r) { return r.year === year && r.month === month; }), cat); }
    function groupCount(cat, group) { var set = new Set(group.days || []); return byCat(yearItems.filter(function (r) { return r.month === s.month && set.has(r.dateKey); }), cat); }
    function dayCount(cat, day) { return byCat(yearItems.filter(function (r) { return r.dateKey === day; }), cat); }
    function selectedMonthTotal(cat) { return monthCount(cat, s.year, s.month); }
    function yearTotal(cat) { return byCat(yearItems, cat); }
    var h1 = '<tr><th rowspan="3">\uAD6C\uBD84</th><th colspan="2">' + String(prevYear).slice(2) + '\uB144</th>';
    preMonths.forEach(function (m) { h1 += '<th rowspan="3">' + m + '\uC6D4</th>'; });
    h1 += '<th colspan="' + (prevGroups.length + days.length + 1) + '">' + s.month + '\uC6D4</th>';
    postMonths.forEach(function (m) { h1 += '<th rowspan="3">' + m + '\uC6D4</th>'; });
    h1 += '<th rowspan="3">\uD569\uACC4</th><th rowspan="3">\uC6D4<br>\uD3C9\uADE0</th></tr>';
    var h2 = '<tr><th rowspan="2">\uD569\uACC4</th><th rowspan="2">\uC6D4<br>\uD3C9\uADE0</th>';
    prevGroups.forEach(function (g) { h2 += '<th rowspan="2">' + g.label + '</th>'; });
    h2 += '<th colspan="' + days.length + '">' + s.week.label + '</th><th rowspan="2">\uD569\uACC4</th></tr>';
    var h3 = '<tr>' + days.map(function (d) { var p = d.split("-"); return '<th>' + (+p[1]) + '/' + (+p[2]) + '</th>'; }).join("") + '</tr>';
    function row(cat) {
      var dTarget = cat === T.complaint ? 3 : 0;
      var mTarget = cat === T.complaint ? 50 : 0;
      var yTarget = cat === T.complaint ? 600 : 0;
      var html = '<tr class="category-row"><th>' + cat + '</th><td>' + comma(prevTotal(cat)) + '</td><td>' + comma(Math.round(prevTotal(cat) / 12)) + '</td>';
      preMonths.forEach(function (m) { html += '<td>' + chtml(monthCount(cat, s.year, m)) + '</td>'; });
      prevGroups.forEach(function (g) { html += '<td>' + chtml(groupCount(cat, g)) + '</td>'; });
      days.forEach(function (d) { html += '<td>' + chtml(dayCount(cat, d), dTarget, d === todayKey) + '</td>'; });
      html += '<td>' + chtml(selectedMonthTotal(cat), mTarget) + '</td>';
      postMonths.forEach(function () { html += '<td>' + chtml(0, mTarget) + '</td>'; });
      html += '<td>' + chtml(yearTotal(cat), yTarget) + '</td><td>' + chtml(Math.round(yearTotal(cat) / Math.max(1, s.month)), mTarget) + '</td></tr>';
      return html;
    }
    function total(fn) { return cats.reduce(function (sum, cat) { return sum + fn(cat); }, 0); }
    var body = cats.map(row).join("");
    var totalRow = '<tr class="total-row"><th>\uACC4</th><td>' + comma(total(prevTotal)) + '</td><td>' + comma(Math.round(total(prevTotal) / 12)) + '</td>';
    preMonths.forEach(function (m) { totalRow += '<td>' + comma(total(function (cat) { return monthCount(cat, s.year, m); })) + '</td>'; });
    prevGroups.forEach(function (g) { totalRow += '<td>' + comma(total(function (cat) { return groupCount(cat, g); })) + '</td>'; });
    days.forEach(function (d) { totalRow += '<td>' + chtml(total(function (cat) { return dayCount(cat, d); }), 3, d === todayKey) + '</td>'; });
    totalRow += '<td>' + chtml(total(selectedMonthTotal), 50) + '</td>';
    postMonths.forEach(function () { totalRow += '<td>' + chtml(0, 50) + '</td>'; });
    totalRow += '<td>' + chtml(total(yearTotal), 600) + '</td><td>' + chtml(Math.round(total(yearTotal) / Math.max(1, s.month)), 50) + '</td></tr>';
    var ppmVals = { prev: 1011, 1: 865, 2: 955, 3: 1139, 4: 1325, 5: 964, 6: 903, avg: 1037 };
    var ppm = '<tr class="ppm-row"><th>PPM</th><td>' + comma(ppmVals.prev) + '</td><td>-</td>';
    preMonths.forEach(function (m) { ppm += '<td>' + (ppmVals[m] ? comma(ppmVals[m]) : '-') + '</td>'; });
    prevGroups.forEach(function () { ppm += '<td>-</td>'; });
    days.forEach(function () { ppm += '<td>-</td>'; });
    ppm += '<td>' + (ppmVals[s.month] ? comma(ppmVals[s.month]) : '-') + '</td>';
    postMonths.forEach(function () { ppm += '<td>-</td>'; });
    ppm += '<td>-</td><td>' + comma(ppmVals.avg) + '</td></tr>';
    var html = '<thead>' + h1 + h2 + h3 + '</thead><tbody>' + body + totalRow + ppm + '</tbody>';
    if (html !== lastSummaryHtml) {
      lastSummaryHtml = html;
      table.innerHTML = html;
    }
  }
  function ensureDetailDateInput() {
    var box = document.getElementById("detailDateSelect");
    if (!box) return "";
    if (!box.value) box.value = dateKey(new Date());
    return box.value;
  }
  function normalizeMatchKey(v) {
    return txt(v).replace(/[^0-9A-Za-z가-힣]/g, "").toUpperCase();
  }
  var DEFECT_COLOR_STORAGE_KEY = "qualityClaimDashboard.defectColors.v1";
  var defectColorMap = (function () {
    try { return JSON.parse(localStorage.getItem(DEFECT_COLOR_STORAGE_KEY) || "{}") || {}; } catch (_) { return {}; }
  })();
  function saveDefectColorMap() {
    try { localStorage.setItem(DEFECT_COLOR_STORAGE_KEY, JSON.stringify(defectColorMap)); } catch (_) {}
  }
  function defectDescMarkup(r, key) {
    var stored = defectColorMap[key];
    return stored != null ? stored : esc(r.defect).replace(/\n/g, "<br>");
  }
  function imageSequenceNo(name) {
    var s = txt(name);
    var attachMatch = s.match(/^ATTACH_.*_(\d+)_(\d+)$/);
    if (attachMatch) return Number(attachMatch[1]) * 1000 + Number(attachMatch[2]);
    var m = s.match(/_(\d+)(?:\.[a-zA-Z0-9]+)?$/);
    return m ? Number(m[1]) : 0;
  }
  function sharedState() {
    return typeof state !== "undefined" ? state : (window.state || null);
  }
  function matchingImages(receiptNo, seq, code) {
    var s = sharedState();
    var images = (s && Array.isArray(s.images)) ? s.images : [];
    var combined = normalizeMatchKey(receiptNo) + normalizeMatchKey(seq) + normalizeMatchKey(code);
    if (!combined) return [];
    var seen = new Set();
    return images.filter(function (img) {
      var name = normalizeMatchKey(img.name);
      if (!name || name.indexOf(combined) < 0) return false;
      var dedupeKey = name || img.id || img.url || img.dataUrl;
      if (seen.has(dedupeKey)) return false;
      seen.add(dedupeKey);
      return true;
    }).sort(function (a, b) {
      return imageSequenceNo(a.name) - imageSequenceNo(b.name);
    });
  }
  var IMAGE_CELL_MAX = 4;
  function previewSrc(img) {
    var base = img.url || img.dataUrl || "";
    if (/lh3\.googleusercontent\.com\/d\//.test(base)) return base.replace(/=s\d+$/, "=s900");
    return img.dataUrl || base;
  }
  function imageCellMarkup(images, attachKey, row) {
    var shown = images.slice(0, IMAGE_CELL_MAX);
    var extra = images.length - shown.length;
    var html = shown.map(function (img) {
      var full = esc(previewSrc(img));
      var isVideo = img.mediaType === "video";
      var hasPoster = !!(img.url || img.dataUrl);
      var inner = isVideo
        ? (hasPoster
          ? '<img src="' + esc(img.url || img.dataUrl || "") + '" class="detail-thumb" loading="lazy"><span class="detail-thumb-play">\u25B6</span>'
          : '<span class="detail-thumb-video">\uD83C\uDFA5</span>')
        : '<img src="' + esc(img.url || img.dataUrl || "") + '" class="detail-thumb" loading="lazy">';
      return '<span class="detail-thumb-wrap" data-preview-src="' + full + '" data-media-type="' + (isVideo ? "video" : "image") + '" data-image-name="' + esc(img.name) + '" data-image-id="' + esc(img.id || "") + '" data-drive-view="' + esc(img.driveViewUrl || "") + '" title="' + esc(img.name) + '">' + inner + '</span>';
    }).join("");
    if (extra > 0) html += '<span class="detail-thumb-more">+' + extra + '</span>';
    html += '<button type="button" class="detail-thumb-attach" data-attach-key="' + esc(attachKey) + '" data-receipt-no="' + esc((row && row.receiptNo) || "") + '" data-seq="' + esc((row && row.seq) || "") + '" data-code="' + esc((row && row.code) || "") + '" title="\uC774\uBBF8\uC9C0/\uC601\uC0C1 \uB9C1\uD06C \uCD94\uAC00 (\uAD6C\uAE00 \uB4DC\uB77C\uC774\uBE0C \uACF5\uC720 \uB9C1\uD06C \uB4F1)">\uB9C1\uD06C\uCD94\uAC00</button>';
    return html;
  }
  function detailTableMarkup(rows) {
    var colgroup = '<colgroup><col class="detail-col-idx"><col class="detail-col-category"><col class="detail-col-type"><col class="detail-col-brand"><col class="detail-col-source"><col class="detail-col-code"><col class="detail-col-color"><col class="detail-col-lot"><col class="detail-col-supplier"><col class="detail-col-defect"><col class="detail-col-image"></colgroup>';
    var header = colgroup + '<thead><tr><th colspan="2">\uAD6C\uBD84</th><th>\uC720\uD615</th><th>\uBE0C\uB79C\uB4DC</th><th>\uC6D0\uC778\uCC98</th><th>\uC81C\uD488\uCF54\uB4DC</th><th>\uC0C9\uC0C1</th><th>LOT NO</th><th>\uACF5\uAE09</th><th>\uD558\uC790\uB0B4\uC5ED</th><th>\uC774\uBBF8\uC9C0</th></tr></thead>';
    if (!rows.length) {
      return header + '<tbody><tr><td colspan="11" class="empty-cell">' + T.noData + '</td></tr></tbody>';
    }
    var sorted = sortDetails(rows);
    return header + '<tbody>' + sorted.map(function (r, i) {
      var attachKey = normalizeMatchKey(r.receiptNo) + normalizeMatchKey(r.seq) + normalizeMatchKey(r.code);
      var defect = defectDescMarkup(r, attachKey);
      var images = matchingImages(r.receiptNo, r.seq, r.code);
      if (r.photoLink) {
        var resolveFn = window.resolveImageLinkUrl;
        var embedFn = window.driveViewUrlFromShareUrl;
        var links = r.photoLink.split(",").map(function (v) { return v.trim(); }).filter(Boolean);
        var kinds = (r.photoKind || "").split(",").map(function (v) { return v.trim(); });
        var sheetImages = links.map(function (link, linkIndex) {
          var resolvedPhoto = resolveFn ? resolveFn(link) : link;
          var kind = kinds[linkIndex] || "";
          var sheetMediaType = /영상|video/i.test(kind) ? "video" : "image";
          return { id: "sheet_" + attachKey + "_" + linkIndex, name: "SHEET_" + attachKey + "_" + linkIndex, url: resolvedPhoto, dataUrl: resolvedPhoto, mediaType: sheetMediaType, driveViewUrl: embedFn ? embedFn(link) : "" };
        });
        images = sheetImages.concat(images);
      }
      return '<tr><td class="detail-row-num-cell">' + (i + 1) + '</td><td class="detail-category-cell">' + esc(r.category) + '</td><td>' + esc(r.type) + '</td><td>' + esc(r.brand) + '</td><td>' + esc(r.source) + '</td><td>' + esc(r.code) + '</td><td>' + esc(r.color) + '</td><td>' + esc(r.lot) + '</td><td>' + esc(r.supplier) + '</td><td class="left defect-desc" data-defect-key="' + esc(attachKey) + '">' + defect + '</td><td class="image-cell">' + imageCellMarkup(images, attachKey, r) + '</td></tr>';
    }).join("") + '</tbody>';
  }
  function renderDetails(rows) {
    var table = document.getElementById("detailTable");
    if (!table) return;
    var html = detailTableMarkup(rows);
    if (html !== lastDetailHtml) {
      lastDetailHtml = html;
      table.innerHTML = html;
    }
  }
  function formatWeekRangeLabel(startKey, endKey) {
    function fmt(k) { var p = k.split("-"); return (+p[1]) + "\uC6D4" + (+p[2]) + "\uC77C"; }
    return startKey === endKey ? fmt(startKey) : (fmt(startKey) + " ~ " + fmt(endKey));
  }
  function ensureWeeklyReceiptControls() {
    var y = document.getElementById("weeklyReceiptYearSelect");
    var sd = document.getElementById("weeklyReceiptStartDateInput");
    var ed = document.getElementById("weeklyReceiptEndDateInput");
    if (!y || !sd || !ed) return null;
    var now = new Date();
    var firstRun = !forcedInitialWeeklyReceiptPeriod;
    forcedInitialWeeklyReceiptPeriod = true;
    if (!y.options.length) for (var yy = 2024; yy <= 2027; yy++) y.appendChild(new Option(yy + "\uB144", String(yy)));
    if (firstRun || !y.value) y.value = String(now.getFullYear());
    if (firstRun || !sd.value || !ed.value) {
      var lastWeek = lastWeekMonToFri(now);
      sd.value = lastWeek.startKey;
      ed.value = lastWeek.endKey;
    }
    if (ed.value < sd.value) ed.value = sd.value;
    var year = +(txt(y.value).replace(/[^0-9]/g, "")) || now.getFullYear();
    return { year: year, startKey: sd.value, endKey: ed.value };
  }
  function lastWeekMonToFri(now) {
    var thisMon = monday(now);
    var lastMon = new Date(thisMon.getTime()); lastMon.setDate(lastMon.getDate() - 7);
    var lastFri = new Date(lastMon.getTime()); lastFri.setDate(lastFri.getDate() + 4);
    return { startKey: dateKey(lastMon), endKey: dateKey(lastFri), year: lastMon.getFullYear() };
  }
  window.__resetWeeklyReceiptToLastWeek = function () {
    var y = document.getElementById("weeklyReceiptYearSelect");
    var sd = document.getElementById("weeklyReceiptStartDateInput");
    var ed = document.getElementById("weeklyReceiptEndDateInput");
    if (!sd || !ed) return;
    var lastWeek = lastWeekMonToFri(new Date());
    sd.value = lastWeek.startKey;
    ed.value = lastWeek.endKey;
    if (y) y.value = String(lastWeek.year);
    scheduleStableRender();
  };
  var PACKAGING_OPTIONS = ["4라인", "7라인"];
  var PACKAGING_OTHER_VALUE = "__other__";
  function ensurePackagingSelectOptions() {
    var sel = document.getElementById("weeklyReceiptPackagingSelect");
    if (!sel) return;
    if (sel.dataset.v23Packaging === "fixed") return;
    var old = sel.value;
    sel.innerHTML = '<option value="">전체</option>' +
      PACKAGING_OPTIONS.map(function (v) { return '<option value="' + esc(v) + '">' + esc(v) + '</option>'; }).join("") +
      '<option value="' + PACKAGING_OTHER_VALUE + '">기타</option>';
    sel.dataset.v23Packaging = "fixed";
    sel.value = (PACKAGING_OPTIONS.indexOf(old) >= 0 || old === PACKAGING_OTHER_VALUE) ? old : "";
  }
  var lastWeeklyReceiptRows = [];
  var lastWeeklyReceiptPopupTitle = "";
  function renderWeeklyReceiptTable() {
    var table = document.getElementById("weeklyReceiptDetailTable");
    if (!table) return;
    var s = ensureWeeklyReceiptControls();
    if (!s) return;
    ensurePackagingSelectOptions();
    var packagingSel = document.getElementById("weeklyReceiptPackagingSelect");
    var packagingFilter = packagingSel ? packagingSel.value : "";
    var rows = receiptItems.filter(function (r) { return r.dateKey >= s.startKey && r.dateKey <= s.endKey; });
    rows = packagingFilter === PACKAGING_OTHER_VALUE
      ? rows.filter(function (r) { return PACKAGING_OPTIONS.indexOf(r.packaging) < 0; })
      : packagingFilter
        ? rows.filter(function (r) { return r.packaging === packagingFilter; })
        : rows;
    lastWeeklyReceiptRows = rows;
    var packagingLabel = packagingFilter === PACKAGING_OTHER_VALUE ? "기타" : (packagingFilter || "전체");
    lastWeeklyReceiptPopupTitle = s.year + "년 " + formatWeekRangeLabel(s.startKey, s.endKey) + " (" + packagingLabel + ")";
    var html = detailTableMarkup(rows);
    if (html !== lastWeeklyReceiptHtml) {
      lastWeeklyReceiptHtml = html;
      table.innerHTML = html;
    }
    table.ondblclick = openWeeklyReceiptTypePopup;
  }
  function openWeeklyReceiptTypePopup() {
    var rows = lastWeeklyReceiptRows;
    var total = rows.length;
    var loss = rows.reduce(function (s, r) { return s + (r.amount || 0); }, 0);
    var top = topItems(rows, 3);
    var main = top[0] || { key: "-", qty: 0 };
    var catItems = dayTypePieItems(rows).filter(function (item) { return item.value > 0; });
    var popup = window.open("", "weeklyReceiptSummaryV23_" + Date.now(), "popup=yes,width=1800,height=840,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes");
    if (!popup) return;
    var catHtml = catItems.map(function (item) { return '<div>' + esc(item.label) + ' <b>' + comma(item.value) + '건</b></div>'; }).join("");
    var tagsHtml = top.map(function (t) { return '<span>' + esc(t.key) + ' <b>' + comma(t.qty) + '건</b></span>'; }).join("");
    popup.document.write('<!doctype html><html lang="ko"><head><meta charset="utf-8" /><title>' + esc(lastWeeklyReceiptPopupTitle) + '</title><style>' +
      'body{margin:0;padding:20px;color:#111827;background:#f7f7f7;font-family:"Malgun Gothic","Segoe UI",Arial,sans-serif}' +
      'header{position:relative;padding:22px 30px;margin-bottom:18px;border-radius:18px;background:#fff;box-shadow:0 6px 18px rgba(15,23,42,.10)}' +
      'h1{margin:0;font-size:36px}.close{position:absolute;right:18px;top:16px;border:0;background:transparent;font-size:44px;font-weight:900;cursor:pointer}' +
      '.kpi-panel{background:#e9edf5;border-radius:18px;padding:24px}' +
      '.kpi-grid{display:flex;gap:22px}' +
      '.kpi{flex:1;background:#fff;border:1px solid #edf0f4;border-radius:10px;padding:22px 24px}' +
      '.kpi span{display:block;font-size:26px;color:#374151;font-weight:800;margin-bottom:16px}' +
      '.kpi strong{font-size:52px;color:#c22323}' +
      '.kpi strong.purple{color:#7950f2;font-size:40px}' +
      '.kpi em{font-style:normal;font-size:26px;color:#6b7280;margin-left:6px}' +
      '.kpi small{display:block;font-size:23px;color:#8b95a1;margin-top:10px}' +
      '.cat-breakdown{display:grid;gap:8px;margin-top:18px;font-size:25px;color:#4b5563;font-weight:700}' +
      '.kpi-tags{display:flex;gap:8px;margin-top:18px;flex-wrap:wrap}' +
      '.kpi-tags span{display:inline-flex;align-items:center;gap:4px;background:#eef1f7;border-radius:20px;padding:6px 16px;font-size:23px;font-weight:700;color:#374151}' +
      '.kpi-tags span b{font-weight:900}' +
      '</style></head><body><header><button class="close" onclick="window.close()">×</button><h1>' + esc(lastWeeklyReceiptPopupTitle) + '</h1></header>' +
      '<div class="kpi-panel"><div class="kpi-grid">' +
        '<div class="kpi"><span>접수건수</span><strong>' + comma(total) + '</strong><em>건</em><small>선택 조건 기준</small><div class="cat-breakdown">' + catHtml + '</div></div>' +
        '<div class="kpi"><span>손실금액</span><strong>' + comma(loss) + '</strong><em>원</em><small>R열 합계 금액 기준</small></div>' +
        '<div class="kpi"><span>주요 접수 품목</span><strong class="purple">' + esc(main.key) + '</strong><em>' + comma(main.qty) + '건</em><div class="kpi-tags">' + tagsHtml + '</div></div>' +
      '</div></div>' +
      '<script>document.addEventListener("keydown",function(e){if(e.key==="Escape")window.close();});<\/script>' +
      '</body></html>');
    popup.document.close();
  }
  function render(force) {
    var s = selected();
    if (!s) return;
    if (!loaded) {
      if (!loading) loadData();
      return;
    }
    var set = new Set((s.week && s.week.days) || []);
    var weekRows = receiptItems.filter(function (r) { return r.year === s.year && r.month === s.month && set.has(r.dateKey); });
    var detailDate = ensureDetailDateInput();
    var detailRows = receiptItems.filter(function (r) { return r.dateKey === detailDate; });
    var key = [s.year, s.month, s.weekNo, detailDate, receiptItems.length, weekRows.length, detailRows.length].join("|");
    var cards = document.getElementById("dailyReceiptCards");
    var needsCardsRepair = cards && (!cards.querySelector(".weekly-kpi") || (cards.textContent || "").indexOf("\uC811\uC218\uAC74\uC218") < 0);
    if (!force && key === lastRenderKey && !needsCardsRepair) return;
    lastRenderKey = key;
    renderGuard = true;
    renderCards(weekRows, s);
    renderSummary(receiptItems);
    renderDetails(detailRows);
    renderWeeklyReceiptTable();
    setTimeout(function () { renderGuard = false; }, 0);
  }
  function scheduleStableRender() {
    stableTimers.forEach(function (timer) { clearTimeout(timer); });
    stableTimers = [setTimeout(function () { render(false); }, 40)];
  }
  function installDailyRenderOwnership() {
    var summaryShim = function () { scheduleStableRender(); };
    var detailShim = function () { scheduleStableRender(); };
    window.__dailyStableGlobalRenderSummaryV23 = summaryShim;
    window.__dailyStableGlobalRenderDetailsV23 = detailShim;
    try {
      window.renderSummary = summaryShim;
      window.renderDetails = detailShim;
      window.eval("renderSummary = window.__dailyStableGlobalRenderSummaryV23; renderDetails = window.__dailyStableGlobalRenderDetailsV23;");
    } catch (_) {}
  }
  function installDailyDomRepair() {
    var panel = document.getElementById("dailyDashboardPanel");
    if (!window.MutationObserver || !panel || panel.__dailyStableRepairV23) return;
    panel.__dailyStableRepairV23 = true;
    var repairTimer = 0;
    var observer = new MutationObserver(function () {
      if (renderGuard || !loaded) return;
      clearTimeout(repairTimer);
      repairTimer = setTimeout(function () {
        var summary = document.getElementById("summaryTable");
        var cards = document.getElementById("dailyReceiptCards");
        var detailSelect = document.getElementById("detailDateSelect");
        var detailTable = document.getElementById("detailTable");
        var summaryText = summary ? summary.textContent || "" : "";
        var cardsText = cards ? cards.textContent || "" : "";
        var detailSelectText = detailSelect ? detailSelect.textContent || "" : "";
        var detailText = detailTable ? detailTable.textContent || "" : "";
        var badCards = cards && (!cards.querySelector(".weekly-kpi") || cardsText.indexOf("\uC811\uC218\uAC74\uC218") < 0 || cardsText.indexOf("\uC190\uC2E4\uAE08\uC561") < 0 || cardsText.indexOf("\uC8FC\uC694 \uC811\uC218 \uD488\uBAA9") < 0);
        var badSummary = summary && summaryText.indexOf(T.pending) < 0;
        var badSelect = detailSelect && /날짜\s*없음|\uB0A0\uC9DC\s*\uC5C6\uC74C/.test(detailSelectText);
        var badDetail = detailTable && detailText.indexOf(T.noData) < 0 && !detailTable.querySelector(".detail-category-cell");
        if (badCards || badSummary || badSelect || badDetail) render(true);
      }, 80);
    });
    observer.observe(panel, { childList: true, subtree: true });
  }
  function setStatus(msg) {
    var cards = document.getElementById("dailyReceiptCards");
    if (cards) cards.innerHTML = '<div class="weekly-empty-message">' + esc(msg) + '</div>';
  }
  async function waitXlsx() {
    for (var i = 0; i < 40; i++) {
      if (window.XLSX) return true;
      await new Promise(function (r) { setTimeout(r, 250); });
    }
    return false;
  }
  async function loadData() {
    if (loading || loaded) return;
    loading = true;
    try {
      setStatus("\uB204\uC801\uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4.");
      if (!await waitXlsx()) throw new Error("XLSX load failed");
      var sourceUrl = "";
      var s = sharedState();
      if (s && Array.isArray(s.uploads)) {
        var localEntry = s.uploads.find(function (u) { return u.kind === "receiptHistory" && u.sourceUrl; });
        if (localEntry) sourceUrl = localEntry.sourceUrl;
      }
      if (!sourceUrl) {
        var stateRes = await fetch("/api/claim-dashboard-state", { cache: "no-store" });
        if (!stateRes.ok) throw new Error("state " + stateRes.status);
        var saved = await stateRes.json();
        var group = (saved.groups || []).find(function (g) { return (g.kind || g.type) === "receiptHistory" && g.sourceUrl; });
        if (!group) throw new Error("no receiptHistory link");
        sourceUrl = group.sourceUrl;
        try { localStorage.setItem("qualityClaimDashboard.savedLinks.v1", JSON.stringify(saved)); } catch (_) {}
      }
      var isPublished = /docs\.google\.com\/spreadsheets\/d\/e\//.test(sourceUrl);
      var wb;
      if (isPublished) {
        var csvRes = await fetch(sourceUrl, { cache: "no-store" });
        if (!csvRes.ok) throw new Error("csv " + csvRes.status);
        var csvText = await csvRes.text();
        wb = XLSX.read(csvText, { type: "string", cellDates: true });
      } else {
        var wbRes = await fetch("/api/google-workbook?url=" + encodeURIComponent(sourceUrl), { cache: "no-store" });
        if (!wbRes.ok) throw new Error("workbook " + wbRes.status);
        var buf = await wbRes.arrayBuffer();
        wb = XLSX.read(buf, { type: "array", cellDates: true });
      }
      var rows = [];
      wb.SheetNames.forEach(function (name) {
        var sheet = wb.Sheets[name];
        var data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: false });
        if (!sheetHeaderRow && data.length && !validRow(data[0])) sheetHeaderRow = data[0];
        data.forEach(function (row, idx) {
          if (validRow(row)) rows.push(rowToItem(row, name, idx));
        });
      });
      receiptItems = unique(rows);
      if (!receiptItems.length) throw new Error("parsed rows 0");
      loaded = true;
      loadAttempts = 0;
      render(true);
      if (dailyReadyResolve) { dailyReadyResolve(); dailyReadyResolve = null; }
    } catch (e) {
      loaded = false;
      setStatus(T.uploadedNoData + " (" + (e && e.message ? e.message : e) + ")");
      if (loadAttempts < 4) {
        loadAttempts += 1;
        setTimeout(function () { loadData(); }, 600 * loadAttempts);
      } else {
        console.error("[daily-stable-v23] load failed", e);
        if (dailyReadyResolve) {
          dailyReadyResolve();
          dailyReadyResolve = null;
        }
      }
    } finally {
      loading = false;
    }
  }
  function downloadRows(fileName, rows) {
    if (!window.XLSX || !rows.length) return;
    var aoa = rows.map(function (r) { return r.raw; });
    if (sheetHeaderRow && sheetHeaderRow.length) aoa = [sheetHeaderRow].concat(aoa);
    var ws = XLSX.utils.aoa_to_sheet(aoa);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "원본데이터");
    XLSX.writeFile(wb, fileName);
  }
  function currentRowsForExport() {
    var s = selected();
    if (!s) return null;
    var set = new Set((s.week && s.week.days) || []);
    var weekRows = receiptItems.filter(function (r) { return r.year === s.year && r.month === s.month && set.has(r.dateKey); });
    var detailSelect = document.getElementById("detailDateSelect");
    var detailDate = (detailSelect && detailSelect.value) || "";
    var detailRows = receiptItems.filter(function (r) { return r.dateKey === detailDate; });
    return { s: s, weekRows: weekRows, detailRows: detailRows, detailDate: detailDate };
  }
  window.__dailyStableExportDay = function () {
    var data = currentRowsForExport();
    if (!data) return;
    downloadRows("일일데이터_" + (data.detailDate || "selected") + ".xlsx", data.detailRows);
  };
  window.__dailyStableExportWeek = function () {
    var data = currentRowsForExport();
    if (!data) return;
    downloadRows("주간데이터_" + data.s.year + "-" + pad(data.s.month) + "_" + data.s.weekNo + "주.xlsx", data.weekRows);
  };
  function openDetailExportPopup() {
    var data = currentRowsForExport();
    if (!data) return;
    var rows = data.detailRows;
    var sorted = sortDetails(rows);
    var bodyRows = sorted.map(function (r, i) {
      var defect = esc(r.defect).replace(/\n/g, "<br>");
      return '<tr><td>' + (i + 1) + '</td><td>' + esc(r.dateKey) + '</td><td>' + esc(r.category) + '</td><td>' + esc(r.type) + '</td><td>' + esc(r.brand) + '</td><td>' + esc(r.source) + '</td><td>' + esc(r.code) + '</td><td>' + esc(r.color) + '</td><td>' + esc(r.lot) + '</td><td>' + esc(r.supplier) + '</td><td class="left">' + defect + '</td><td>' + comma(r.amount) + '</td></tr>';
    }).join("");
    var popup = window.open("", "dailyStableDetailExportV23", "width=1280,height=760,scrollbars=yes,resizable=yes");
    if (!popup) return;
    popup.document.open();
    popup.document.write('<!doctype html><html><head><meta charset="UTF-8"><title>고객클레임 일일접수 내역</title><style>body{font-family:"Malgun Gothic",Segoe UI,Arial,sans-serif;margin:18px;color:#0f172a}h1{font-size:22px;margin:0 0 8px}.toolbar{display:flex;gap:8px;margin:12px 0 14px}button{height:34px;padding:0 12px;border:1px solid #b9c7d8;border-radius:6px;background:#fff;font-weight:800;cursor:pointer}table{width:100%;border-collapse:collapse;font-size:13px}th,td{border:1px solid #d9e2ec;padding:8px;text-align:center;vertical-align:middle}th{background:#eef1f4;font-weight:900}.left{text-align:left;white-space:pre-wrap}.meta{color:#475569;font-size:13px}</style></head><body><h1>고객클레임 일일접수 내역</h1><div class="meta">' + esc(data.s.year + "년 " + data.s.month + "월 " + data.s.weekNo + "주" + (data.detailDate ? " / " + data.detailDate : "")) + ' · 표시 ' + comma(rows.length) + '건</div><div class="toolbar"><button onclick="window.opener&&window.opener.__dailyStableExportDay()">일일데이터 엑셀 다운로드</button><button onclick="window.opener&&window.opener.__dailyStableExportWeek()">주간데이터 엑셀 다운로드</button></div><table><thead><tr><th>No</th><th>일자</th><th>구분</th><th>유형</th><th>브랜드</th><th>원인처</th><th>제품코드</th><th>색상</th><th>LOT NO</th><th>공급</th><th>하자내역</th><th>금액</th></tr></thead><tbody>' + (bodyRows || '<tr><td colspan="12">표시할 자료가 없습니다.</td></tr>') + '</tbody></table></body></html>');
    popup.document.close();
    attachEscToClose(popup);
  }
  document.addEventListener("dblclick", function (event) {
    var table = document.getElementById("detailTable");
    if (!table || !table.contains(event.target)) return;
    event.preventDefault();
    openDetailExportPopup();
  }, true);
  document.addEventListener("change", function (event) {
    if (!event.target || ["dailyYearSelect", "dailyMonthSelect", "dailyWeekSelect", "detailDateSelect"].indexOf(event.target.id) < 0) return;
    event.stopImmediatePropagation();
    if (event.target.id === "dailyYearSelect" || event.target.id === "dailyMonthSelect") {
      var w = document.getElementById("dailyWeekSelect");
      if (w) w.innerHTML = "";
    }
    scheduleStableRender();
  }, true);
  document.addEventListener("change", function (event) {
    if (!event.target || ["weeklyReceiptYearSelect", "weeklyReceiptStartDateInput", "weeklyReceiptEndDateInput", "weeklyReceiptPackagingSelect"].indexOf(event.target.id) < 0) return;
    event.stopImmediatePropagation();
    if (event.target.id === "weeklyReceiptYearSelect") {
      var yy = +(txt(event.target.value).replace(/[^0-9]/g, ""));
      ["weeklyReceiptStartDateInput", "weeklyReceiptEndDateInput"].forEach(function (id) {
        var input = document.getElementById(id);
        if (input && input.value && yy) {
          var parts = input.value.split("-");
          input.value = yy + "-" + parts[1] + "-" + parts[2];
        }
      });
    }
    setTimeout(renderWeeklyReceiptTable, 0);
  }, true);
  document.addEventListener("DOMContentLoaded", function () {
    return;
    var dailyPanel = document.getElementById("dailyDashboardPanel");
    if (window.MutationObserver && dailyPanel) {
      var observer = new MutationObserver(function () {
        if (!loaded || renderGuard) return;
        var active = dailyPanel.classList.contains("active");
        if (!active) return;
        var detail = document.getElementById("detailDateSelect");
        var detailText = detail ? detail.textContent : "";
        var tableText = (document.getElementById("detailTable") || {}).textContent || "";
        if (/날짜 없음|날짜\s*없음/.test(detailText) || /업로드된 데이터가 없습니다|선택 날짜 자료가 없습니다/.test(tableText)) {
          scheduleStableRender();
        }
      });
      observer.observe(dailyPanel, { childList: true, subtree: true, characterData: true });
    }
  });
  function keepClaimAccumClean() {
    var body = document.getElementById("defectCloseDashboardBody");
    if (!body) return;
    if (body.querySelector(".claim-accum-header") || body.querySelector("#claimAccumToggle") || body.querySelector(".claim-accum-card-grid")) {
      body.innerHTML = '<iframe class="defect-close-frame" title="defect close dashboard" src="dashboard_selected_months/dashboard_selected_months.html" style="width:100%;height:780px;border:0;"></iframe>';
    }
  }
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest || !target.closest('[data-dashboard-tab="claimAccum"], [data-tab="claimAccum"]')) return;
    setTimeout(keepClaimAccumClean, 80);
    setTimeout(keepClaimAccumClean, 500);
  }, true);
  var activeAttachKey = null;
  var lightboxGroup = [];
  var lightboxIndex = 0;
  var lightboxZoom = 1;
  function ensureAttachLightbox() {
    var el = document.getElementById("dailyAttachLightbox");
    if (el) return el;
    el = document.createElement("div");
    el.id = "dailyAttachLightbox";
    el.className = "daily-lightbox-overlay";
    el.innerHTML =
      '<div class="daily-lightbox-header">' +
        '<div><div class="daily-lightbox-name"></div><div class="daily-lightbox-meta"></div></div>' +
        '<div class="daily-lightbox-header-actions">' +
          '<button type="button" class="daily-lightbox-icon-btn daily-lightbox-open-drive" title="새 창에서 보기 (영상 재생)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg></button>' +
          '<button type="button" class="daily-lightbox-icon-btn daily-lightbox-download" title="다운로드"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg></button>' +
          '<button type="button" class="daily-lightbox-icon-btn daily-lightbox-delete" title="삭제"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13"/><path d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/></svg></button>' +
          '<button type="button" class="daily-lightbox-icon-btn daily-lightbox-close" title="닫기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<div class="daily-lightbox-stage">' +
        '<button type="button" class="daily-lightbox-nav prev">‹</button>' +
        '<div class="daily-lightbox-media-wrap"></div>' +
        '<button type="button" class="daily-lightbox-nav next">›</button>' +
        '<div class="daily-lightbox-counter"></div>' +
      '</div>' +
      '<div class="daily-lightbox-footer">' +
        '<button type="button" class="daily-lightbox-zoom-out">−</button>' +
        '<span class="daily-lightbox-zoom-pct">100%</span>' +
        '<button type="button" class="daily-lightbox-zoom-in">+</button>' +
      '</div>';
    document.body.appendChild(el);
    el.addEventListener("click", function (event) {
      if (event.target === el) closeAttachLightbox();
    });
    el.querySelector(".daily-lightbox-close").addEventListener("click", closeAttachLightbox);
    el.querySelector(".daily-lightbox-nav.prev").addEventListener("click", function () { stepLightbox(-1); });
    el.querySelector(".daily-lightbox-nav.next").addEventListener("click", function () { stepLightbox(1); });
    el.querySelector(".daily-lightbox-zoom-out").addEventListener("click", function () { zoomLightbox(-1); });
    el.querySelector(".daily-lightbox-zoom-in").addEventListener("click", function () { zoomLightbox(1); });
    el.querySelector(".daily-lightbox-open-drive").addEventListener("click", function () {
      var item = lightboxGroup[lightboxIndex];
      if (!item || !item.driveViewUrl) return;
      window.open(item.driveViewUrl, "driveView_" + Date.now(), "popup=yes,width=1100,height=800,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes,noopener");
    });
    el.querySelector(".daily-lightbox-download").addEventListener("click", function () {
      var item = lightboxGroup[lightboxIndex];
      if (!item || !item.src) return;
      downloadLightboxItem(item);
    });
    el.querySelector(".daily-lightbox-delete").addEventListener("click", function () {
      var item = lightboxGroup[lightboxIndex];
      if (!item || !item.id) return;
      if (!window.confirm("정말 삭제하시겠습니까?")) return;
      deleteAttachedImage(item.id);
      closeAttachLightbox();
    });
    document.addEventListener("keydown", function (event) {
      if (!el.classList.contains("open")) return;
      if (event.key === "ArrowLeft") stepLightbox(-1);
      else if (event.key === "ArrowRight") stepLightbox(1);
      else if (event.key === "Escape") closeAttachLightbox();
    });
    return el;
  }
  function lightboxDownloadName(item) {
    var name = item.name || "download";
    if (/\.[a-zA-Z0-9]{2,5}$/.test(name)) return name;
    return name + (item.isVideo ? ".mp4" : ".jpg");
  }
  function downloadLightboxItem(item) {
    var fileName = lightboxDownloadName(item);
    fetch(item.src).then(function (res) {
      if (!res.ok) throw new Error("fetch failed");
      return res.blob();
    }).then(function (blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }).catch(function () {
      var win = window.open(item.src, "_blank");
      if (!win) window.location.href = item.src;
    });
  }
  function openAttachLightbox(wrap) {
    var cell = wrap.closest(".image-cell");
    var wraps = cell ? Array.prototype.slice.call(cell.querySelectorAll(".detail-thumb-wrap")) : [wrap];
    lightboxGroup = wraps.map(function (w) {
      return {
        src: w.getAttribute("data-preview-src") || "",
        name: w.getAttribute("data-image-name") || "",
        id: w.getAttribute("data-image-id") || "",
        isVideo: w.getAttribute("data-media-type") === "video",
        driveViewUrl: w.getAttribute("data-drive-view") || ""
      };
    });
    var startIndex = wraps.indexOf(wrap);
    lightboxIndex = startIndex < 0 ? 0 : startIndex;
    lightboxZoom = 1;
    ensureAttachLightbox().classList.add("open");
    renderLightbox();
  }
  function stepLightbox(delta) {
    if (!lightboxGroup.length) return;
    lightboxIndex = (lightboxIndex + delta + lightboxGroup.length) % lightboxGroup.length;
    lightboxZoom = 1;
    renderLightbox();
  }
  function zoomLightbox(dir) {
    lightboxZoom = Math.min(3, Math.max(1, lightboxZoom + dir * 0.25));
    applyLightboxZoom();
  }
  function applyLightboxZoom() {
    var el = document.getElementById("dailyAttachLightbox");
    if (!el) return;
    var media = el.querySelector(".daily-lightbox-media");
    if (media) media.style.transform = "scale(" + lightboxZoom + ")";
    var pct = el.querySelector(".daily-lightbox-zoom-pct");
    if (pct) pct.textContent = Math.round(lightboxZoom * 100) + "%";
  }
  function renderLightbox() {
    var el = ensureAttachLightbox();
    var item = lightboxGroup[lightboxIndex];
    if (!item) return;
    var mediaWrap = el.querySelector(".daily-lightbox-media-wrap");
    mediaWrap.innerHTML = (item.isVideo && !item.driveViewUrl)
      ? '<video class="daily-lightbox-media" src="' + esc(item.src) + '" controls autoplay></video>'
      : '<img class="daily-lightbox-media" src="' + esc(item.src) + '">';
    var openBtn = el.querySelector(".daily-lightbox-open-drive");
    if (openBtn) openBtn.style.display = item.driveViewUrl ? "" : "none";
    el.querySelector(".daily-lightbox-name").textContent = item.name;
    el.querySelector(".daily-lightbox-meta").textContent = (lightboxIndex + 1) + " / " + lightboxGroup.length;
    el.querySelector(".daily-lightbox-counter").textContent = (lightboxIndex + 1) + " / " + lightboxGroup.length;
    el.querySelector(".daily-lightbox-delete").style.display = item.id ? "" : "none";
    var showNav = lightboxGroup.length > 1;
    el.querySelector(".daily-lightbox-nav.prev").style.display = showNav ? "" : "none";
    el.querySelector(".daily-lightbox-nav.next").style.display = showNav ? "" : "none";
    el.querySelector(".daily-lightbox-counter").style.display = showNav ? "" : "none";
    applyLightboxZoom();
  }
  function closeAttachLightbox() {
    var el = document.getElementById("dailyAttachLightbox");
    if (!el) return;
    el.classList.remove("open");
    var mediaWrap = el.querySelector(".daily-lightbox-media-wrap");
    if (mediaWrap) mediaWrap.innerHTML = "";
  }
  function setActiveAttachKey(key, zoneEl) {
    var zones = document.querySelectorAll(".detail-thumb-attach");
    for (var i = 0; i < zones.length; i++) zones[i].classList.remove("active-target");
    activeAttachKey = key || null;
    if (zoneEl) zoneEl.classList.add("active-target");
  }
  function attachLinkToKey(url, key, meta) {
    if (!url || !key) return;
    var addUploadEntry = window.addUploadEntry;
    var rebuildFromSelection = window.rebuildFromSelection;
    var renderAll = window.renderAll;
    var saveDashboardState = window.saveDashboardState;
    var createImageId = window.createImageId;
    var resolveImageLinkUrl = window.resolveImageLinkUrl;
    var driveViewUrlFromShareUrl = window.driveViewUrlFromShareUrl;
    if (!addUploadEntry || !rebuildFromSelection || !renderAll) return;
    var resolved = resolveImageLinkUrl ? resolveImageLinkUrl(url) : url;
    var isVideoKind = /영상|video/i.test((meta && meta.kind) || "") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(resolved);
    var image = {
      id: createImageId ? createImageId() : ("img_" + Date.now()),
      name: "ATTACH_" + key + "_" + Date.now() + "_0",
      url: resolved,
      dataUrl: resolved,
      mediaType: isVideoKind ? "video" : "image",
      mimeType: "",
      imageNo: 0,
      imageDate: "",
      driveSourced: true,
      driveViewUrl: driveViewUrlFromShareUrl ? driveViewUrlFromShareUrl(url) : ""
    };
    addUploadEntry({ kind: "images", fileName: "링크 첨부", label: "직접첨부", rows: [], images: [image], selected: true, excluded: 0 });
    rebuildFromSelection();
    renderAll();
    if (saveDashboardState) saveDashboardState();
    var sheetSyncUrl = window.PHOTO_LINK_SHEET_SYNC_URL;
    if (!sheetSyncUrl) return;
    if (!meta || !meta.receiptNo) {
      window.alert("시트 자동 연동 실패: 이 항목의 접수번호 정보를 찾지 못했습니다. (내부 오류 - 개발자에게 문의)");
      return;
    }
    fetch(sheetSyncUrl, {
      method: "POST",
      body: JSON.stringify({ receiptNo: meta.receiptNo, seq: meta.seq || "", code: meta.code || "", link: url, kind: meta.kind || "" })
    }).then(function (res) { return res.json(); }).then(function (data) {
      if (!data || !data.ok) {
        window.alert("시트 자동 연동 실패: " + (data && data.error ? data.error : "알 수 없는 오류") + "\n(사진은 이 브라우저에는 정상적으로 등록되었습니다.)");
      } else if (!data.updated) {
        window.alert("시트에서 이 항목과 일치하는 행을 찾지 못해 시트에는 반영되지 않았습니다.\n(접수번호: " + meta.receiptNo + " / 순번: " + (meta.seq || "") + " / 제품코드: " + (meta.code || "") + ")\n사진은 이 브라우저에는 정상적으로 등록되었습니다.");
      }
    }).catch(function (err) {
      window.alert("시트 자동 연동 요청이 실패했습니다: " + (err && err.message ? err.message : err) + "\n(사진은 이 브라우저에는 정상적으로 등록되었습니다.)");
    });
  }
  function deleteAttachedImage(imageId) {
    var st = sharedState();
    if (!st || !Array.isArray(st.uploads)) return;
    st.uploads.forEach(function (entry) {
      if (entry.kind === "images" && Array.isArray(entry.images)) {
        var idx = entry.images.findIndex(function (img) { return img.id === imageId; });
        if (idx >= 0) entry.images.splice(idx, 1);
      }
    });
    var rebuildFromSelection = window.rebuildFromSelection;
    var renderAll = window.renderAll;
    var saveDashboardState = window.saveDashboardState;
    if (rebuildFromSelection) rebuildFromSelection();
    if (renderAll) renderAll();
    if (saveDashboardState) saveDashboardState();
  }
  var defectColorSavedRange = null;
  function ensureDefectColorToolbar() {
    var bar = document.getElementById("defectColorToolbar");
    if (bar) return bar;
    bar = document.createElement("div");
    bar.id = "defectColorToolbar";
    bar.className = "defect-color-toolbar";
    bar.innerHTML =
      '<button type="button" data-color="#e03131" title="빨강"></button>' +
      '<button type="button" data-color="#1971c2" title="파랑"></button>' +
      '<button type="button" data-color="#2f9e44" title="초록"></button>' +
      '<button type="button" data-color="#f08c00" title="주황"></button>' +
      '<button type="button" data-color="#9c36b5" title="보라"></button>' +
      '<span class="defect-color-sep"></span>' +
      '<button type="button" class="defect-color-clear" data-color="" title="색상 지우기">⌀</button>';
    document.body.appendChild(bar);
    Array.prototype.forEach.call(bar.querySelectorAll("button"), function (btn) {
      if (btn.getAttribute("data-color")) btn.style.background = btn.getAttribute("data-color");
      btn.addEventListener("mousedown", function (e) { e.preventDefault(); });
      btn.addEventListener("click", function () { applyDefectColor(btn.getAttribute("data-color")); });
    });
    return bar;
  }
  function hideDefectColorToolbar() {
    var bar = document.getElementById("defectColorToolbar");
    if (bar) bar.classList.remove("show");
    defectColorSavedRange = null;
  }
  function applyDefectColor(color) {
    if (!defectColorSavedRange) return;
    var range = defectColorSavedRange;
    var container = range.commonAncestorContainer;
    var startEl = container.nodeType === 1 ? container : container.parentElement;
    var cell = startEl && startEl.closest ? startEl.closest(".defect-desc") : null;
    if (!cell) { hideDefectColorToolbar(); return; }
    cell.setAttribute("contenteditable", "true");
    cell.focus();
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      document.execCommand("styleWithCSS", false, true);
      if (color) {
        document.execCommand("foreColor", false, color);
      } else {
        document.execCommand("removeFormat");
      }
    } catch (_) {}
    sel.removeAllRanges();
    cell.removeAttribute("contenteditable");
    var key = cell.getAttribute("data-defect-key");
    if (key) {
      defectColorMap[key] = cell.innerHTML;
      saveDefectColorMap();
    }
    hideDefectColorToolbar();
  }
  function installDefectColorToolbar() {
    if (window.__dailyStableDefectColorInstalled) return;
    window.__dailyStableDefectColorInstalled = true;
    document.addEventListener("mouseup", function (event) {
      var toolbar = document.getElementById("defectColorToolbar");
      if (toolbar && toolbar.contains(event.target)) return;
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.toString().trim()) { hideDefectColorToolbar(); return; }
      var anchorEl = sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement);
      var cell = anchorEl && anchorEl.closest && anchorEl.closest(".defect-desc");
      if (!cell) { hideDefectColorToolbar(); return; }
      var range = sel.getRangeAt(0);
      defectColorSavedRange = range.cloneRange();
      var bar = ensureDefectColorToolbar();
      var rect = range.getBoundingClientRect();
      bar.style.left = Math.max(8, rect.left + rect.width / 2 - 90) + "px";
      bar.style.top = Math.max(8, rect.top - 44) + "px";
      bar.classList.add("show");
    });
    document.addEventListener("mousedown", function (event) {
      var toolbar = document.getElementById("defectColorToolbar");
      if (toolbar && !toolbar.contains(event.target) && !(event.target.closest && event.target.closest(".defect-desc"))) {
        hideDefectColorToolbar();
      }
    });
  }
  function ensureLinkAttachModal() {
    var el = document.getElementById("dailyLinkAttachModal");
    if (el) return el;
    el = document.createElement("div");
    el.id = "dailyLinkAttachModal";
    el.className = "modal";
    el.innerHTML =
      '<div class="modal-dialog" style="width:min(420px,92vw)">' +
        '<div class="modal-head"><h2 style="font-size:16px">이미지/영상 링크 추가</h2><button type="button" class="link-attach-close">닫기</button></div>' +
        '<label style="display:grid;gap:6px;margin-bottom:14px">' +
          '<span>링크 (구글 드라이브 공유 링크 등)</span>' +
          '<input type="text" class="link-attach-input" placeholder="https://drive.google.com/...">' +
        '</label>' +
        '<label style="display:flex;align-items:center;gap:8px;margin-bottom:18px;cursor:pointer">' +
          '<input type="checkbox" class="link-attach-video-check">' +
          '<span>영상입니다</span>' +
        '</label>' +
        '<div style="display:flex;justify-content:flex-end;gap:8px">' +
          '<button type="button" class="link-attach-cancel">취소</button>' +
          '<button type="button" class="link-attach-confirm insert-button">확인</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);
    function close() { el.classList.remove("open"); linkAttachZone = null; }
    function confirm() {
      var input = el.querySelector(".link-attach-input");
      var isVideo = el.querySelector(".link-attach-video-check").checked;
      var raw = (input.value || "").trim();
      var zone = linkAttachZone;
      close();
      if (!raw || !zone) return;
      attachLinkToKey(raw, zone.getAttribute("data-attach-key"), {
        receiptNo: zone.getAttribute("data-receipt-no") || "",
        seq: zone.getAttribute("data-seq") || "",
        code: zone.getAttribute("data-code") || "",
        kind: isVideo ? "영상" : "사진"
      });
    }
    el.addEventListener("click", function (event) { if (event.target === el) close(); });
    el.querySelector(".link-attach-close").addEventListener("click", close);
    el.querySelector(".link-attach-cancel").addEventListener("click", close);
    el.querySelector(".link-attach-confirm").addEventListener("click", confirm);
    el.querySelector(".link-attach-input").addEventListener("keydown", function (event) {
      if (event.key === "Enter") confirm();
    });
    document.addEventListener("keydown", function (event) {
      if (el.classList.contains("open") && event.key === "Escape") close();
    });
    return el;
  }
  var linkAttachZone = null;
  function openLinkAttachModal(zoneEl) {
    var el = ensureLinkAttachModal();
    linkAttachZone = zoneEl;
    el.querySelector(".link-attach-input").value = "";
    el.querySelector(".link-attach-video-check").checked = false;
    el.classList.add("open");
    setTimeout(function () { el.querySelector(".link-attach-input").focus(); }, 0);
  }
  function installImageClickOpen() {
    if (window.__dailyStableImageClickInstalled) return;
    window.__dailyStableImageClickInstalled = true;
    document.addEventListener("click", function (event) {
      var attachZone = event.target.closest && event.target.closest(".detail-thumb-attach");
      if (attachZone) {
        event.preventDefault();
        setActiveAttachKey(attachZone.getAttribute("data-attach-key"), attachZone);
        openLinkAttachModal(attachZone);
        return;
      }
      var wrap = event.target.closest && event.target.closest(".detail-thumb-wrap");
      if (wrap) {
        event.preventDefault();
        openAttachLightbox(wrap);
      }
    }, true);
  }
  document.addEventListener("DOMContentLoaded", function () {
    ensureControls();
    ensureWeeklyReceiptControls();
    installDailyRenderOwnership();
    installDailyDomRepair();
    installImageClickOpen();
    installDefectColorToolbar();
    loadData();
  });
  window.addEventListener("focus", function () {
    if (!loaded && !loading) loadData();
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && !loaded && !loading) loadData();
  });
  window.__dailyStableReloadV23 = function () {
    loaded = false;
    loading = false;
    loadAttempts = 0;
    loadData();
  };
  window.__dailyStableDebugV23 = function () {
    return {
      loaded: loaded,
      loading: loading,
      rows: receiptItems.length,
      selected: selected()
    };
  };
  if (document.readyState !== "loading") {
    ensureControls();
    ensureWeeklyReceiptControls();
    installDailyRenderOwnership();
    installDailyDomRepair();
    installImageClickOpen();
    installDefectColorToolbar();
    loadData();
  }
})();
