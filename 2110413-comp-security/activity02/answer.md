# Activity : Log Analysis

## Part I: Can you find people trying to break into the servers?

### Q1

How many hackers are trying to get access to our servers? And how many attempts are there? Explain/define how you count distinct hackers.

**Answer**

**Splunk Search Command:**

```
source="*secure.log" "Failed password" | stats count by src_ip | stats count as distinct_hackers, sum(count) as total_attempts
```

**Definition of Distinct Hackers:**
I define distinct hackers as unique source IP addresses that have attempted failed login attempts. This assumes each IP represents a different attacker, though in reality some hackers might use multiple IPs or some IPs might be shared.

**Results:**
| Service | Distinct IPs | Attempt Count |
|---------|-------------|---------------|
| All | [Your Result] | [Your Result] |
| mailsv | [Your Result] | [Your Result] |
| www1 | [Your Result] | [Your Result] |
| www2 | [Your Result] | [Your Result] |
| www3 | [Your Result] | [Your Result] |

**Analysis:**
[Include your analysis of the data and any patterns you notice]

### Q2

What time do hackers appear to try to hack our servers?

**Answer**

**Splunk Search Command:**

```
source="*secure.log" "Failed password" | eval hour=strftime(_time, "%H") | stats count by hour | sort hour
```

**Results:**
[Describe the time patterns you observe - peak hours, consistent timing, etc.]

### Q3

Which server (mailsv, www1, www2, www3) had the most attempts?

**Answer**

**Splunk Search Command:**

```
source="*secure.log" "Failed password" | stats count by source
```

**Results:** www1

![alt text](image-1.png)

### Q4

What is the most popular account that hackers use to try to break in?

**Answer**

**Splunk Search Command:**

```
source="*secure.log" "Failed password" | rex field=_raw "user (?<username>\w+)" | stats count by username | sort -count | head 20
```

**Results:**
| Username | Attempt Count |
|----------|---------------|
| [Username] | [Count] |
| [Username] | [Count] |
| ... | ... |

**Analysis:**
[Discuss why certain accounts might be targeted more frequently]

---

## Part II: Sensitive Files on Web Servers

### Q5

Can you find attempts to get access to sensitive information from our web servers? How many attempts were there?

**Answer**

**Splunk Search Commands:**

```
source="*access.log" (uri_path="*/admin*" OR uri_path="*/config*" OR uri_path="*/password*" OR uri_path="*/hidden*" OR uri_path="*/private*" OR uri_path="*/secret*")
```

**Results:**
[List the sensitive files/paths found and attempt counts]

### Q6

What resource/file are hackers looking for?

**Answer**

**Splunk Search Command:**

```
source="*access.log" (uri_path="*/admin*" OR uri_path="*/config*" OR uri_path="*/password*" OR uri_path="*/hidden*") | stats count by uri_path | sort -count
```

**Results:**
[List the specific files/resources being targeted]

---

## Part III: Are there bots crawling our websites?

### Q7

Can you find any bots crawling our websites?

**Answer**

**Splunk Search Command:**

```
source="*access.log" | rex field=useragent "(?<bot_name>bot|crawler|spider)" | search bot_name=* | stats count by useragent
```

**Results:**
[List the bots you found]

### Q8

What are they doing on the site? (Hint: Look for User-Agent in the web access.logs.)

**Answer**

**Splunk Search Command:**

```
source="*access.log" useragent="*bot*" | stats count by uri_path, useragent | sort -count
```

**Results:**
[Describe what the bots are accessing and their behavior patterns]

---

## Key Splunk Commands Used

1. **Basic Search:** `source="*secure.log" "Failed password"`
2. **Field Extraction:** `| rex field=_raw "pattern"`
3. **Statistics:** `| stats count by field_name`
4. **Sorting:** `| sort -count` (descending) or `| sort count` (ascending)
5. **Time Analysis:** `| eval hour=strftime(_time, "%H")`
6. **Filtering:** `| search condition`

## Tips for Your Analysis

1. **Start Simple:** Begin with basic searches like `source="*secure.log"` to see what data you have
2. **Use Wildcards:** `*` helps find patterns across different log formats
3. **Field Extraction:** Use regex to extract usernames, IPs, and other relevant fields
4. **Time Analysis:** Convert timestamps to readable formats for pattern analysis
5. **Documentation:** Take screenshots of your Splunk searches and results as evidence

## Common Patterns to Look For

**In secure.log:**

- "Failed password"
- "Invalid user"
- "Connection closed"
- Multiple attempts from same IP

**In access.log:**

- HTTP status codes (404, 403, 200)
- Suspicious file requests
- Bot user agents
- Unusual request patterns

Remember to replace the placeholder content with your actual findings from the Splunk analysis!
