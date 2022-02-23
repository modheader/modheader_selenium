package javawebdriver;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

public class ChromeExample {

	public static void main(String[] args) {
		WebDriverManager.chromedriver().setup();
		WebDriver driver = null;
		try {
			Path currentRelativePath = Paths.get("chrome-modheader/modheader.crx");
			ChromeOptions options = new ChromeOptions();
			options.addExtensions(new File(currentRelativePath.toAbsolutePath().toString()));
			driver = new ChromeDriver(options);
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
