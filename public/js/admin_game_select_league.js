"use strict";
function Activity(sport, list, value){
    this.sport = sport;
    this.list = list;
    this.value = value;
}
var sports = new Array();
sports[0] = new Activity('축구', ['리그를 선택해주세요', 'EPL', '분데스리가', 'K리그'], ['', 'epl', 'bundes', 'kleague']);
sports[1] = new Activity('야구', ['리그를 선택해주세요', 'KBO', 'MLB', 'NPB'], ['', 'kbo', 'mlb', 'npb']);
sports[2] = new Activity('롤', ['리그를 선택해주세요', 'LCK', 'LPL'], ['', 'lck', 'lpl']);

function updateList(str){
    var frm = document.gameForm;
    var oriLen = frm.myList.length;
    var numSports;

    for (var i = 0; i < sports.length; i++){
        if (str == sports[i].sport) {
            numSports = sports[i].list.length;
            for (var j = 0; j < numSports; j++)
                frm.myList.options[j] = new Option(sports[i].list[j], sports[i].value[j]);
            for (var j = numSports; j < oriLen; j++)
                frm.myList.options[numSports] = null;
        }
    }
}

function Activity2(league, team, value){
    this.league = league;
    this.team = team;
    this.value = value;
}
var leagues = new Array();
leagues[0] = new Activity2('epl', ['맨시티', '리버풀', '첼시', '맨유', '토트넘', '아스널', '웨스트햄', 
                                '레스터시티', '울버햄턴', '브라이턴', '리즈유나이티드', '크리스탈팰리스',
                                '사우스햄튼', '에스턴빌라', '에버턴', '뉴캐슬', '브랜트포드', '왓포드',
                                '번리', '노리치시티'],
                                ['MCI', 'LIV', 'CHE', 'MUN', 'TOT', 'ARS', 'WHU', 'LEI', 'WOL', 'BHA',
                                'LEE', 'CRY', 'SOU', 'AVL', 'EVE', 'NEW', 'BRE', 'WAT', 'BRN', 'NOR']);
leagues[1] = new Activity2('bundes', ['바이에른뮌헨', '도르트문트', '레버쿠젠', '라이프치히', '프랑크푸르트',
                                '프라이부르크', '호펜하임', '우니온베를린', '쾰른', '마인츠05', '보훔',
                                '묀헨글라트바흐', '헤르타베를린', '볼프스부르크', '아우크스부르크', '빌레펠트',
                                '슈투트가르트', '그로이터퓌르트'],
                                ['FCB', 'BVB', 'LEV', 'RBL', 'SGE', 'SCF', 'TSG', 'FCU', 'KOE', 'M05',
                                'BOC', 'BMG', 'BSC', 'WOB', 'FCA', 'DSC', 'VFB', 'SGF']);
leagues[2] = new Activity2('kleague', ['전북현대', '울산현대', '대구FC', '성남FC', '포항스틸러스', 'FC서울',
                                '수원삼성', '강원FC', '광주FC', '인천FC', '김천상무', '제주FC', '경남FC',
                                '부산아이파크'],
                                ['CLB', 'USN', 'TAE', 'SNM', 'KPO', 'SEL', 'SWN', 'KAW', 'KWJ', 'INC',
                                'KMC', 'CHJ', 'KSN', 'PUS']);
leagues[3] = new Activity2('kbo', ['두산베어스', '삼성라이온즈', '롯데자이언츠', '키움히어로즈', '한화이글즈',
                                'SSG랜더스', 'NC다이노스', 'KT위즈', '기아타이거즈', 'LG트윈스'],
                                ['BEARS', 'LIONS', 'GIANTS', 'HEROES', 'EAGLES', 'LANDERS', 'DINOS', 'WIZ',
                                'TIGERS', 'TWINS']);
leagues[4] = new Activity2('mlb', ['LA다저스', '뉴욕양키스', '보스턴', '워싱턴', '텍사스', '시애틀', '오클랜드',
                                'LA에인절스', '클리블랜드', '시카고W', '미네소타', '디트로이트', '캔자스시티',
                                '토론토', '볼티모어', '템파베이', '샌프란시스코', '샌디에이고', '애리조나',
                                '콜로라도', '밀워키', '세인트루이스', '피츠버그', '휴스턴', '시카고컵스', '신시내티',
                                '애틀랜타', '마이애미', '뉴욕메츠', '필라델피아'],
                                ['LAD', 'NYY', 'BOS', 'WAS', 'TEX', 'SEA', 'OAK', 'LAA', 'CLE', 'CHW', 'MIN',
                                'DET', 'KC', 'TOR', 'BAL', 'TB', 'SF', 'SD', 'ARZ', 'COL', 'MIL', 'STL',
                                'PIT', 'HOU', 'CHC', 'CIN', 'ATL', 'MIA', 'NYM', 'PHI']);
leagues[5] = new Activity2('npb', ['요미우리', '히로시마', '소프트뱅크', '지바', '한신', '야쿠르트', '주니치',
                                '요코하마', '오릭스', '라쿠텐', '니혼햄', '세이부'],
                                ['YOM', 'HIR', 'SOF', 'CHI', 'HAN', 'YAK', 'CHU', 'YOK', 'ORI', 'RAK', 'NIP', 'SEI']);
leagues[6] = new Activity2('lck', ['T1', '젠지', '담원', '농심레드포스', 'DRX', 'KT롤스터', '광동프릭스',
                                '프레딧브리온', '한화생명', '리브샌드박스',],
                                ['T1', 'GEN', 'DWG', 'NS', 'DRX', 'KT', 'KDF', 'BRO', 'HLE', 'LSB']);
leagues[7] = new Activity2('lpl', ['FPX', 'RNG', 'JDG', 'IG', 'EDG', 'LNG', 'V5', 'WBG', 'OMG', 'BLG', 'TES',
                                'RA', 'UP', 'AL', 'LGD', 'WE', 'TT'],
                                ['FPX', 'RNG', 'JDG', 'IG', 'EDG', 'LNG', 'V5', 'WBG', 'OMG', 'BLG', 'TES',
                                'RA', 'UP', 'AL', 'LGD', 'WE', 'TT']);

function updateTeamList(str){
    var frm = document.gameForm;
    var oriLen = frm.mySelect1.length;
    var oriLen2 = frm.mySelect2.length;
    var numLeagues;

    for (var i = 0; i < leagues.length; i++){
        if (str == leagues[i].league) {
            numLeagues = leagues[i].team.length;
            for (var j = 0; j < numLeagues; j++) {
                frm.mySelect1.options[j] = new Option(leagues[i].team[j], leagues[i].value[j]);
                frm.mySelect2.options[j] = new Option(leagues[i].team[j], leagues[i].value[j]);
            }
            for (var j = numLeagues; j < oriLen; j++) {
                frm.mySelect1.options[numLeagues] = null;
            }
            for (var j = numLeagues; j < oriLen2; j++) {
                frm.mySelect2.options[numLeagues] = null;
            }

        }
    }
}

