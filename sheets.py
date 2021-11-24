import gspread

sa = gspread.service_account(filename="credentials.json")
sh = sa.open("Test")

wks = sh.worksheet("Sheet1")

print(type(wks.get_all_records()))