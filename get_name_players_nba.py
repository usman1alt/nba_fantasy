#!/usr/bin/env python3

import nba_api
from nba_api.stats.endpoints import boxscoreplayertrackv2
from nba_api.stats.endpoints import scoreboardv2
from nba_api.stats.endpoints import boxscoretraditionalv2
import json
import pandas as pd
from argparse import ArgumentParser
from datetime import datetime

def get_team_id(date):
    response = scoreboardv2.ScoreboardV2(
        game_date = date )
    content = json.loads(response.get_json())
    team_id = []
    for k,v in content.items():
        if k == "resultSets":
            for results in v:
                team_id.append(results.get("rowSet"))

    return team_id

def get_players_in_games(team_ids):
    players_in_game = []
    for i in range(len(team_ids[0])):
        response = boxscoretraditionalv2.BoxScoreTraditionalV2(
        game_id = str(team_ids[0][i][2])
        )
        game_id = json.loads(response.get_json())
        headers = game_id.get("resultSets")[0]["headers"]
        rows= game_id.get("resultSets")[0]["rowSet"]
        for i in rows:
            players_in_game.append(dict(zip(headers, i)))
    
    return players_in_game

def get_fantasy_total(players_in_game, team, team_name):
    game_df = pd.DataFrame.from_dict(players_in_game)
    fantasy_df = game_df[["PLAYER_NAME","FG3M", "FGM", "FTM", "REB", "AST", "BLK", "STL", "TO"]]
    fantasy_df["fantasy_PTS"] = ((game_df["FG3M"] * 3) + 
                                (game_df["FGM"] * 2) + 
                                (game_df["FTM"] * 1) + 
                                (game_df["REB"] * 1.2) +
                                (game_df["AST"] * 1.5) + 
                                (game_df["BLK"] * 2) + 
                                (game_df["STL"] * 2) -
                                (game_df["TO"] * 1))
    fantasy_df.fillna(0, inplace=True)
    fantasy_total = sum(fantasy_df.loc[fantasy_df["PLAYER_NAME"].isin(team)]["fantasy_PTS"].values.tolist())
    score = {"Team_Name":team_name, "Score": fantasy_total}

    return score

def leaderboard(score_list):
     board = sorted(score_list, key=lambda k: k['Score'], reverse=True)
    
     return board

def deliver_board(file_name, scores):

    previous_score = pd.read_csv(file_name)
    fantasy_board = pd.DataFrame.from_dict(leaderboard(scores))[["Team_Name", "Score"]]
    total_score = previous_score.set_index('Team_Name').add(fantasy_board.set_index('Team_Name'), fill_value=0).reset_index()
    total_score.to_csv(file_name,index=False)
    
    return total_score


# def message_to_whatsapp():

def main():
    now_date = "08/17/2020"

    ap = ArgumentParser(description="Give Date")
    ap.add_argument("-d", "--date",default=now_date, help= "date of game")
    args = ap.parse_args()

    ## parsed this from text file
    teams = [
        {"Team_Name": "VancouverA's", "players": ["LeBron James","Bam Adebayo", "Myles Turner", "Dwight Howard", "Jaylen Brown", "Dion Waiters", "Eric Bledsoe", "Caris LeVert", "Michael Porter Jr.", "Kentavious Caldwell-Pope"]},
        {"Team_Name": "TheSquirters", "players":["James Harden", "Kawhi Leonard", "Jayson Tatum", "Khris Middleton", "Jimmy Butler", "Donovan Mitchell","Pascal Siakam", "Jamal Murray", "Jusuf Nurkic", "Victor Oladipo"]},
        {"Team_Name": "SlougiePopNation", "players": ["Joel Embiid", "Shai Gilgeous-Alexander", "Malcolm Brogdon", "Lou Williams" , "T.J. Warren", "Goran Dragic", "Rudy Gobert", "Jerami Grant", "Marcus Smart", "Brook Lopez"]},
        {"Team_Name": "RingBeggars", "players": ["Luka Doncic", "Damian Lillard", "Nikola Jokic", "Kemba Walker", "Chris Paul", "Nikola Vucevic", "Tobias Harris", "Fred Vanvleet", "Gordon Hayward", "Danilo Gallinari"]},
        {"Team_Name": "AmirTramps", "players": ["Anthony Davis", "Russell Westbrook", "Paul George", "Giannis Antetokounmpo", "Kyle Lowry", "Kristaps Porzingis", "Serge Ibaka", "CJ McCollum", "Kyle Kuzma", "Danny Green"]}
        ]

    team_id = get_team_id(args.date)
    players = get_players_in_games(team_id)
    scores = []
    for team in teams:
        scores.append(get_fantasy_total(players, team.get("players"), team.get("Team_Name")))

    print(deliver_board("fantasy_board.csv", scores))

if __name__ == "__main__":
    main()