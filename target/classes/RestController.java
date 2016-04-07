

@Controller
public class RestController {
	
	@RequestMapping(value="/getAccountInfo", method = RequestMethod.GET)
	public @ResponseBody String getAccountInfo(HttpServletRequest request) throws IOException {
		OkHttpClient client = new OkHttpClient();

		Request request = new Request.Builder()
		  .url("https://apilink-qa.pnc.com/hackathon/qa/retail/accountBalances/v1/getAccountBalances?customerKey=518603")
		  .get()
		  .addHeader("accept", "application/json")
		  .addHeader("x-ibm-client-id", "518603")
		  .build();

		Response response = client.newCall(request).execute();
		return new Gson().toJson(response);
	}
}
