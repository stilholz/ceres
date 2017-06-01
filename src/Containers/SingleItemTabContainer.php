<?php

namespace Ceres\Containers;

use Plenty\Plugin\Templates\Twig;

class SingleItemTabContainer
{
    public function call(Twig $twig):string
    {
        return $twig->render('Ceres::Tab');
    }
}