
import 'package:flutter/cupertino.dart';
import 'package:opendietary/screens/journal_page.dart';
import 'package:opendietary/screens/profile_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  @override
  Widget build(BuildContext context) {
    return CupertinoTabScaffold(
      tabBar: CupertinoTabBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.book_fill),
            label: 'Journal',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.chart_pie_fill),
            label: 'Trends',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.square_list_fill),
            label: 'Meal Planning',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.person_alt_circle_fill),
            label: 'Profile',
          ),
        ],
      ),
      tabBuilder: (BuildContext context, int index) {
        return CupertinoTabView(
          builder: (BuildContext context) {
            if (index == 0) {
              return JournalPage();
            } else if (index == 1) {
              return const Center(
                child: Text('Content of tab 1'),
              );
            } else if (index == 2) {
              return const Center(
                child: Text('Content of tab 2'),
              );
            } else {
              return ProfilePage();
            }
          },
        );
      },
    );
  }
}
