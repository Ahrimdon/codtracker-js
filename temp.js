<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Call of Duty Stats Tracker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: #ffffff;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #1e1e1e;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        h1 {
            text-align: center;
            color: #f7c800;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #333;
            border-radius: 4px;
            background-color: #2d2d2d;
            color: #ffffff;
            box-sizing: border-box;
        }
        button {
            background-color: #f7c800;
            color: #000000;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            display: block;
            width: 100%;
            margin-top: 10px;
        }
        button:hover {
            background-color: #e0b800;
        }
        #results {
            margin-top: 20px;
            background-color: #2d2d2d;
            border-radius: 4px;
            padding: 15px;
            white-space: pre-wrap;
            overflow-x: auto;
            display: none;
        }
        .error {
            color: #ff6b6b;
            margin-top: 10px;
            text-align: center;
        }
        .loading {
            text-align: center;
            margin-top: 20px;
            display: none;
        }
        .api-section {
            border-top: 1px solid #333;
            margin-top: 20px;
            padding-top: 15px;
        }
        .conditional-field {
            display: none;
        }
        .tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid #333;
        }
        .tab {
            padding: 10px 15px;
            cursor: pointer;
            background-color: #2d2d2d;
            border-radius: 4px 4px 0 0;
            margin-right: 5px;
        }
        .tab.active {
            background-color: #f7c800;
            color: #000000;
            font-weight: bold;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .small-text {
            font-size: 0.8em;
            color: #aaa;
        }
        .button-group {
            display: flex;
            gap: 10px;
        }
        .button-group button {
            flex: 1;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Call of Duty Stats Tracker</h1>
        
        <div class="tabs">
            <div class="tab active" data-tab="stats">Player Stats</div>
            <div class="tab" data-tab="matches">Matches</div>
            <div class="tab" data-tab="user">User Info</div>
            <div class="tab" data-tab="other">Other</div>
        </div>
        
        <!-- Common fields for all tabs -->
        <div class="form-group">
            <label for="ssoToken">SSO Token:</label>
            <input type="text" id="ssoToken" placeholder="Enter your SSO Token">
        </div>
        
        <!-- STATS TAB -->
        <div class="tab-content active" id="stats-tab">
            <div class="form-group">
                <label for="username">Username (e.g., Ahrimdon or Ahrimdon#1234567):</label>
                <input type="text" id="username" placeholder="Enter your Call of Duty username">
            </div>
            
            <div class="form-group">
                <label for="platform">Platform:</label>
                <select id="platform">
                    <option value="acti">Activision</option>
                    <option value="battle">Battle.net</option>
                    <option value="psn">PlayStation</option>
                    <option value="xbl">Xbox Live</option>
                    <option value="steam">Steam</option>
                    <option value="uno">Uno (numerical ID)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="game">Game:</label>
                <select id="game">
                    <option value="mw">Modern Warfare / Warzone</option>
                    <option value="mw2">Modern Warfare 2</option>
                    <option value="wz2">Warzone 2</option>
                    <option value="mw3">Modern Warfare 3</option>
                    <option value="cw">Cold War</option>
                    <option value="vg">Vanguard</option>
                    <option value="wzm">Warzone Mobile</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="apiCall">API Call:</label>
                <select id="apiCall">
                    <option value="fullData">Lifetime Statistics</option>
                    <option value="combatHistory">Recent Match History</option>
                    <option value="mapList">Map List</option>
                </select>
            </div>
            
            <button id="fetchStats">Fetch Stats</button>
        </div>
        
        <!-- MATCHES TAB -->
        <div class="tab-content" id="matches-tab">
            <div class="form-group">
                <label for="matchUsername">Username:</label>
                <input type="text" id="matchUsername" placeholder="Enter your Call of Duty username">
            </div>
            
            <div class="form-group">
                <label for="matchPlatform">Platform:</label>
                <select id="matchPlatform">
                    <option value="acti">Activision</option>
                    <option value="battle">Battle.net</option>
                    <option value="psn">PlayStation</option>
                    <option value="xbl">Xbox Live</option>
                    <option value="steam">Steam</option>
                    <option value="uno">Uno (numerical ID)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="matchGame">Game:</label>
                <select id="matchGame">
                    <option value="mw">Modern Warfare / Warzone</option>
                    <option value="mw2">Modern Warfare 2</option>
                    <option value="wz2">Warzone 2</option>
                    <option value="mw3">Modern Warfare 3</option>
                    <option value="cw">Cold War</option>
                    <option value="vg">Vanguard</option>
                    <option value="wzm">Warzone Mobile</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="matchId">Match ID:</label>
                <input type="text" id="matchId" placeholder="Enter Match ID (Required for Match Info)">
            </div>
            
            <div class="button-group">
                <button id="fetchMatches">Fetch Recent Matches</button>
                <button id="fetchMatchInfo">Fetch Match Details</button>
            </div>
        </div>
        
        <!-- USER INFO TAB -->
        <div class="tab-content" id="user-tab">
            <div class="form-group">
                <label for="userUsername">Username:</label>
                <input type="text" id="userUsername" placeholder="Enter your Call of Duty username">
            </div>
            
            <div class="form-group">
                <label for="userPlatform">Platform:</label>
                <select id="userPlatform">
                    <option value="acti">Activision</option>
                    <option value="battle">Battle.net</option>
                    <option value="psn">PlayStation</option>
                    <option value="xbl">Xbox Live</option>
                    <option value="steam">Steam</option>
                    <option value="uno">Uno (numerical ID)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="userCall">User Info:</label>
                <select id="userCall">
                    <option value="codPoints">COD Points</option>
                    <option value="connectedAccounts">Connected Accounts</option>
                    <option value="eventFeed">Event Feed (Logged In User Only)</option>
                    <option value="identities">Identities (Logged In User Only)</option>
                    <option value="settings">Settings</option>
                </select>
            </div>
            
            <button id="fetchUserInfo">Fetch User Info</button>
        </div>
        
        <!-- OTHER TAB -->
        <div class="tab-content" id="other-tab">
            <div class="form-group">
                <label for="searchUsername">Username to Search:</label>
                <input type="text" id="searchUsername" placeholder="Enter username to search">
            </div>
            
            <div class="form-group">
                <label for="searchPlatform">Platform:</label>
                <select id="searchPlatform">
                    <option value="all">All Platforms</option>
                    <option value="acti">Activision</option>
                    <option value="battle">Battle.net</option>
                    <option value="psn">PlayStation</option>
                    <option value="xbl">Xbox Live</option>
                    <option value="steam">Steam</option>
                    <option value="uno">Uno (numerical ID)</option>
                </select>
            </div>
            
            <button id="fuzzySearch">Fuzzy Search</button>
            
            <p class="small-text">Note: Fuzzy search looks up a gamertag and retrieves fuzzy matches along with their respective platforms.</p>
        </div>
        
        <div id="error" class="error"></div>
        <div id="loading" class="loading">Loading data...</div>
        <pre id="results"></pre>
    </div>

    <script>
        // Tab switching logic
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
        
        // Fetch stats (original functionality enhanced)
        document.getElementById('fetchStats').addEventListener('click', async () => {
            const username = document.getElementById('username').value.trim();
            const ssoToken = document.getElementById('ssoToken').value.trim();
            const platform = document.getElementById('platform').value;
            const game = document.getElementById('game').value;
            const apiCall = document.getElementById('apiCall').value;
            
            await fetchData('/api/stats', {
                username,
                ssoToken,
                platform, 
                game,
                apiCall
            });
        });
        
        // Fetch match history
        document.getElementById('fetchMatches').addEventListener('click', async () => {
            const username = document.getElementById('matchUsername').value.trim();
            const ssoToken = document.getElementById('ssoToken').value.trim();
            const platform = document.getElementById('matchPlatform').value;
            const game = document.getElementById('matchGame').value;
            
            await fetchData('/api/matches', {
                username,
                ssoToken,
                platform,
                game
            });
        });
        
        // Fetch match details
        document.getElementById('fetchMatchInfo').addEventListener('click', async () => {
            const matchId = document.getElementById('matchId').value.trim();
            const ssoToken = document.getElementById('ssoToken').value.trim();
            const platform = document.getElementById('matchPlatform').value;
            const game = document.getElementById('matchGame').value;
            
            if (!matchId) {
                displayError('Match ID is required');
                return;
            }
            
            await fetchData('/api/matchInfo', {
                matchId,
                ssoToken,
                platform,
                game
            });
        });
        
        // Fetch user info
        document.getElementById('fetchUserInfo').addEventListener('click', async () => {
            const username = document.getElementById('userUsername').value.trim();
            const ssoToken = document.getElementById('ssoToken').value.trim();
            const platform = document.getElementById('userPlatform').value;
            const userCall = document.getElementById('userCall').value;
            
            // For event feed and identities, username is not required
            if (!username && (userCall !== 'eventFeed' && userCall !== 'identities')) {
                displayError('Username is required for this API call');
                return;
            }
            
            await fetchData('/api/user', {
                username,
                ssoToken,
                platform,
                userCall
            });
        });
        
        // Fuzzy search
        document.getElementById('fuzzySearch').addEventListener('click', async () => {
            const username = document.getElementById('searchUsername').value.trim();
            const ssoToken = document.getElementById('ssoToken').value.trim();
            const platform = document.getElementById('searchPlatform').value;
            
            if (!username) {
                displayError('Username is required for search');
                return;
            }
            
            await fetchData('/api/search', {
                username,
                ssoToken,
                platform
            });
        });
        
        // Common fetch function
        async function fetchData(endpoint, requestData) {
            const errorElement = document.getElementById('error');
            const loadingElement = document.getElementById('loading');
            const resultsElement = document.getElementById('results');
            
            // Reset display
            errorElement.textContent = '';
            resultsElement.style.display = 'none';
            loadingElement.style.display = 'block';
            
            // Check for SSO Token
            if (!requestData.ssoToken) {
                errorElement.textContent = 'SSO Token is required';
                loadingElement.style.display = 'none';
                return;
            }
            
            try {
