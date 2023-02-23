import os
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.service import Service
from webdriver_manager.firefox import GeckoDriverManager

dirname = os.path.dirname(__file__)
extension_path = os.path.abspath(os.path.join(dirname, '../../firefox-modheader/modheader.xpi'))
driver = webdriver.Firefox(service=Service(GeckoDriverManager().install()))
driver.install_addon(extension_path)
driver.get("https://webdriver.modheader.com/add?test=ModHeader%20Test")
WebDriverWait(driver, 1).until(EC.title_is("ModHeader Done"))

driver.get("https://modheader.com/headers")
WebDriverWait(driver, 1).until(EC.text_to_be_present_in_element((By.TAG_NAME, "body"), "ModHeader Test"))
print('Success')

