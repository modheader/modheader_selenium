import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;

import org.openqa.selenium.By;	
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

public class FirefoxExample {

	public static void main(String[] args) {
		WebDriverManager.firefoxdriver().setup();
		FirefoxDriver driver = null;
		try {
			Path currentRelativePath = Paths.get("../../firefox-modheader/modheader.xpi");
			driver = new FirefoxDriver();
			driver.installExtension(currentRelativePath, true);
			driver.get("https://webdriver.modheader.com/add?test=ModHeader%20Test");
			new WebDriverWait(driver, Duration.ofSeconds(500)).until(ExpectedConditions.titleIs("Done"));

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
