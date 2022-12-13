import 'package:flutter/material.dart';
import 'package:opendietary/components/text_bar.dart';
import 'package:opendietary/textstyles.dart';
import 'package:opendietary/util/util.dart';

class SearchSliverScaffold extends StatelessWidget {
  final Color headingBgColor;
  final Color bodyBgColor;
  final double? expandedHeight;
  final double searchBarHeight;
  final EdgeInsets bodyPadding;
  final Widget? floating;
  final Function(String) onSearch;
  final String title;
  final String hintText;
  final Widget body;

  const SearchSliverScaffold(
      {super.key, this.headingBgColor = Colors.white,
      this.bodyBgColor = Colors.white,
      this.expandedHeight,
      this.searchBarHeight = 40,
      this.bodyPadding = const EdgeInsets.symmetric(horizontal: 15),
      this.floating,
      required this.onSearch,
      required this.title,
      required this.hintText,
      required this.body});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: bodyBgColor,
        floatingActionButton: floating,
        body: NestedScrollView(
            physics: const BouncingScrollPhysics(),
            headerSliverBuilder: (context, _) => [
                  SliverAppBar(
                    pinned: true,
                    expandedHeight: expandedHeight ?? iosAndroidNumber(90, 110),
                    primary: true,
                    foregroundColor: headingBgColor,
                    backgroundColor: headingBgColor,
                    collapsedHeight: 0.0,
                    toolbarHeight: 0.0,
                    elevation: 0.0,
                    floating: true,
                    snap: true,
                    bottom: PreferredSize(
                        preferredSize: Size.fromHeight(iosAndroidNumber(55, 65)),
                        child: Container(
                            height: searchBarHeight,
                            margin: const EdgeInsets.only(left: 20, right: 10, top: 5, bottom: 10),
                            child: TextBar(
                                hintText: hintText,
                                onChanged: onSearch,
                                prefixIcon:
                                    Icon(Icons.search, size: 20, color: Colors.grey[600])))),
                    flexibleSpace: FlexibleSpaceBar(
                      background: Padding(
                        padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                        child: Row(children: [
                          InkWell(
                              child: const Icon(Icons.arrow_back_ios, size: 18, color: PINK),
                              onTap: () => Navigator.pop(context)),
                          Text(title, style: H4),
                        ]),
                      ),
                    ),
                  )
                ],
            body: Padding(
              padding: bodyPadding,
              child: body,
            )));
  }
}
