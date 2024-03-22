let clubs = {};

function addClub() {
  const clubName = document.getElementById("clubName").value.trim();
    const clubCity = document.getElementById("clubCity").value.trim();
    
    if (clubName !== "" && clubCity !== "") {
        if (!clubs[clubName]) {
            clubs[clubName] = { 
                points: 0, 
                matchesPlayed: 0, 
                wins: 0, 
                draws: 0, 
                losses: 0, 
                goalsFor: 0, 
                goalsAgainst: 0,
                city: clubCity 
            };
            alert(`Klub ${clubName} dari ${clubCity} berhasil ditambahkan ke dalam liga.`);
        } else {
            alert(`Klub ${clubName} sudah ada dalam liga.`);
        }
    } else {
        alert("Nama klub dan kota klub harus diisi.");
    }
}

let multipleMatchesData = [];

function recordSingleMatch() {
  const homeTeam = document.getElementById("homeTeamSingle").value.trim();
  const awayTeam = document.getElementById("awayTeamSingle").value.trim();
  const homeGoals = parseInt(document.getElementById("homeGoalsSingle").value);
  const awayGoals = parseInt(document.getElementById("awayGoalsSingle").value);

  recordMatch(homeTeam, awayTeam, homeGoals, awayGoals);
}

function addMatch() {
  const homeTeam = document.getElementById("homeTeam").value.trim();
  const awayTeam = document.getElementById("awayTeam").value.trim();
  const homeGoals = parseInt(document.getElementById("homeGoals").value);
  const awayGoals = parseInt(document.getElementById("awayGoals").value);

  if (
    homeTeam !== "" &&
    awayTeam !== "" &&
    !isNaN(homeGoals) &&
    !isNaN(awayGoals)
  ) {
    multipleMatchesData.push({ homeTeam, awayTeam, homeGoals, awayGoals });
    alert("Data pertandingan ditambahkan.");
    document.getElementById("homeTeam").value = "";
    document.getElementById("awayTeam").value = "";
    document.getElementById("homeGoals").value = "";
    document.getElementById("awayGoals").value = "";
  } else {
    alert("Masukkan data pertandingan dengan benar.");
  }
}

function saveMultipleMatches() {
  for (let match of multipleMatchesData) {
    recordMatch(
      match.homeTeam,
      match.awayTeam,
      match.homeGoals,
      match.awayGoals
    );
  }
  multipleMatchesData = [];
  alert("Semua data pertandingan telah disimpan.");
}

function recordMatch(homeTeam, awayTeam, homeGoals, awayGoals) {
    if (homeTeam.trim() !== "" && awayTeam.trim() !== "" && !isNaN(homeGoals) && !isNaN(awayGoals)) {
        if (homeTeam !== awayTeam) {
            if (clubs[homeTeam] && clubs[awayTeam]) {
                const homeClub = clubs[homeTeam];
                const awayClub = clubs[awayTeam];

                homeClub.matchesPlayed++;
                awayClub.matchesPlayed++;

                homeClub.goalsFor += homeGoals;
                homeClub.goalsAgainst += awayGoals;
                awayClub.goalsFor += awayGoals;
                awayClub.goalsAgainst += homeGoals;

                if (homeGoals > awayGoals) {
                    homeClub.wins++;
                    awayClub.losses++;
                    homeClub.points += 3;
                    alert(`${homeTeam} memenangkan pertandingan melawan ${awayTeam} dengan skor ${homeGoals}-${awayGoals}.`);
                } else if (homeGoals < awayGoals) {
                    awayClub.wins++;
                    homeClub.losses++;
                    awayClub.points += 3;
                    alert(`${awayTeam} memenangkan pertandingan melawan ${homeTeam} dengan skor ${awayGoals}-${homeGoals}.`);
                } else {
                    homeClub.draws++;
                    awayClub.draws++;
                    homeClub.points++;
                    awayClub.points++;
                    alert(`Pertandingan antara ${homeTeam} dan ${awayTeam} berakhir imbang dengan skor ${homeGoals}-${awayGoals}.`);
                }
            } else {
                alert("Salah satu atau kedua klub tidak terdaftar dalam liga.");
            }
        } else {
            alert("Klub tuan rumah dan klub tamu tidak boleh sama.");
        }
    } else {
        alert("Masukkan data pertandingan dengan benar.");
    }
}


function addMatch() {
  const matchesContainer = document.getElementById("matchesContainer");
  const matchDiv = document.createElement("div");

  matchDiv.innerHTML = `
  <div class="matchesContainer">
        <input type="text" class="homeTeam" placeholder="Klub Tuan Rumah">
        <input type="text" class="awayTeam" placeholder="Klub Tamu">
        <input type="number" class="homeGoals" placeholder="Gol Tuan Rumah">
        <input type="number" class="awayGoals" placeholder="Gol Tamu">
  </div>
    `;

  matchesContainer.appendChild(matchDiv);
}

function saveMultipleMatches() {
  const matchDivs = document.querySelectorAll("#matchesContainer div");
  for (let matchDiv of matchDivs) {
    const homeTeam = matchDiv.querySelector(".homeTeam").value.trim();
    const awayTeam = matchDiv.querySelector(".awayTeam").value.trim();
    const homeGoals = parseInt(matchDiv.querySelector(".homeGoals").value);
    const awayGoals = parseInt(matchDiv.querySelector(".awayGoals").value);
    recordMatch(homeTeam, awayTeam, homeGoals, awayGoals);
  }
  alert("Semua data pertandingan telah disimpan.");
  document.getElementById("matchesContainer").innerHTML = ""; // Kosongkan kontainer setelah disimpan
}

function showMenu(menuNumber) {
  document.getElementById("menu1").style.display = "none";
  document.getElementById("menu2").style.display = "none";
  document.getElementById("menu3").style.display = "none";

  if (menuNumber === 1) {
    document.getElementById("menu1").style.display = "block";
  } else if (menuNumber === 2) {
    document.getElementById("menu2").style.display = "block";
  } else if (menuNumber === 3) {
    displayLeagueTable();
    document.getElementById("menu3").style.display = "block";
  }
}

function displayLeagueTable() {
  const leagueTable = document.getElementById("leagueTable");
  leagueTable.innerHTML = `
        <tr>
            <th>No</th>
            <th>Klub</th>
            <th>Ma</th>
            <th>Me</th>
            <th>S</th>
            <th>K</th>
            <th>GM</th>
            <th>GK</th>
            <th>Point</th>
        </tr>
    `;

  let position = 1;
  for (let club in clubs) {
    const clubData = clubs[club];
    const goalDifference = clubData.goalsFor - clubData.goalsAgainst;
    leagueTable.innerHTML += `
            <tr>
                <td>${position}</td>
                <td>${club}</td>
                <td>${clubData.matchesPlayed}</td>
                <td>${clubData.wins}</td>
                <td>${clubData.draws}</td>
                <td>${clubData.losses}</td>
                <td>${clubData.goalsFor}</td>
                <td>${clubData.goalsAgainst}</td>
                <td>${clubData.points}</td>
            </tr>
        `;
    position++;
  }
}
