package samples;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("")
public class HelloControl {
	
	
	@RequestMapping(value = {"/","/ad","/hello"} , method = RequestMethod.GET)public String printHello(ModelMap model) {
	      /*model.addAttribute("message", "Hello Spring MVC Framework!");*/
	      //return "hello";
	      return "home";
	   }
	
	
}

