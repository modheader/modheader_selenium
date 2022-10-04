package javawebdriver;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

public class FirefoxExample {

	public static void main(String[] args) {
		WebDriverManager.firefoxdriver().setup();
		WebDriver driver = null;
		try {
			Path currentRelativePath = Paths.get("firefox-modheader/modheader.xpi");
			FirefoxProfile profile = new FirefoxProfile();
			profile.addExtension(new File(currentRelativePath.toAbsolutePath().toString()));
			FirefoxOptions options = new FirefoxOptions();
			options.setProfile(profile);
			driver = new FirefoxDriver(options);
			driver.get("https://webdriver.modheader.com/add?test=ModHeader%20Test");

			driver.get("https://modheader.com/headers");
			new WebDriverWait(driver, Duration.ofSeconds(1))
					.until(ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), "ModHeader Test"));
			System.out.println("Success");
		} finally {
			if (driver != null) {
				driver.quit();
			}
		}
	}

}
