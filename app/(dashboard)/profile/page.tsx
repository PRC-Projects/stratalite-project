import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const skills = [
  "Web Scraping",
  "Website Design",
  "PHP",
  "Wordpress",
  "React.js",
  "Node.js",
  "UI / UX",
  "Mobile App Development",
  "Laravel",
  "Android App Development",
  "Flutter",
  "Figma",
  "Master App Development",
  "Selenium",
  "Flutter",
  "Python",
  "iOS Development",
  "SAP/TOM",
  "SAM/TOM",
  "Puppeteer",
]

export default function ProfilePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Image Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarFallback className="text-4xl">SP</AvatarFallback>
              </Avatar>
              <p className="text-sm text-gray-600 mb-4">(minimum width of 300px for best results)</p>
              <Button variant="outline" className="w-full mb-2">
                Change Image
              </Button>
              <Button variant="ghost" className="w-full text-gray-600">
                Message
              </Button>
              <Button variant="ghost" className="w-full text-gray-600">
                Timeline
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Active Orders</CardTitle>
              <p className="text-sm text-gray-500">Pending task</p>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg p-4 text-white text-center">
                <p className="text-sm mb-2">Active Orders - 5 ( $120 )</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Active Orders ▼
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Completed Orders</CardTitle>
              <p className="text-sm text-gray-500">Complete task</p>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg p-4 text-white text-center">
                <p className="text-sm mb-2">Completed Orders -1 ( $12 )</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Check Orders ▼
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" defaultValue="Sujoy pal" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Primary Skills</Label>
                <Input id="skills" defaultValue="Java" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  defaultValue="Mobile App Development | Full Stack Web Development | UI / UX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About Yourself</Label>
                <Textarea
                  id="about"
                  className="min-h-[150px]"
                  defaultValue="My experience aligns well with the qualifications you are seeking, and I am certain I would make a valuable addition to your and your organisation. I take immense pride in my work and its an honour to present my profile on this platform. I am well versed in both web & app development & software development. A Computer Science & Engineering Graduate I have expertise in test cases manual & automation methodologies. Moreover, my on the job experience has afforded me a well rounded skill set, including first rate organisation and outstanding communication skills."
                />
                <p className="text-xs text-gray-500">885 / 1000 characters typed</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="gender" value="male" className="mr-2" />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="gender" value="female" className="mr-2" />
                      Female
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input id="hourlyRate" defaultValue="INR 300" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <select id="availability" className="w-full border rounded-md px-3 py-2">
                    <option>Full-time - 30+ hrs/week</option>
                    <option>Part-time - 20-30 hrs/week</option>
                    <option>Hourly - Less than 20 hrs/week</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="expYears" placeholder="Years" defaultValue="6" />
                    <Input id="expMonths" placeholder="Months" defaultValue="4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1 text-sm cursor-pointer hover:bg-primary hover:text-white"
                    >
                      {skill} ×
                    </Badge>
                  ))}
                  <Button size="sm" variant="ghost" className="text-primary">
                    + Update Skill name
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="1995-06-12" />
                  <p className="text-xs text-gray-500">
                    Message
                    <br />
                    Timezone
                    <br />
                    (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Kolkata" />
                  <br />
                  <Label htmlFor="skype">Skype</Label>
                  <Input id="skype" defaultValue="live:cid-fbcc47cc2b758ab1" />
                </div>
              </div>

              <Button className="w-full">SAVE</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
