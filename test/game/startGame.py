import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

URL = 'http://127.0.0.1:3000/'
MASTER = 0
PLAYER_NUM = 3

def driver_setting():
    options = webdriver.ChromeOptions()
    options.add_argument('window-size=1920,1080')

    global driver
    driver = webdriver.Chrome('./chromedriver', options=options)
    driver.implicitly_wait(time_to_wait=1)


def open_browser():
    driver.get(url=URL)
    for player in range(1, PLAYER_NUM):
        driver.execute_script('window.open("'+URL+'");')
    
    global tabs
    tabs = driver.window_handles

def make_room():
    driver.switch_to.window(tabs[MASTER])
    driver.find_element_by_xpath('//*[@id="root"]/div/div[2]').click()
    driver.switch_to.alert.accept()
    code = driver.find_element_by_xpath('//*[@id="root"]/div/div[1]/p[2]').text
    return code

def enter_ready_room(player, code):
    driver.switch_to.window(tabs[player])
    driver.find_element_by_xpath('//*[@id="root"]/div/div[1]').click()
    driver.find_element_by_xpath('//*[@id="root"]/div/div[6]/div[2]/div/input').send_keys(code)
    driver.find_element_by_xpath('//*[@id="root"]/div/div[6]/div[2]/div/button[1]').click()
    driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/button[1]').click()
    driver.switch_to.alert.accept()

def game_start():
    time.sleep(1)
    driver.switch_to.window(tabs[MASTER])
    driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/button[1]').click()

def select_order_card(player):
    driver.switch_to.window(tabs[player])
    driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div['+str(player+1)+']').click()

def main():
    driver_setting()
    open_browser()
    code = make_room()
    for player in range(1, PLAYER_NUM):
        enter_ready_room(player, code)
    game_start()
    for player in range(0, PLAYER_NUM):
        select_order_card(player)

main()